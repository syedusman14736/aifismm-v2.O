import PlatformIconSimple from "./PlatformIconSimple";

function PlatformButton({
    name,
    type,
    selected,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-start gap-2 rounded-md border px-3 py-4 text-sm font-medium transition ${selected
                ? "border-[#fa6c0a] bg-[#fff9f5] text-[#252525] ring-1 ring-[#fa6c0a]/20"
                : "border-[#dfe2e5] bg-white text-[#57595a] hover:border-[#ffb27a]"
                }`}
        >

            <PlatformIconSimple type={type} />

            {name}

        </button>
    );
}

export default PlatformButton