const cron = require('node-cron')
const Twitter = require('twitter')
const TwitterLite = require('twitter-lite')
const Fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const bufferFrom = require('buffer-from')

const twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY || '',
  consumer_secret: process.env.CONSUMER_SECRET || '',
  access_token_key: process.env.ACCESS_TOKEN_KEY || '',
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || ''
})

const twitterLite = new TwitterLite({
  consumer_key: process.env.CONSUMER_KEY || '',
  consumer_secret: process.env.CONSUMER_SECRET || '',
  access_token_key: process.env.ACCESS_TOKEN_KEY || '',
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || ''
})

const mediaUrl = (media: any): string => {
  if (media.video_info) {
    return media.video_info.variants[0].url
  }
  return media.media_url_https
}

const isExistFile = (file: string): boolean => {
  try {
    fs.statSync(file)
    return true
  } catch (err) {
    if (err.code === 'ENOENT') return false
    return true
  }
}

const username = process.env.BIRD
const myRecipientId = process.env.MY_RECIPIENT_ID

const uploadImage = async (buffer: Buffer): Promise<any> => {
  return await twitter.post('media/upload', {
    media: buffer,
    media_category: 'dm_image'
  })
}

const sendDM = async (mediaId: string): Promise<any> => {
  return await twitterLite.post('direct_messages/events/new', {
    event: {
      type: 'message_create',
      message_create: {
        target: {
          recipient_id: myRecipientId
        },
        message_data: {
          text: '運動かも？！？！',
          attachment: {
            type: 'media',
            media: {
              id: mediaId
            }
          }
        }
      }
    }
  })
}

const downloadImage = async (media: any): Promise<any> => {
  const url = mediaUrl(media)
  const res = await Fetch(url)
  const filename = path.basename(url)
  const filepath = `./tmp/${username}`
  fs.mkdirSync(filepath, { recursive: true })
  if (isExistFile(`${filepath}/${filename}`)) return
  fs.writeFileSync(`${filepath}/${filename}`, bufferFrom(await res.arrayBuffer()), 'binary')
  const buffer = fs.readFileSync(`${filepath}/${filename}`)
  const upload = await uploadImage(buffer)
  try {
    sendDM(upload.media_id_string)
  } catch (error) {
    console.log(error)
  }
}

const main = async (): Promise<any> => {
  const params = { screen_name: username, count: 20 }
  const tweets = await twitterLite.get('statuses/user_timeline', params)
  tweets.forEach((tweet: any) => {
    if (tweet.retweeted_status) return
    if (!tweet.extended_entities) return
    tweet.extended_entities.media.forEach(async (media: any) => {
      await downloadImage(media)
    })
  })
}

cron.schedule('*/20 * * * * *', () => main())
