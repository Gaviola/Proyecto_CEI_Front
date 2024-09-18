export default function InputSearcher( {onChange, onEnter, placeholder}: {onChange: (value: string) => void, onEnter?: (value: string) => void, placeholder: string} ) {
    return (
        <input
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => { e.key === "Enter" && onEnter && onEnter(e.currentTarget.value); }}
            type="text"
            placeholder={placeholder}
            className="border-1 border-gray-300 rounded-lg px-4 py-1 m-2"
        /> 
    )
}