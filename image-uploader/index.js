import fs from 'fs'
import download from 'download-file'
import gm from 'gm'
import Storage from '@google-cloud/storage'
import express from 'express'
import fileUpload from 'express-fileupload'
import debug from 'debug'
import { basename } from 'path'

const log = debug('app:image-uploader')
const err = debug('app:image-uploader:error')

const PORT = process.env.PORT || 33202
const GOOGLE_KEYS_BASE64 = process.env.GOOGLE_KEYS_BASE64 || '=='
const GOOGLE_KEYS_FILE_NAME = 'google_keys.json'
const GOOGLE_PROJECT_NAME = 'frank-money'
const GOOGLE_BUCKET_NAME = 'frank-dev-assets'
const GOOGLE_STORAGE_DOMAIN = 'https://storage.googleapis.com'

const DEFAULT_WITDH = 850
const ORIG_PREFIX = 'orig_'

fs.writeFileSync(
  GOOGLE_KEYS_FILE_NAME,
  Buffer.from(GOOGLE_KEYS_BASE64, 'base64').toString('utf8'),
)

const GCBUCKET = Storage({
  projectId: GOOGLE_PROJECT_NAME,
  keyFilename: GOOGLE_KEYS_FILE_NAME,
}).bucket(GOOGLE_BUCKET_NAME)

const app = express()

app.get('/', (req, res) => res.end('Use POST'))

app.use(fileUpload())

app.post('/', async (req, res, next) => {

  if (!req.files || !req.files.image) {
    if (!req.body || !req.body.imageUrl) {

      return res.status(400).end('Please send "image" or "imageUrl".')
    }
  }

  let tempPath,
    fileName,
    gmImage,
    origFileName

  try {

    if (req.body.imageUrl) {

      fileName = basename(req.body.imageUrl)
      fileName = fileName.replace(ORIG_PREFIX, '')
      tempPath = `./tmp/${fileName}`

      const options = {
        directory: './tmp/',
        filename: fileName,
      }

      await new Promise((res, rej) => download(req.body.imageUrl, options, (err) => {
        if (err) throw err
        res()
      }))

      gmImage = gm(tempPath)

      origFileName = `${ORIG_PREFIX}${fileName}`

    } else {

      const image = req.files.image
      const fileExt = image.name.split('.').pop()
      fileName = `${image.md5}.${fileExt}`
      tempPath = `./tmp/${fileName}`

      await image.mv(tempPath)

      gmImage = gm(tempPath)

      origFileName = `${ORIG_PREFIX}${fileName}`

      await GCBUCKET.upload(tempPath, {
        public: true,
        destination: origFileName,
      })
    }

    const { width, height } = await new Promise((res, rej) =>
      gmImage.size((err, size) => res(size)),
    )

    const crop =
      req.body && req.body.crop
        ? req.body.crop.split(',').map(parseFloat)
        : [0, 0, 1, 1]

    const outputWidth =
      req.body && req.body.width ? parseInt(req.body.width) : DEFAULT_WITDH

    await new Promise((res, rej) =>
      gmImage
        .crop(
          width * crop[2],
          height * crop[3],
          width * crop[0],
          height * crop[1],
        )
        .resizeExact(outputWidth * 2)
        .write(tempPath, err => (err ? rej(err) : res())),
    )

    const sizedFileName = `${outputWidth}_${fileName}`

    await GCBUCKET.upload(tempPath, {
      public: true,
      destination: sizedFileName,
    })

    res.json({
      original: `${GOOGLE_STORAGE_DOMAIN}/${GOOGLE_BUCKET_NAME}/${origFileName}`,
      sized: `${GOOGLE_STORAGE_DOMAIN}/${GOOGLE_BUCKET_NAME}/${sizedFileName}`,
    })
  } catch (exc) {
    err(exc)
    console.log(exc)
    res.status(500).end('Something wrong.')
  } finally {
    fs.unlink(tempPath, exc => exc && err(exc))
  }
})

app.listen(PORT, () => console.log(`Uploader listening on port ${PORT}`))
