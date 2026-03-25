import Image from "next/image";
import Link from "next/link";

export type Product = {
    _id: number;
    title: string;
    category: string;
    weight: string;
    price: number;
    oldPrice?: number;
    thumbnail: string;
    badge?: string;
};

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
    return (
        <div className="bg-base-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition">

            {/* Product Image */}
            <div className="relative rounded-xl overflow-hidden bg-base-200">
                
                <Image
                    src={product?.thumbnail}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="w-full h-48 object-cover"
                />

                {/* Badge */}
                {product.badge && (
                    <span className="absolute top-3 left-3 badge badge-primary text-primary-content">
                        {product.badge}
                    </span>
                )}
            </div>

            {/* Product Info */}
            <div className="mt-4 space-y-1">
                <p className="text-xs text-base-content/60">
                    {product.category}
                </p>

                <h3 className="font-semibold text-base-content">
                    {product.title}
                </h3>

                <p className="text-sm text-base-content/60">
                    {product.weight}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                    <span className="font-semibold text-primary">
                        BDT {product.price}
                    </span>

                    {product.oldPrice && (
                        <span className="text-sm line-through text-base-content/40">
                            BDT {product.oldPrice}
                        </span>
                    )}
                </div>

                {/* Add To Cart */}
                <Link href={`/products/${product?._id}`} className="btn btn-primary w-full mt-3 gap-2">
                    View Details
                </Link>
            </div>
        </div>
    );
}