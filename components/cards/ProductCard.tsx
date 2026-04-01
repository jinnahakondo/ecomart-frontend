import { Product } from "@/lib/types/product";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {

    return (
        <div className="bg-base-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col h-full group">

            {/* Product Image */}
            <div className="relative rounded-xl overflow-hidden bg-base-200 group-hover:scale-110 transition-all duration-200 ">

                <Image
                    src={product?.thumbnail}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="w-full h-40 object-cover"
                />

                {/* Badge discount parcentage*/}

                <span className="absolute top-3 left-3 badge badge-primary text-primary-content">
                    {(product.discountPercentage).toFixed(0)}% OFF
                </span>

            </div>

            {/* Product Info */}
            <div className="mt-4 space-y-1 mb-4">
               
                {/* title  */}
                <h3 className="font-semibold text-base-content text-xs">
                    {product.title}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                    {/* price after discount */}
                    <span className="font-semibold text-primary">
                        BDT {product?.price.toFixed(0)}
                    </span>

                    {/* old price  */}
                    {product.price && (
                        <span className="text-sm line-through text-base-content/40">
                            BDT {product?.oldPrice.toFixed(0)}
                        </span>
                    )}
                </div>

                {/* Add To Cart */}
            </div>
            <Link href={`/products/${product?._id}`} className="btn btn-sm btn-primary rounded-full w-full  gap-2 mt-auto">
                View Details
            </Link>
        </div>
    );
}