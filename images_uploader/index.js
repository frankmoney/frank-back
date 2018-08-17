import fs from 'fs'
import Storage from '@google-cloud/storage'
import express from 'express'
import fileUpload from 'express-fileupload'


const PORT = process.env.PORT || 33202
const GOOGLE_KEYS_BASE64 = '=='
const GOOGLE_KEYS_FILE_NAME = 'google_keys.json'
const GOOGLE_PROJECT_NAME = 'frank-money'
const GOOGLE_BUCKET_NAME = 'frank-dev-assets'
const GOOGLE_STORAGE_DOMAIN = 'https://storage.googleapis.com'

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
    return req.status(400).end('Please send "image".')
  }

  try {

    const image = req.files.image
    const fileName = 'temp-file-name.jpg'
    const tempPath = `./tmp/${image.md5}.jpg`

    const mvErr = await image.mv(tempPath)

    if (meErr)
      throw mvErr

    const [bucketErr, file] = await GCBUCKET.upload(tempPath, { public: true })

    if (bucketErr)
      throw bucketErr

    res.json({
      default: `${GOOGLE_STORAGE_DOMAIN}/${file.bucket}/${file.name}`,
    })

    fs.unlink(tempPath)

  } catch (exc) {
    res.status(500).end('Something wrong.')
  }
})

app.listen(PORT, () => console.log(`Uploader listening on port ${PORT}`))
