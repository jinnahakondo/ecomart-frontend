"use client";
import { useAuth } from "@/lib/context/AuthProvider";
import { Product } from "@/lib/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
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

// Address form types
type AddressForm = {
  fullName: string;
  phone: string;
  district: string;
  city: string;
  area: string;
  postalCode: string;
};

// Order booking component
export default function BookOrder() {
  // state
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // user info
  const { user } = useAuth();

  // router
  const router = useRouter()

  // get productId from query params
  const params = useSearchParams();
  const productId = params.get("productId")?.toString();

  // fetch product info
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setIsProductLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/products/${productId}`
        );
        const data = await res.json();
        setProductInfo(data.result);
      } catch (err) {
        console.error("Product fetch failed", err);
      } finally {
        setIsProductLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // react-hook-form setup
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddressForm>();

  // price calculation
  const price = useMemo(() => Math.round(productInfo?.price ?? 0), [productInfo]);
  const totalPrice = useMemo(() => quantity * price, [quantity, price]);

  // form submit handler
  const onSubmit = async (formData: AddressForm) => {
    if (!user) return;
    setIsSubmitting(true);

    const orderData = {
      userId: user._id,
      productId,
      quantity,
      price,
      totalPrice,
      address: formData,
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });
      if (!res.ok) throw new Error("Order submission failed");
      //  reset form and states
      setQuantity(1);
      reset();
      router.push("/dashboard/my-orders");
      // handle success (e.g. show confirmation, redirect, etc.)
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Order submission failed", error);
    } finally {
      setIsSubmitting(false);
    }

  };
  if (isProductLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="opacity-60">Complete your shipping details to place the order</p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* shipping form */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-8 space-y-6">

            {/* shipping info card */}
            <div className="card bg-base-100 shadow-sm border border-base-300">
              <div className="card-body">
                <h2 className="card-title mb-4">Shipping Information</h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <InputField
                    label="Full Name"
                    icon={<FaUser />}
                    error={errors.fullName?.message}
                    registration={register("fullName", {
                      required: "Full name is required",
                      minLength: { value: 3, message: "Name must be at least 3 characters" }
                    })}
                  />

                  <InputField
                    label="Phone Number"
                    icon={<FaPhone />}
                    error={errors.phone?.message}
                    registration={register("phone", {
                      required: "Phone number required",
                      pattern: { value: /^01[3-9]\d{8}$/, message: "Invalid Bangladesh phone number" }
                    })}
                  />

                  <InputField
                    label="District"
                    icon={<FaGlobe />}
                    error={errors.district?.message}
                    registration={register("district", { required: "District required" })}
                  />

                  <InputField
                    label="City"
                    icon={<FaCity />}
                    error={errors.city?.message}
                    registration={register("city", { required: "City required" })}
                  />

                  <InputField
                    label="Area / Street"
                    icon={<FaMapMarkerAlt />}
                    error={errors.area?.message}
                    registration={register("area", { required: "Area required" })}
                  />

                  <InputField
                    label="Postal Code"
                    icon={<FaHashtag />}
                    error={errors.postalCode?.message}
                    registration={register("postalCode", {
                      required: "Postal code required",
                      minLength: { value: 4, message: "Invalid postal code" }
                    })}
                  />
                </div>
              </div>
            </div>

            {/* quantity card */}
            <div className="card bg-base-100 shadow-sm border border-base-300">
              <div className="card-body">
                <h2 className="card-title mb-4">Quantity</h2>

                <div className="join border border-base-300">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="btn btn-ghost join-item"
                  >
                    <FaMinus size={10} />
                  </button>

                  <div className="w-14 flex items-center justify-center bg-base-200 font-bold">
                    {quantity}
                  </div>

                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="btn btn-ghost join-item"
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* summary card */}
          <aside className="lg:col-span-4 sticky top-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="text-xl font-bold flex gap-2">
                  <FaShoppingBag className="text-primary" />
                  Summary
                </h3>

                <div className="space-y-3 mt-4">
                  <SummaryRow label="Price per unit" value={`৳ ${price}`} />
                  <SummaryRow label="Quantity" value={`${quantity} units`} />
                  <SummaryRow label="Shipping" value="Free" />
                  <div className="divider"></div>
                  <SummaryRow label="Total" value={` ${totalPrice}`} bold />
                </div>

                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className={`btn btn-primary w-full mt-8 h-14 text-lg }`}
                >
                  {!isSubmitting && "Confirm Order"}
                  {isSubmitting && "order submiting..."}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// input field component
function InputField({ label, icon, registration, error }: any) {
  return (
    <div className="form-control w-full">
      <label className="label py-1">
        <span className="label-text-alt font-bold opacity-60 uppercase">{label}</span>
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 pointer-events-none">
          {icon}
        </span>

        <input
          {...registration}
          className={`input input-bordered w-full pl-12 bg-base-200/40 transition-all
            ${error ? "input-error" : "focus:input-primary"}
          `}
          placeholder={`Your ${label.toLowerCase()}`}
        />
      </div>

      <p className="text-error text-xs h-4 mt-1">{error ?? ""}</p>
    </div>
  );
}

// summary row component
function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-lg font-bold" : "text-sm opacity-70"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}