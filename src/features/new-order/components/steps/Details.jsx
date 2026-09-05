import SectionTitle from "../../../../components/ui/SectionTitle";
import { LinkIcon, ShieldCheck } from "lucide-react";

function Details({
    link,
    quantity,
    onLinkChange,
    onQuantityChange,
    selectedService,
}) {
    return (
        <section className="px-4 pb-5">

            <SectionTitle
                number="4"
                title="Order Details"
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                {/* LINK */}

                <div>

                    <label className="mb-1.5 block text-xs font-medium text-[#57595a]">
                        Link
                    </label>

                    <div className="relative">

                        <LinkIcon
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#85898d]"
                        />

                        <input
                            type="url"
                            value={link}
                            onChange={(e) =>
                                onLinkChange(e.target.value)
                            }
                            placeholder="https://www.instagram.com/username"
                            className="h-11 w-full rounded-md border border-[#d8dce0] pl-10 pr-3 text-sm text-[#57595a] outline-none placeholder:text-[#a3a7aa] focus:border-[#fa6c0a] focus:ring-2 focus:ring-[#fa6c0a]/10"
                        />

                    </div>

                    <p className="mt-1 text-[11px] text-[#85898d]">
                        Enter your profile or post link
                    </p>

                </div>


                {/* QUANTITY */}

                <div>

                    <label className="mb-1.5 block text-xs font-medium text-[#57595a]">
                        Quantity
                    </label>

                    <input
                        type="number"
                        value={quantity}
                        min={selectedService?.min || 100}
                        max={selectedService?.max || 100000}
                        onChange={(e) =>
                            onQuantityChange(e.target.value)
                        }
                        disabled={!selectedService}
                        placeholder={
                            selectedService
                                ? "Enter quantity"
                                : "Select a service first"
                        }
                        className="h-11 w-full rounded-md border border-[#d8dce0] px-3 text-sm text-[#57595a] outline-none placeholder:text-[#a3a7aa] focus:border-[#fa6c0a] focus:ring-2 focus:ring-[#fa6c0a]/10 disabled:bg-[#f5f5f5] disabled:text-[#999]"
                    />

                    <p className="mt-1 text-[11px] text-[#85898d]">
                        Min: {selectedService?.min || 100} • Max:{" "}
                        {selectedService?.max || 100000}
                    </p>

                </div>

            </div>


            {/* SECURITY INFO */}

            <div className="mt-5 flex w-full gap-2 rounded-md border border-[#c9d8ff] bg-[#f5f8ff] p-3">

                <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-[#3867e8]"
                />

                <div>

                    <p className="text-sm font-medium text-[#3867e8]">
                        Safe & Secure
                    </p>

                    <p className="mt-0.5 text-xs text-[#63708a]">
                        Your orders and data are safe with us.
                    </p>

                </div>

            </div>

        </section>
    );
}

export default Details;