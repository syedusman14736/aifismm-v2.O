import {
    Headphones,
    MessageCircle,
    ChevronRight,
} from "lucide-react";

const SupportCard = ({ onContactSupport }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
            {/* Content */}
            <div className="p-5">
                {/* Icon + Heading */}
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3f1ff] text-[#6557f5]">
                        <Headphones size={19} />
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-[#172033]">
                            Need Help?
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-[#8a93a5]">
                            Having an issue with your payment? Our support
                            team is here to help.
                        </p>
                    </div>
                </div>

                {/* Support Button */}
                <button
                    type="button"
                    onClick={onContactSupport}
                    className="mt-4 flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] px-3.5 py-3 text-left transition hover:border-[#6557f5] hover:bg-[#f8f7ff]"
                >
                    <div className="flex items-center gap-2.5">
                        <MessageCircle
                            size={17}
                            className="text-[#6557f5]"
                        />

                        <span className="text-xs font-semibold text-[#172033]">
                            Contact Support
                        </span>
                    </div>

                    <ChevronRight
                        size={16}
                        className="text-[#8a93a5]"
                    />
                </button>
            </div>
        </div>
    );
};

export default SupportCard;