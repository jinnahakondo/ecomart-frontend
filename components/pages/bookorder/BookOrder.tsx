"use client";

import { useAuth } from "@/lib/providers/AuthProvider";
import { Product } from "@/lib/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaHashtag,
  FaMinus,
  FaPlus,
  FaShoppingBag,
} from "react-icons/fa";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AddressForm, OrderPayload } from "@/lib/types/bookOrder";


export default function BookOrder() {
  const [quantity, setQuantity] = useState(1);

  const { user } = useAuth();

  const router = useRouter();

  const params = useSearchParams();
  const productId = params.get("productId") || "";

  const queryClient = useQueryClient();

  // Product fetch
  const { data: productInfo, isLoading: isProductLoading } = useQuery({
    queryKey: ["book-order", productId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/products/${productId}`
      );

      if (!res.ok) throw new Error("Failed to fetch product");

      const data = await res.json();
      return data.data as Product;
    },
    enabled: !!productId,
  });

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressForm>();

  // Pricing
  const price = productInfo?.price ?? 0;
  const totalPrice = quantity * price;

  //create a order 
  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: async (orderData: OrderPayload) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      // console.log("response order:", res);

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          text: "Something went wrong!"
        })
        throw new Error("Something went wrong");
      }

      return res.json();
    },

    onSuccess: () => {

      setQuantity(1);
      reset();

      Swal.fire({
        icon: "success",
        text: "Order placed successfully"
      })

      queryClient.invalidateQueries({ queryKey: ["my-orders"] });

      router.push("/dashboard/user/my-orders");
    },

    onError: (error) => {
      console.error(error);
    },
  });

  // Submit
  const onSubmit = (formData: AddressForm) => {
    if (!user) {
      Swal.fire({
        text: "please login to place order",
      })
      return;
    }

    const orderData: OrderPayload = {
      userId: user._id,
      productId,
      quantity,
      price,
      totalPrice,
      address: formData,
    };

    // console.log("order data:", orderData);

    mutate(orderData);
  };

  // Loading
  if (isProductLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  // Redirect if no productId
  if (!productId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error font-bold">Invalid product</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="opacity-60">
            Complete your shipping details to place the order
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-12 gap-8 items-start"
        >
          {/* LEFT SIDE */}
          <div className="lg:col-span-8 space-y-6">
            {/* Shipping */}
            <div className="card bg-base-100 shadow-sm border border-base-300">
              <div className="card-body">
                <h2 className="card-title mb-4">
                  Shipping Information
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <InputField
                    label="Full Name"
                    icon={<FaUser />}
                    error={errors.fullName?.message}
                    registration={register("fullName", {
                      required: "Full name is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters",
                      },
                    })}
                  />

                  <InputField
                    label="Phone Number"
                    icon={<FaPhone />}
                    error={errors.phone?.message}
                    registration={register("phone", {
                      required: "Phone required",
                      pattern: {
                        value: /^01[3-9]\d{8}$/,
                        message: "Invalid number",
                      },
                    })}
                  />

                  <InputField
                    label="District"
                    icon={<FaGlobe />}
                    error={errors.district?.message}
                    registration={register("district", {
                      required: "Required",
                    })}
                  />

                  <InputField
                    label="City"
                    icon={<FaCity />}
                    error={errors.city?.message}
                    registration={register("city", {
                      required: "Required",
                    })}
                  />

                  <InputField
                    label="Area"
                    icon={<FaMapMarkerAlt />}
                    error={errors.area?.message}
                    registration={register("area", {
                      required: "Required",
                    })}
                  />

                  <InputField
                    label="Postal Code"
                    icon={<FaHashtag />}
                    error={errors.postalCode?.message}
                    registration={register("postalCode", {
                      required: "Required",
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="card bg-base-100 shadow-sm border border-base-300">
              <div className="card-body">
                <h2 className="card-title mb-4">Quantity</h2>

                <div className="join border border-base-300">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.max(1, q - 1))
                    }
                    className="btn btn-ghost join-item"
                  >
                    <FaMinus size={10} />
                  </button>

                  <div className="w-14 flex items-center justify-center bg-base-200 font-bold">
                    {quantity}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(99, q + 1))
                    }
                    className="btn btn-ghost join-item"
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-4 sticky top-6 self-start">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="text-xl font-bold flex gap-2">
                  <FaShoppingBag className="text-primary" />
                  Summary
                </h3>

                <div className="space-y-3 mt-4">
                  <SummaryRow
                    label="Price"
                    value={`৳ ${price.toFixed(0) || 0}`}
                  />
                  <SummaryRow
                    label="Quantity"
                    value={`${quantity}`}
                  />
                  <SummaryRow
                    label="Shipping"
                    value="Free"
                  />

                  <div className="divider" />

                  <SummaryRow
                    label="Total"
                    value={`৳ ${totalPrice.toFixed(0) || 0}`}
                    bold
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !productInfo}
                  className="btn btn-primary w-full mt-8 h-14 text-lg"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Confirm Order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- INPUT ---------------- */

type InputProps = {
  label: string;
  icon: React.ReactNode;
  registration: any;
  error?: string;
};

function InputField({
  label,
  icon,
  registration,
  error,
}: InputProps) {
  return (
    <div className="form-control w-full">
      <label className="label py-1">
        <span className="label-text-alt font-bold opacity-60 uppercase">
          {label}
        </span>
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60">
          {icon}
        </span>

        <input
          {...registration}
          className={`input input-bordered w-full pl-12 bg-base-200/40 ${error ? "input-error" : ""
            }`}
          placeholder={`Your ${label.toLowerCase()}`}
        />
      </div>

      <p className="text-error text-xs h-4 mt-1">
        {error}
      </p>
    </div>
  );
}

/* ---------------- SUMMARY ---------------- */

function SummaryRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      className={`flex justify-between ${bold ? "text-lg font-bold" : "text-sm opacity-70"
        }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}