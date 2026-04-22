import ProductCard from "@/components/cards/ProductCard"
import Pagination from "@/components/pages/products/Pagination"
import ProductFilterSidebar from "@/components/pages/products/ProductFilter"
import { Product } from "@/lib/types/product"

const getProducts = async (search: string, category: string, sort: string, skip: number, limit: number) => {
    const params = new URLSearchParams({
        search,
        category,
        sort,
        skip: skip.toString(),
        limit: limit.toString()
    });
    const res = await fetch(`${process.env.API}/products?${params.toString()}`, {
        next: { revalidate: 60 }
    })
    const data = await res.json();
    return data;
}

type Props = {
    searchParams: {
        skip?: string
        search?: string
        category?: string
        sort?: string
    }
}

export default async function Products({ searchParams }: Props) {
    const params = await searchParams;
    const search = params.search || "";
    const category = params.category || "";
    const sort = params.sort || "";
    const skip = parseInt(params.skip || "0");
    const limit = 12;

    const { data: products, total } = await getProducts(search, category, sort, skip, limit)
    const totalPages = Math.ceil(total / limit);

    return (
        <section className="bg-base-200 min-h-screen px-6 md:px-16 lg:px-24 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar */}
                <ProductFilterSidebar />

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                        {products.map((product: Product) => <ProductCard product={product} key={product._id} />)}

                    </div>

                    {/* Pagination */}
                    <Pagination totalPages={totalPages} currentPage={Math.floor(skip / limit) + 1} />
                </div>
            </div>
        </section >
    );
}