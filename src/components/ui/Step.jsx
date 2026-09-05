function Step({ number, icon, title, active = false, }) {
    return (
        <div className="flex min-w-[13.75] flex-1 flex-col items-center">

            <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border ${active
                    ? "border-[#fa6c0a] bg-[#fa6c0a] text-white"
                    : "border-[#d8dce0] bg-white text-[#777]"
                    }`}
            >
                {icon}
            </div>

            <span
                className={`mt-1.5 text-[11px] font-medium ${active
                    ? "text-[#252525]"
                    : "text-[#85898d]"
                    }`}
            >
                {title}
            </span>

        </div>
    );
}

export default Step