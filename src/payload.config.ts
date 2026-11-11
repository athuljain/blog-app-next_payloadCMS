
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Posts } from './collections/Posts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media, Categories, Posts],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})


// export default buildConfig({
//   admin: {
//     user: Users.slug,
//     importMap: {
//       baseDir: path.resolve(dirname),
//     },
//   },

//   collections: [Users, Media, Categories, Posts],

//   editor: lexicalEditor(),

//   secret: process.env.PAYLOAD_SECRET || '',

//   db: mongooseAdapter({
//     url: process.env.DATABASE_URI || '',
//   }),

//   sharp,

//   typescript: {
//     outputFile: path.resolve(dirname, 'payload-types.ts'),
//   },

//  plugins: [
//   vercelBlobStorage({
//     enabled: true,

//     collections: {
//       media: true,
//     },

//     token: process.env.BLOB_STORAGE_READ_WRITE_TOKEN,
//   }),
// ],
// })
