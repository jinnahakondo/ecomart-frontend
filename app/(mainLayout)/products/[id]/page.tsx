import ProductView from '@/components/pages/products/ProductDetails/ProductView'
import ReviewSection from '@/components/pages/products/ReviewSection'
import { Product } from '@/lib/types/product'
import { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_API || process.env.API

type Props = {
    params: Promise<{ id: string }>
}

const getProduct = async (id: string) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
        next: { revalidate: 3600 },
    })

    if (!res.ok) {
        return null
    }

    const data = await res.json()
    return data?.data ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const product = await getProduct(id);

    if (!product) {
        return {
            title: 'Product not found | Ecomart',
            description: 'The requested product could not be found.',
        };
    }

    return {
        title: `${product.title} - Buy Online | Ecomart`,
        description: product.description?.substring(0, 160) ?? 'Shop quality products at Ecomart',
        openGraph: {
            title: product.title,
            description: product.description,
            images: product.thumbnail ? [{ url: product.thumbnail, width: 1200, height: 630 }] : undefined,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: product.description,
            images: product.thumbnail ? [product.thumbnail] : undefined,
        },
    };
}

export default async function ProductDetails({ params }: Props) {
    const { id } = await params
    const product: Product | null = await getProduct(id)

    if (!product) {
        notFound()
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.title,
        "description": product.description,
        "image": product.thumbnail,
        "brand": {
            "@type": "Brand",
            "name": "Ecomart"
        },
        "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "BDT",
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": 1
        }
    };

    return (
        <>
            <Script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <ProductView product={product} />
                    <ReviewSection id={product?._id} />
                </div>
            </section>
        </>
    )
}