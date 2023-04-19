import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const headers = {
  Accept: 'application/json',
  'User-Agent': 'MBRecords/0.1.0 (mikujen@yahoo.com)',
}

function getAlbumArt(mbid: string) {
  const endpoint = `http://coverartarchive.org/release/${mbid}`
  return axios({
    method: 'get',
    url: endpoint,
    headers: headers,
  }).then((results: ApiResponse) => {
    for (let index = 0; index < results.data.images.length; index++) {
      const image = results.data.images[index]
      if (image && image.front && image.approved) {
        return image.image
      }
    }
  })
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const mbid = req.query.mbid as string
  getAlbumArt(mbid)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}

interface ApiResponse {
  data: {
    images: ImageInfo[]
  }
}

interface ImageInfo {
  front: boolean
  approved: boolean
  image: string
}
