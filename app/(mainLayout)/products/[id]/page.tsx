import ProductView from '@/components/pages/products/ProductDetails/ProductView'
import ReviewSection from '@/components/pages/products/ReviewSection'
import { Product } from '@/lib/types/product'

type Props = {
    params: { id: string }
}

const getProduct = async (id: string) => {
    const res = await fetch(`${process.env.API}/products/${id}`, {
        cache: 'no-store',
    })

    const data = await res.json()
    return data.data
}

export default async function ProductDetails({ params }: Props) {
    const { id } = await params
    const product: Product = await getProduct(id)

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
                <ProductView product={product} />
                <ReviewSection id={product?._id} />
            </div>
        </section>
    )
}