export interface AlbumFullInfo {
  id: string
  createdAt: Date
  album: string
  artist: string
  track_count: number
  disk_count: number
  art_url: string
}
export interface AlbumInfoFromAPI {
  mbid: string
  album: string
  artist: string
  track_count: number
  disk_count: number
}
