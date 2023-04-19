import React from 'react'
import Image from 'next/image'
import type { Albums } from '@prisma/client'

type Props = {
  album: Albums
  handler?: (album: Albums) => void
  cardType: 'display' | 'remove' | 'add'
}

export default function AlbumCard({
  album,
  handler = function (): void {
    return
  },
  cardType,
}: Props) {
  function handleRemoveClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    handler(album)
  }
  function handleAddClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    handler(album)
  }
  return (
    <div className="m-8 flex justify-center">
      <div className="w-72 rounded-lg border-2 border-solid bg-slate-50 shadow-lg">
        <Image
          className="rounded-t-lg border-b-2"
          src={album.art_url}
          alt="album artwork"
          width={285}
          height={285}
        />
        <div className="p-3">
          <h5 className="mb-2 text-xl font-medium text-gray-900">
            {album.album}
          </h5>
          <p className="mb-4 text-base text-gray-700">{album.artist}</p>
          <div className="flex justify-between">
            <p>Tracks: {album.track_count}</p>
            <p>Records: {album.disk_count}</p>
          </div>
          {cardType === 'remove' && (
            <button
              className="mt-5 w-full rounded border border-transparent bg-red-600 px-0 py-1.5 text-center text-xs font-medium text-white shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-offset-1"
              onClick={handleRemoveClick}
            >
              Remove
            </button>
          )}
          {cardType === 'add' && (
            <button
              className="mt-5 w-full rounded border border-transparent bg-green-600 px-0 py-1.5 text-center text-xs font-medium text-white shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-offset-1"
              onClick={handleAddClick}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
