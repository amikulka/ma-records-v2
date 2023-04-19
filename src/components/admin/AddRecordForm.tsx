import type { AlbumInfoFromAPI } from '@/utils/types'
import InputWithLabel from '../input/InputWithLabel'
import StyledButton from './StyledButton'

type Props = {
  searchForAlbums: (artist: string, album: string) => void
  handleArtistChange: React.ChangeEventHandler<HTMLInputElement>
  handleAlbumChange: React.ChangeEventHandler<HTMLInputElement>
  handleSearchClick: React.MouseEventHandler<HTMLButtonElement>
  artistSearch: string
  albumSearch: string
  albumSearchList: AlbumInfoFromAPI[] | null
  handleClearClick: React.MouseEventHandler<HTMLButtonElement>
}
export default function AddRecordForm({
  handleArtistChange,
  handleAlbumChange,
  handleSearchClick,
  artistSearch,
  albumSearch,
  albumSearchList,
  handleClearClick,
}: Props) {
  return (
    <div className="ml-10 mt-8">
      <div className="max-w-sm p-2.5">
        <InputWithLabel
          placeholder={'Artist name'}
          handleChange={handleArtistChange}
          query={artistSearch}
        />
      </div>
      <div className="max-w-sm p-2.5">
        <InputWithLabel
          placeholder={'Album name'}
          handleChange={handleAlbumChange}
          query={albumSearch}
        />
      </div>
      <div>
        <StyledButton handleClick={handleSearchClick} label={'Search'} />
        {albumSearchList && (
          <StyledButton
            handleClick={handleClearClick}
            label={'Clear Results'}
          />
        )}
      </div>
    </div>
  )
}
