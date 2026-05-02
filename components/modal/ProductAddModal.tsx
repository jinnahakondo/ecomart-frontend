"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    FaPlus,
    FaCircleExclamation,
    FaBoxOpen,
    FaDollarSign,
    FaImage,
    FaAlignLeft,
} from "react-icons/fa6";
import { Sparkles } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";
import { categoryData } from "@/lib/data/categoryData";

interface ProductInputs {
    title: string;
    description: string;
    category: string;
    oldPrice: number;
    price: number;
    discountPercentage: number;
    stock: number;
    brand: string;
    weight: number;
    availabilityStatus: string;
    thumbnail: string;
    images: string;
}

interface Props {
    modalRef: React.RefObject<HTMLDialogElement | null>;
}

export default function ProductAddModal({ modalRef }: Props) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ProductInputs>();

    const productTitle = watch("title");

    // AI description generator
    const {
        mutate: generateDescription,
        isPending: isAiPending,
        isError: isAiError,
        isSuccess: isAiSuccess,
    } = useMutation({
        mutationFn: async (title: string) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API}/ai/generate-description`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title }),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result?.message || "AI description failed");
            }

            return result?.data?.description;
        },

        onSuccess: (description) => {
            setValue("description", description, {
                shouldValidate: true,
            });
            toast.success("Description generated");
        },

        onError: (error: any) => {
            toast.error(error.message || "Failed to generate description");
        },
    });

    // Add product mutation
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: ProductInputs) => {
            const formattedData = {
                ...data,
                images: data.images
                    .split(",")
                    .map((img) => img.trim())
                    .filter(Boolean),
            };

            console.log("data", formattedData);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });


            const result = await res.json();
            if (!res.ok) {
                throw new Error(result?.message || "Failed to add product");
            }

            return result;
        },

        onSuccess: () => {
            reset();
            modalRef.current?.close();
            toast.success("Product added successfully!");
        },

        onError: (error: any) => {
            toast.error(error.message || "Failed to add product. Please try again.");
        },
    });

    // Prevent duplicate submit
    const onSubmit: SubmitHandler<ProductInputs> = (data) => {
        if (isPending) return;
        mutate(data);
    };

    // Prevent closing while loading
    const closeModal = () => {
        if (isPending || isAiPending) return;
        modalRef.current?.close();
    };

    return (
        <dialog ref={modalRef} className="modal backdrop-blur-sm">
            <div className="modal-box max-w-3xl rounded-3xl p-0 bg-base-100 shadow-2xl border border-base-200">
                {/* Header */}
                <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-200/20">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <FaPlus className="text-primary" />
                        Add New Product
                    </h3>

                    <button
                        type="button"
                        onClick={closeModal}
                        disabled={isPending || isAiPending}
                        className="btn btn-sm btn-circle btn-ghost"
                    >
                        ✕
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar"
                >
                    {/* Basic info */}
                    <div className="space-y-4">
                        <p className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                            <FaBoxOpen />
                            Basic Information
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Title */}
                            <div className="form-control md:col-span-2">
                                <label className="label-text mb-1.5 ml-1 text-xs font-bold opacity-60 uppercase">
                                    Product Title
                                </label>

                                <input
                                    {...register("title", {
                                        required: "Title is required",
                                    })}
                                    className="input input-bordered w-full rounded-xl"
                                    placeholder="Product title"
                                />

                                {errors.title && (
                                    <span className="text-error text-xs mt-1">
                                        {errors.title.message}
                                    </span>
                                )}
                            </div>

                            {/* Brand */}
                            <div className="form-control">
                                <label className="label-text text-xs mb-1">Brand</label>

                                <input
                                    {...register("brand", {
                                        required: "Brand required",
                                    })}
                                    className="input input-bordered rounded-xl"
                                />

                                {errors.brand && (
                                    <span className="text-error text-xs mt-1">
                                        {errors.brand.message}
                                    </span>
                                )}
                            </div>

                            {/* Category */}
                            <div className="form-control">
                                <label className="label-text text-xs mb-1">Category</label>

                                <select
                                    {...register("category", {
                                        required: "Category required",
                                    })}
                                    className="select select-bordered rounded-xl"
                                >
                                    <option value="">Select</option>

                                    {categoryData.map((category) => (
                                        <option key={category} value={category}>
                                            {category.toUpperCase()}
                                        </option>
                                    ))}
                                </select>

                                {errors.category && (
                                    <span className="text-error text-xs mt-1">
                                        {errors.category.message}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <div className="form-control md:col-span-2">
                                <div className="flex justify-between mb-2">
                                    <label className="label-text text-xs flex items-center gap-1">
                                        <FaAlignLeft size={10} />
                                        Description
                                    </label>

                                    <div className="flex items-center gap-2">
                                        {isAiSuccess && (
                                            <span className="text-success text-xs flex items-center gap-1">
                                                <FaCheckCircle />
                                                Done
                                            </span>
                                        )}

                                        {isAiError && (
                                            <span className="text-error text-xs flex items-center gap-1">
                                                <FaCircleExclamation />
                                                Failed
                                            </span>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => generateDescription(productTitle)}
                                            disabled={!productTitle || isAiPending || isPending}
                                            className="btn btn-xs btn-primary"
                                        >
                                            {isAiPending ? (
                                                <span className="loading loading-spinner loading-xs"></span>
                                            ) : (
                                                <Sparkles size={12} />
                                            )}

                                            AI Magic
                                        </button>
                                    </div>
                                </div>

                                <textarea
                                    {...register("description", {
                                        required: "Description required",
                                    })}
                                    className="textarea textarea-bordered rounded-xl h-32 w-full"
                                ></textarea>

                                {errors.description && (
                                    <span className="text-error text-xs mt-1">
                                        {errors.description.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4">
                        <p className="text-xs font-black text-secondary uppercase tracking-widest flex items-center gap-2">
                            <FaDollarSign />
                            Pricing & Inventory
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <input
                                type="number"
                                placeholder="Price"
                                {...register("price", {
                                    required: true,
                                    valueAsNumber: true,
                                })}
                                className="input input-bordered rounded-xl"
                            />

                            <input
                                type="number"
                                placeholder="Old Price"
                                {...register("oldPrice", {
                                    valueAsNumber: true,
                                })}
                                className="input input-bordered rounded-xl"
                            />

                            <input
                                type="number"
                                placeholder="Stock"
                                {...register("stock", {
                                    required: true,
                                    valueAsNumber: true,
                                })}
                                className="input input-bordered rounded-xl"
                            />

                            <input
                                type="number"
                                step="0.01"
                                placeholder="Weight"
                                {...register("weight", {
                                    valueAsNumber: true,
                                })}
                                className="input input-bordered rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Media */}
                    <div className="space-y-4">
                        <p className="text-xs font-black text-accent uppercase tracking-widest flex items-center gap-2">
                            <FaImage />
                            Media Assets
                        </p>

                        <input
                            {...register("thumbnail", {
                                required: "Thumbnail required",
                            })}
                            className="input input-bordered rounded-xl w-full"
                            placeholder="Thumbnail URL"
                        />

                        <textarea
                            {...register("images", {
                                required: "Images required",
                            })}
                            className="textarea textarea-bordered rounded-xl w-full h-24"
                            placeholder="img1.jpg, img2.jpg"
                        ></textarea>
                    </div>

                    {/* Footer */}
                    <div className="pt-6 flex gap-3 border-t border-base-200 sticky bottom-0 bg-base-100">
                        <button
                            type="button"
                            onClick={closeModal}
                            disabled={isPending || isAiPending}
                            className="btn btn-ghost flex-1 rounded-xl"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isPending || isAiPending}
                            className="btn btn-primary flex-2 rounded-xl text-white"
                        >
                            {isPending ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Adding...
                                </>
                            ) : (
                                "Add Product"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}