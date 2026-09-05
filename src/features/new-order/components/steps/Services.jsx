import SectionTitle from "../../../../components/ui/SectionTitle";
import { Check, ChevronDown } from "lucide-react";

const SERVICE_TYPE_LABELS = {
    followers: "Followers",
    likes: "Likes",
    views: "Views",
    shares: "Shares",
    saves: "Saves",
    comments: "Comments",
};

function Services({
    availableServiceTypes,
    filteredServices,
    selectedType,
    selectedServiceId,
    selectedService,
    onSelectType,
    onSelectService,
}) {
    return (
        <section className="px-4 py-4">

            <SectionTitle
                number="3"
                title="Select Service"
            />

            <div className="flex flex-col gap-2">

                {/* SERVICE TYPE */}
                <div className="relative">

                    <select
                        value={selectedType || ""}
                        onChange={(e) => onSelectType(e.target.value)}
                        className="h-11 w-full appearance-none rounded-md border border-[#d8dce0] bg-white px-4 pr-10 text-sm text-[#57595a] outline-none transition focus:border-[#fa6c0a] focus:ring-2 focus:ring-[#fa6c0a]/10"
                    >
                        <option value="" disabled>
                            Select service type
                        </option>

                        {availableServiceTypes.map((type) => (
                            <option
                                key={type}
                                value={type}
                            >
                                {SERVICE_TYPE_LABELS[type] || type}
                            </option>
                        ))}
                    </select>

                    <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#777]"
                    />

                </div>


                {/* SERVICE */}
                <div className="relative">

                    <select
                        value={selectedServiceId || ""}
                        onChange={(e) =>
                            onSelectService(Number(e.target.value))
                        }
                        disabled={
                            !selectedType ||
                            filteredServices.length === 0
                        }
                        className="h-11 w-full appearance-none rounded-md border border-[#d8dce0] bg-white px-4 pr-10 text-sm text-[#57595a] outline-none transition focus:border-[#fa6c0a] focus:ring-2 focus:ring-[#fa6c0a]/10 disabled:bg-[#f5f5f5] disabled:text-[#999]"
                    >
                        <option value="" disabled>
                            {!selectedType
                                ? "Select service type first"
                                : "Choose a service"}
                        </option>

                        {filteredServices.map((item) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name} — PKR {item.rate} / 1000
                            </option>
                        ))}
                    </select>

                    <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#777]"
                    />

                </div>

            </div>


            {/* SERVICE INFO */}

            {selectedService && (
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-[#bce7cf] bg-[#f4fff8] px-3 py-2 text-xs text-[#21a366]">

                    <Check size={14} />

                    <span>
                        High Speed
                    </span>

                    <span>•</span>

                    <span>
                        Start: {selectedService.speed}
                    </span>

                    <span>•</span>

                    <span>
                        Drop: {selectedService.drop}
                    </span>

                    <span>•</span>

                    <span>
                        Refill:{" "}
                        {selectedService.refill?.enabled
                            ? selectedService.refill.duration === "lifetime"
                                ? "Lifetime"
                                : selectedService.refill.duration
                            : "No"}
                    </span>

                    <span>•</span>

                    <span>
                        Quality: {selectedService.quality}
                    </span>

                    <span className="ml-auto font-semibold">
                        PKR {selectedService.rate} / 1000
                    </span>

                </div>
            )}

        </section>
    );
}

export default Services;