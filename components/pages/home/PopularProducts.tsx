import ProductCard from "@/components/cards/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import Title from "@/components/Title";
import { Product } from "@/lib/types/product";

// Fetch products with limit from API
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

export default async function PopularProducts() {
    // Fetch popular products (using similar limit as featured)
    const products = await getProducts(8);

    return (
        <section className="bg-base-100 py-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}

                <SectionHeader title="Popular Products" subtitle="Most loved products by our community" />
                <div className="flex justify-between items-center mb-8"></div>

                {/* Products Grid Display popular products across 4-5 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
