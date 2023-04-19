type Props = {
  handleClick: React.MouseEventHandler<HTMLButtonElement>
  label: string
}

export default function ClearResultsButton({ handleClick, label }: Props) {
  return (
    <button
      className="m-2.5 inline-flex items-center rounded-md border border-transparent bg-gray-500 px-4 py-2 font-medium text-gray-100 shadow-sm hover:bg-gray-600 active:outline-none active:ring-2 active:ring-gray-200 active:ring-offset-2 sm:text-sm"
      onClick={handleClick}
    >
      {label}
    </button>
  )
}
