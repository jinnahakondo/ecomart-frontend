import { Product } from "@/lib/types/product";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {

    return (
        <div className="bg-base-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col h-full group">

            {/* Product Image */}
            <div className="relative rounded-xl overflow-hidden bg-base-200 group-hover:scale-110 transition-all duration-200">

                <Image
                    src={product?.thumbnail}
                    alt={product.title}
                    width={400}
                    height={400}
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={false}
                    className="w-full h-40 object-cover"
                />

                {/* Badge discount percentage*/}
                <span className="absolute top-3 left-3 badge badge-primary text-primary-content">
                    {Math.round(product.discountPercentage)}% OFF
                </span>

            </div>

            {/* Product Info */}
            <div className="mt-4 space-y-1 mb-4">

                {/* title  */}
                <h3 className="font-semibold text-base-content text-xs line-clamp-2">
                    {product.title}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                    {/* price after discount */}
                    <span className="font-semibold text-primary">
                        BDT {Math.round(product?.price)}
                    </span>

                    {/* old price  */}
                    {product.price && (
                        <span className="text-sm line-through text-base-content/40">
                            BDT {Math.round(product?.oldPrice)}
                        </span>
                    )}
                </div>

                {/* Stock Status */}
                <p className="text-xs text-success font-medium">
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-auto">
                <Link href={`/products/${product?._id}`} className="btn btn-sm btn-primary flex-1 rounded-full gap-1" >
                    View Details
                </Link>
               
            </div>
        </div>
    );
}