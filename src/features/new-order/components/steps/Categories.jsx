import CategoryCard from "../../../../components/ui/CategoryCard";
import SectionTitle from "../../../../components/ui/SectionTitle";

function Categories({
    selectedCategory,
    onSelectCategory,
}) {
    return (
        <section className="px-4 py-2">

            <SectionTitle
                number="1"
                title="Select Category"
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                {/* CHEAP */}
                <CategoryCard
                    title="Cheap Service"
                    description="Fast & affordable services"
                    badge="Best Price"
                    selected={selectedCategory === "cheap"}
                    onClick={() => onSelectCategory("cheap")}
                />

                {/* REFILL */}
                <CategoryCard
                    title="Refill Service"
                    description="Stable services with refill facility"
                    badge="Most Stable"
                    selected={selectedCategory === "refill"}
                    onClick={() => onSelectCategory("refill")}
                />

                {/* REFUND */}
                <CategoryCard
                    title="Refund Service"
                    description="Refill + refund protection"
                    badge="Refund Available"
                    selected={selectedCategory === "refund"}
                    onClick={() => onSelectCategory("refund")}
                />

            </div>

        </section>
    );
}

export default Categories;