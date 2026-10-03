function CategoryCard({
    title,
    description,
    badge,
    selected,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full relative rounded-md border text-left transition ${selected
                ? "border-[#fa6c0a] bg-[#fff9f5] ring-1 ring-[#fa6c0a]/20"
                : "border-[#dfe2e5] bg-white hover:border-[#ffb27a]"
                }`}
        >

            <div className="flex flex-col gap-1 justify-start items-start">
                <div className="flex p-2.5 items-center justify-between w-full">

                    <div
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${selected
                            ? "border-[#fa6c0a]"
                            : "border-[#c8ccd0]"
                            }`}
                    >
                        {selected && (
                            <div className="h-2 w-2 rounded-full bg-[#fa6c0a]" />
                        )}
                    </div>

                    {badge && (
                        <span className="rounded-full bg-[#e7f8ee] px-2 py-0.5 text-[10px] font-medium text-[#21a366]">
                            {badge}
                        </span>
                    )}
                </div>


                <div className="w-full px-4 pb-4">

                    <div>

                        <span className="text-sm font-medium text-[#252525]">
                            {title}
                        </span>
                    </div>

                    <p className="text-xs text-[#57595a]">
                        {description}
                    </p>

                </div>

            </div>

        </button >
    );
}

export default CategoryCard