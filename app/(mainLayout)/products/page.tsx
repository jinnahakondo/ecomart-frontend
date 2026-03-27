import ProductCard from "@/components/cards/ProductCard"
import Pagination from "@/components/pages/products/Pagination"
import ProductFilterSidebar from "@/components/pages/products/ProductFilter"
import ProductPageHeader from "@/components/pages/products/ProductPageHeader"
import { Product } from "@/lib/types/product"

const getProducts = async (search: string, category: string) => {
    const res = await fetch(`${process.env.API}/products?search=${search}&&category=${category}`)
    const data = await res.json();
    return data?.result;
}

type Props = {
    searchParams: {
        skip?: string
        search?: string
        category?: string
    }
}

export default async function Products({ searchParams }: Props) {
    const params = await searchParams;
    const search = params.search || "";
    const category = params.category || "";

    const products = await getProducts(search,category)
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