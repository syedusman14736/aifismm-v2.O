import SectionTitle from "../../../../components/ui/SectionTitle"
import PlatformButton from "../../../../components/ui/PlatformButton";

function Platforms({ selectedPlatform, onSelectPlatform }) {
    return (
        <>
            <section className="px-4 mt-2">

                <SectionTitle
                    number="2"
                    title="Select Platform"
                />

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                    <PlatformButton
                        name="Instagram"
                        type="instagram"
                        selected={selectedPlatform === "instagram"}
                        onClick={() => onSelectPlatform("instagram")}
                    />

                    <PlatformButton
                        name="TikTok"
                        type="tiktok"
                        selected={selectedPlatform === "tiktok"}
                        onClick={() => onSelectPlatform("tiktok")}
                    />

                    <PlatformButton
                        name="Facebook"
                        type="facebook"
                        selected={selectedPlatform === "facebook"}
                        onClick={() => onSelectPlatform("facebook")}
                    />

                </div>

            </section>
        </>
    )
}

export default Platforms