function SummaryRow({
    icon,
    label,
    value,
    last = false,
}) {
    return (
        <div
            className={`flex items-center gap-3 py-3 ${!last
                ? "border-b border-[#edf0f2]"
                : ""
                }`}
        >

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#f3f5f7] text-[#666b70]">
                {icon}
            </div>

            <span className="min-w-0 text-xs font-medium text-[#57595a]">
                {label}
            </span>

            <span
                className="ml-auto max-w-[150px] truncate text-right text-xs font-medium text-[#33373a]"
                title={value}
            >
                {value}
            </span>

        </div>
    )
}

export default SummaryRow