import SectionTitle from "../../../../components/ui/SectionTitle";
import PlatformButton from "../../../../components/ui/PlatformButton";

const PLATFORM_LABELS = {
    instagram: "Instagram",
    tiktok: "TikTok",
    facebook: "Facebook",
    youtube: "YouTube",
    twitter: "Twitter",
    x: "X",
    telegram: "Telegram",
    spotify: "Spotify",
    threads: "Threads",
};

function formatPlatformName(platform) {
    if (PLATFORM_LABELS[platform]) {
        return PLATFORM_LABELS[platform];
    }

    return platform
        .split("-")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");
}

function Platforms({
    availablePlatforms = [],
    selectedPlatform,
    onSelectPlatform,
    isLoading = false,
}) {
    return (
        <section className="min-w-0 mt-2 px-3 py-3 sm:px-4 sm:py-4">
            <SectionTitle
                number="2"
                title="Select Platform"
            />

            {isLoading ? (
                <div className="mt-3 grid min-w-0 grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-12 animate-pulse rounded-lg border border-[#eeeeee] bg-[#fafafa]"
                        />
                    ))}
                </div>
            ) : availablePlatforms.length > 0 ? (
                <div className="mt-3 grid min-w-0 grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
                    {availablePlatforms.map((platform) => (
                        <div
                            key={platform}
                            className="min-w-0"
                        >
                            <PlatformButton
                                name={formatPlatformName(
                                    platform
                                )}
                                type={platform}
                                selected={
                                    selectedPlatform ===
                                    platform
                                }
                                onClick={() =>
                                    onSelectPlatform(
                                        platform
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-3 rounded-md border border-[#e5e7eb] bg-[#fafafa] px-3 py-4 text-center">
                    <p className="text-xs text-[#777b80]">
                        {selectedPlatform
                            ? "No platforms available."
                            : "Select a category first."}
                    </p>
                </div>
            )}
        </section>
    );
}

export default Platforms;