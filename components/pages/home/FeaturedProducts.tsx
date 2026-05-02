import ProductCard from "@/components/cards/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import Title from "@/components/Title";
import { Product } from "@/lib/types/product";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";



export const getProducts = async (limit: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products?limit=${limit}`, {
            next: { revalidate: 3600 }
        })
        const data = await res.json();
        return data.data;
    } catch (error) {
        throw new Error("Failed to fetch products");
    }
}

export default async function FeaturedProducts() {
    const products = await getProducts(5);

    return (
        <section className="">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}
                <SectionHeader title="Featured Products" />
                <div className="flex justify-between items-center mb-8"></div>
                <div className="flex items-center justify-between mb-8">

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