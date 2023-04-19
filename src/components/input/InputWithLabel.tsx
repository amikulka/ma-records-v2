type Props = {
  placeholder: string
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  query: string
}
export default function InputWithLabel({
  placeholder,
  handleChange,
  query,
}: Props) {
  return (
    <div className="relative rounded-md border-b border-gray-500 px-3 py-2 focus-within:border-gray-300">
      {/* <label
        htmlFor="name"
        className="absolute -top-2 left-2 -mt-px inline-block px-1 text-xs font-medium text-gray-100"
      >
        {label}
      </label> */}
      <input
        type="text"
        name="name"
        id="name"
        className="block w-full border-0 bg-transparent p-0 text-gray-100 placeholder-gray-300 focus:outline-none sm:text-sm"
        placeholder={placeholder}
        onChange={handleChange}
        value={query}
      />
    </div>
  )
}
