import ProductFilterSidebar from "./ProductFilter";
import Pagination from "./Pagination";
import { Product } from "@/lib/types/product";
import ProductCard from "@/components/cards/ProductCard";
import { getProducts } from "../home/FeaturedProducts";
import ProductPageHeader from "./ProductPageHeader";


export default async function Products() {
    const products = await getProducts(30)
    return (
        <section className="bg-base-200 min-h-screen px-6 md:px-16 lg:px-24 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar */}
                <ProductFilterSidebar />

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Header */}
                    <ProductPageHeader />
                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                        {products.map((product: Product) => <ProductCard product={product} key={product._id} />)}

                    </div>

                    {/* Pagination */}
                    <Pagination />
                </div>
            </div>
        </section >
    );
}