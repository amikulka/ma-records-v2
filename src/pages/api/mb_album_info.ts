import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const headers = {
  Accept: 'application/json',
  'User-Agent': 'MBRecords/0.1.0 (mikujen@yahoo.com)',
}

function getAlbumInfo(queries: object) {
  const endpoint = 'http://musicbrainz.org/ws/2/release/'
  const vinylQuery = ` AND status:official AND country:US AND format:"12\\" vinyl"`
  let queryString = Object.entries(queries)
    .map((element: [string, string]) => {
      const [key, value] = element
      if (value === '') return ''
      return `${key}:${value}`
    })
    .join(' AND ')
  queryString += vinylQuery
  return axios({
    method: 'get',
    url: endpoint,
    headers: headers,
    params: {
      query: queryString,
      limit: 10,
    },
  }).then((result: ApiResponse) => {
    return result.data.releases.map((result) => {
      return {
        mbid: result.id,
        album: result.title,
        artist: result['artist-credit'][0].name,
        track_count: result['track-count'],
        disk_count: result.media.length,
      }
    })
  })
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const queries = req.query
  return getAlbumInfo(queries)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send(err)
    })
}

interface ApiResponse {
  data: {
    releases: ApiAlbumInfo[]
  }
}

interface ApiAlbumInfo {
  id: string
  title: string
  'artist-credit': [
    {
      name: string
    }
  ]
  'track-count': number
  media: {
    length: number
  }
}
