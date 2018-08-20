import fs from 'fs'
import gm from 'gm'
import Storage from '@google-cloud/storage'
import express from 'express'
import fileUpload from 'express-fileupload'
import debug from 'debug'

const log = debug('app:images_uploader')
const err = debug('app:images_uploader:error')

const PORT = process.env.PORT || 33202
const GOOGLE_KEYS_BASE64 = '=='
const GOOGLE_KEYS_FILE_NAME = 'google_keys.json'
const GOOGLE_PROJECT_NAME = 'frank-money'
const GOOGLE_BUCKET_NAME = 'frank-dev-assets'
const GOOGLE_STORAGE_DOMAIN = 'https://storage.googleapis.com'

const IMAGE_WITDH = 850*2

fs.writeFileSync(GOOGLE_KEYS_FILE_NAME, Buffer.from(GOOGLE_KEYS_BASE64, 'base64').toString('utf8'))

const GCBUCKET = Storage({
  projectId: GOOGLE_PROJECT_NAME,
  keyFilename: GOOGLE_KEYS_FILE_NAME,
}).bucket(GOOGLE_BUCKET_NAME)

const app = express()

app.get('/', (req, res) => res.end('Use POST'))

app.use(fileUpload())

app.post('/', async (req, res, next) => {

  if (!req.files || !req.files.image) {
    return res.status(400).end('Please send "image".')
  }

  let tempPath = ''

  try {

    const image = req.files.image
    const fileExt = image.name.split('.').pop()
    const fileName = `${image.md5}.${fileExt}`
    tempPath = `./tmp/${fileName}`

    await image.mv(tempPath)

    await new Promise((res, rej) => gm(tempPath).resizeExact(IMAGE_WITDH).write(tempPath, (err) => err ? rej(err) : res()))

    const [file, apiResponce] = await GCBUCKET.upload(tempPath, { public: true })

    res.json({
      default: `${GOOGLE_STORAGE_DOMAIN}/${file.bucket.name}/${file.name}`,
    })

  } catch (exc) {
    err(exc)
    res.status(500).end('Something wrong.')
  } finally {
    fs.unlink(tempPath, exc => exc && err(exc))
  }
})

app.listen(PORT, () => console.log(`Uploader listening on port ${PORT}`))
