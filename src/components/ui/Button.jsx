function Button({ title, onClick, variant }) {

    return (
        <button onClick={onClick} className={`capitalize px-4 py-2 rounded cursor-pointer text-sm ${variant === "primary" ? "bg-[#fa6c0a] text-white" : variant === "disabled" ? "bg-white text-[#57595a]" : "bg-[#f4f6f8] text-[#57595a]"} border border-[#cdd0cf]`}>{title}</button>
    )
}

export default Button