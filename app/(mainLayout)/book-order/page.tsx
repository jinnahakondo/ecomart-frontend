"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaHashtag,
  FaChevronRight,
  FaMinus,
  FaPlus,
  FaShoppingBag,
} from "react-icons/fa";

/* --------------------------------------------------
   Types
-------------------------------------------------- */
type AddressForm = {
  fullName: string;
  phone: string;
  district: string;
  city: string;
  area: string;
  postalCode: string;
};

/* --------------------------------------------------
   Constants
-------------------------------------------------- */
const UNIT_PRICE = 850;

/* --------------------------------------------------
   Main Component
-------------------------------------------------- */
export default function OrderBooking() {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ---------------------------------------------
     React Hook Form setup
  --------------------------------------------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({
    defaultValues: {
      fullName: "MD Jinnah Akondo",
      phone: "01700000000",
      district: "Gaibandha",
      city: "Gaibandha",
      area: "Sadullapur",
      postalCode: "5710",
    },
  });

  const totalPrice = quantity * UNIT_PRICE;

  /* ---------------------------------------------
     Submit Handler
  --------------------------------------------- */
  const onSubmit = async (data: AddressForm) => {
    setLoading(true);

    setTimeout(() => {
      console.log("Final Order", {
        address: data,
        quantity,
        totalPrice,
      });

      alert("Order placed successfully");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="opacity-60">
            Complete your shipping details to place the order.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* ---------------- FORM ---------------- */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-8 space-y-6"
          >
            {/* Shipping Card */}
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
                        message: "Name must be at least 3 characters",
                      },
                    })}
                  />

                  <InputField
                    label="Phone Number"
                    icon={<FaPhone />}
                    error={errors.phone?.message}
                    registration={register("phone", {
                      required: "Phone number required",
                      pattern: {
                        value: /^01[3-9]\d{8}$/,
                        message: "Invalid Bangladesh phone number",
                      },
                    })}
                  />

                  <InputField
                    label="district"
                    icon={<FaGlobe />}
                    error={errors.district?.message}
                    registration={register("district", {
                      required: "District required",
                    })}
                  />

                  <InputField
                    label="City"
                    icon={<FaCity />}
                    error={errors.city?.message}
                    registration={register("city", {
                      required: "City required",
                    })}
                  />

                  <InputField
                    label="Area / Street"
                    icon={<FaMapMarkerAlt />}
                    error={errors.area?.message}
                    registration={register("area", {
                      required: "Area required",
                    })}
                  />

                  <InputField
                    label="Postal Code"
                    icon={<FaHashtag />}
                    error={errors.postalCode?.message}
                    registration={register("postalCode", {
                      required: "Postal code required",
                      minLength: {
                        value: 4,
                        message: "Invalid postal code",
                      },
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Quantity Card */}
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
                    onClick={() => setQuantity((q) => q + 1)}
                    className="btn btn-ghost join-item"
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* ---------------- SUMMARY ---------------- */}
          <aside className="lg:col-span-4 sticky top-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="text-xl font-bold flex gap-2">
                  <FaShoppingBag className="text-primary" />
                  Summary
                </h3>

                <div className="space-y-3 mt-4">
                  <Row label="Price per unit" value={`৳ ${UNIT_PRICE}`} />
                  <Row label="Quantity" value={`${quantity} units`} />
                  <Row label="Shipping" value="Free" />

                  <div className="divider"></div>

                  <Row
                    label="Total"
                    value={`৳ ${totalPrice}`}
                    bold
                  />
                </div>

                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                  className={`btn btn-primary w-full mt-8 h-14 text-lg ${loading ? "loading" : ""
                    }`}
                >
                  {!loading && "Confirm Order"}
                  {!loading && <FaChevronRight size={14} />}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------
   Input Component with Validation UI
-------------------------------------------------- */
function InputField({ label, icon, registration, error }: any) {
  return (
    <div className="form-control w-full">
      <label className="label py-1">
        <span className="label-text-alt font-bold opacity-60 uppercase">
          {label}
        </span>
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60">
          {icon}
        </div>

        <input
          {...registration}
          className={`input input-bordered w-full pl-12 bg-base-200/40 ${error ? "input-error" : "focus:input-primary"
            }`}
          placeholder={`Your ${label.toLowerCase()}`}
        />

        {error && (
          <p className="text-error text-xs mt-1">{error}</p>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------
   Summary Row
-------------------------------------------------- */
function Row({
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