import { Product } from "@/lib/types/product";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {

    // calculate discountPrice 
    const discountPrice = (product.price / 100) * product.discountPercentage

    // calculate finalPrice and convert into bdt 
    const finalPrice = (product.price - discountPrice) * 100

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

                {/* Badge discount parcentage*/}

                <span className="absolute top-3 left-3 badge badge-primary text-primary-content">
                    {(product.discountPercentage).toFixed(0)}% OFF
                </span>

            </div>

            {/* Product Info */}
            <div className="mt-4 space-y-1">
                {/* category  */}
                <p className="text-xs text-base-content/60">
                    {product.category}
                </p>
                {/* title  */}
                <h3 className="font-semibold text-base-content">
                    {product.title}
                </h3>
                {/* weight  */}
                <p className="text-sm text-base-content/60">
                    {product.weight} KG
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                    {/* price after discount */}
                    <span className="font-semibold text-primary">
                        BDT {finalPrice.toFixed(0)}
                    </span>

                    {/* old price  */}
                    {product.price && (
                        <span className="text-sm line-through text-base-content/40">
                            BDT {(product.price * 100).toFixed(0)}
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