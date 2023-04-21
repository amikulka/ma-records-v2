import AlbumCard from '@/components/albumCard/AlbumCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import type { Albums } from '@prisma/client'
import type { AlbumInfoFromAPI, AlbumToAdd } from '@/utils/types'

type Props = {
  albumSearchList: AlbumInfoFromAPI[]
  handleAdd: (album: AlbumToAdd) => void
}

export default function SearchResultsList({
  albumSearchList,
  handleAdd,
}: Props) {
  const [displayList, setDisplayList] = useState<Albums[] | null>(
    albumSearchList.map((album, index) => {
      return {
        ...album,
        createdAt: new Date(),
        id: index.toString(),
        art_url: '/album_placeholder',
      }
    })
  )
  useEffect(() => {
    Promise.all(
      albumSearchList.map((album) => {
        return axios
          .get(`/api/mb_album_art`, {
            params: {
              mbid: album.mbid,
            },
          })
          .then((results) => {
            return results.data as string
          })
          .catch((err) => {
            console.error(err)
          })
      })
    )
      .then((artworkArray) => {
        setDisplayList(
          albumSearchList.map((album, index) => {
            let albumArt = ''
            if (artworkArray[index]) {
              albumArt = artworkArray[index] as string
            }
            return {
              id: album.mbid,
              createdAt: new Date(),
              album: album.album,
              artist: album.artist,
              track_count: album.track_count,
              disk_count: album.disk_count,
              art_url: albumArt,
            }
          })
        )
      })
      .catch((err) => console.log(err))
  }, [albumSearchList])
  return (
    <div className="flex flex-wrap justify-center md:justify-start">
      {displayList?.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          handler={handleAdd}
          cardType="add"
        />
      ))}
    </div>
  )
}
