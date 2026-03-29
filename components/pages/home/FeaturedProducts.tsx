import ProductCard from "@/components/cards/ProductCard";
import Title from "@/components/Title";
import { Product } from "@/lib/types/product";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";



export const getProducts = async (limit: number) => {
    try {
        const res = await fetch(`${process.env.API}/products?limit=${limit}`)
        const data = await res.json();
        return data?.result;
    } catch (error) {
        throw new Error("Failed to fetch products");
    }
}

export default async function FeaturedProducts() {
    const products = await getProducts(5);

    return (
        <section className="bg-base-200 py-12">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Title>Featured Products</Title>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
                    {products.map((product: Product) => (
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