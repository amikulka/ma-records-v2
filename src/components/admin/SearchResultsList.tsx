import AlbumCard from '@/components/albumCard/AlbumCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import type { Albums } from '@prisma/client'
export interface album {
  album: string
  artist: string
  disk_count: number
  mbid: string
  track_count: number
}
type Props = {
  albumSearchList: album[]
  handleAdd: () => void
}

export default function SearchResultsList({
  albumSearchList,
  handleAdd,
}: Props) {
  const [displayList, setDisplayList] = useState<Albums[] | null>(null)
  useEffect(() => {
    const artWork = Promise.all(
      albumSearchList.map(async (album) => {
        const art = await axios
          .get(`/api/mb_album_art`, {
            params: {
              mbid: album.mbid,
            },
          })
          .catch((err) => {
            console.log(err)
          })
        return art as string
      })
    )
    setDisplayList(
      albumSearchList.map((album, index) => {
        return {
          id: album.mbid,
          createdAt: new Date(),
          album: album.album,
          artist: album.artist,
          track_count: album.track_count,
          disk_count: album.disk_count,
          art_url: artWork[index] as string,
        }
      })
    )
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
