import AddRecordForm from '@/components/admin/AddRecordForm'
import SearchResultsList from '@/components/admin/SearchResultsList'
import { useState } from 'react'
import axios, { type AxiosResponse } from 'axios'
import SimpleNotification from '@/components/notification/SimpleNotification'
import Head from 'next/head'
import type { AlbumInfoFromAPI, AlbumToAdd } from '@/utils/types'
import { api } from '@/utils/api'
import LoadingSpinner from '@/components/loading/LoadingSpinner'

export default function AddAlbum() {
  const [artistSearch, setArtistSearch] = useState('')
  const [albumSearch, setAlbumSearch] = useState('')
  const [albumSearchList, setAlbumSearchList] = useState<
    AlbumInfoFromAPI[] | null
  >(null)
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { mutate } = api.albums.addAlbum.useMutation()
  function handleArtistChange(e: React.FormEvent<HTMLInputElement>) {
    setArtistSearch(e.currentTarget.value)
  }
  function handleAlbumChange(e: React.FormEvent<HTMLInputElement>) {
    setAlbumSearch(e.currentTarget.value)
  }
  function handleSearchClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    searchForAlbums(artistSearch, albumSearch)
  }
  function handleClearClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setAlbumSearchList(null)
    setArtistSearch('')
    setAlbumSearch('')
  }
  function handleAddAlbum(album: AlbumToAdd) {
    try {
      mutate({ album })
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 6000)
      setArtistSearch('')
      setAlbumSearch('')
      setAlbumSearchList(null)
    } catch (err) {
      console.log(err)
    }
  }

  function searchForAlbums(artist: string, album: string) {
    setIsLoading(true)
    setAlbumSearchList([])
    axios
      .get(`/api/mb_album_info`, {
        params: {
          release: album,
          artist: artist,
        },
      })
      .then((results: AxiosResponse<AlbumInfoFromAPI[]>) => {
        setAlbumSearchList(results.data)
      })
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => console.error(err))
  }
  return (
    <>
      <Head>
        <title>MA-Add</title>
        <meta name="description" content="Adds records to the list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <AddRecordForm
          searchForAlbums={searchForAlbums}
          handleArtistChange={handleArtistChange}
          handleAlbumChange={handleAlbumChange}
          handleSearchClick={handleSearchClick}
          artistSearch={artistSearch}
          albumSearch={albumSearch}
          albumSearchList={albumSearchList}
          handleClearClick={handleClearClick}
        />
        {isLoading && (
          <div className="flex h-96 flex-col items-center justify-center">
            <div className="flex flex-wrap justify-center md:justify-start">
              <LoadingSpinner />
            </div>
          </div>
        )}
        {albumSearchList && (
          <SearchResultsList
            albumSearchList={albumSearchList}
            handleAdd={handleAddAlbum}
          />
        )}
        <SimpleNotification
          show={show}
          setShow={setShow}
          message={'Album Added!'}
          description={'Album is now a part of your collection'}
        />
      </div>
    </>
  )
}
