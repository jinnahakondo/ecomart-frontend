import ProductCard, { Product } from "@/components/cards/ProductCard";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";



const getProducts = async () => {
    const res = await fetch(`${process.env.API}/products?limit=4`)
    const data = await res.json();
    return data?.result;
}

export default async function FeaturedProducts() {
    const products = await getProducts();

    return (
        <section className="bg-base-200 py-12">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-primary">
                        Featured Products
                    </h2>

                    {/* Slider Buttons */}
                    {/* <div className="flex gap-2">
                        <button className="btn btn-circle btn-ghost">
                            <FaChevronLeft />
                        </button>

                        <button className="btn btn-circle btn-ghost">
                            <FaChevronRight />
                        </button>
                    </div> */}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product:Product) => (
                        <ProductCard
                            key={product?._id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}