"use client";

import { useAuth } from "@/lib/providers/AuthProvider";
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import { FiCheck, FiX, FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { updateUser } from "@/lib/api/user";

type FormData = {
    name: string;
    email: string;
    phoneNumber?: number;
    designation?: string;
    district?: string;
    city?: string;
};

export default function Profile() {
    const { user, setUser } = useAuth(); // make sure setUser is exposed from your AuthProvider

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            designation: user?.designation,
            district: user?.district,
            city: user?.city,
        },
    });

    // --- Avatar upload mutation ---
    const avatarMutation = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("avatar", file);
            // Replace with your actual avatar upload endpoint
            const res = await fetch(`/api/users/${user!._id}/avatar`, {
                method: "PATCH",
                body: formData,
            });
            if (!res.ok) throw new Error("Upload failed");
            return res.json(); // expects { avatarUrl: string }
        },
        onSuccess: (data) => {
            setUser?.((prev) => prev ? { ...prev, avatar: data.avatarUrl } : prev);
            setPreview(null);
            setAvatarFile(null);
            Swal.fire({
                icon: "success",
                title: "Photo updated",
                timer: 1500,
                showConfirmButton: false,
            });
        },
        onError: () => {
            Swal.fire({ icon: "error", title: "Photo upload failed" });
        },
    });

    // --- Profile update mutation ---
    const profileMutation = useMutation({
        mutationFn: (data: FormData) => updateUser(user!._id, data),
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Profile updated",
                timer: 1500,
                showConfirmButton: false,
            });
        },
        onError: () => {
            Swal.fire({ icon: "error", title: "Update failed" });
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate type
        if (!file.type.startsWith("image/")) {
            Swal.fire({ icon: "error", title: "Please select an image file" });
            return;
        }

        // Validate size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            Swal.fire({ icon: "error", title: "Image must be under 2MB" });
            return;
        }

        setAvatarFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleAvatarSave = () => {
        if (avatarFile) avatarMutation.mutate(avatarFile);
    };

    const handleAvatarDiscard = () => {
        setPreview(null);
        setAvatarFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const initials = user?.name
        ?.split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const displayAvatar = preview ?? user?.avatar;

    return (
        <div className="bg-base-200 min-h-screen p-6 lg:p-8">
            <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">

                {/* Profile card */}
                <div className="card bg-base-100 overflow-hidden">
                    <div className="bg-primary h-20 w-full" />

                    <div className="flex flex-col items-center px-6 pb-6 -mt-10">

                        {/* Avatar + edit */}
                        <div className="relative mb-3">
                            <div className="w-20 h-20 rounded-full border-[3px] border-base-100 bg-primary/10 flex items-center justify-content overflow-hidden">
                                {displayAvatar ? (
                                    <Image
                                        src={displayAvatar}
                                        alt="avatar"
                                        width={80}
                                        height={80}
                                        className="object-cover w-full h-full"
                                        unoptimized={!!preview} // blob URLs aren't Next.js optimizable
                                    />
                                ) : (
                                    <span className="text-primary font-semibold text-2xl w-full text-center">
                                        {initials}
                                    </span>
                                )}
                            </div>

                            {/* Hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="btn btn-primary btn-xs rounded-full absolute -bottom-1 -right-1 p-0 w-7 h-7 min-h-0"
                            >
                                <FaPen size={10} />
                            </button>
                        </div>

                        <h2 className="text-base font-semibold text-base-content">
                            {user?.name}
                        </h2>
                        {user?.designation && (
                            <p className="text-sm text-base-content/50 mt-0.5">
                                {user.designation}
                            </p>
                        )}

                        <div className="badge badge-success badge-sm gap-1.5 mt-3 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-success-content/70 inline-block" />
                            Active member
                        </div>

                        {/* Preview action bar — appears only after picking a file */}
                        {preview && (
                            <div className="w-full mt-4 rounded-xl border border-warning/30 bg-warning/10 p-3 space-y-2">
                                <p className="text-xs text-warning-content font-medium text-center">
                                    New photo selected
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={handleAvatarDiscard}
                                        className="btn btn-sm btn-ghost flex-1 h-8 min-h-0 text-xs"
                                        disabled={avatarMutation.isPending}
                                    >
                                        <FiX size={13} /> Discard
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAvatarSave}
                                        className="btn btn-primary btn-sm flex-1 h-8 min-h-0 text-xs"
                                        disabled={avatarMutation.isPending}
                                    >
                                        {avatarMutation.isPending ? (
                                            <span className="loading loading-spinner loading-xs" />
                                        ) : (
                                            <FiUpload size={13} />
                                        )}
                                        {avatarMutation.isPending ? "Uploading…" : "Upload"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {user?.district || user?.city ? (
                            <>
                                <div className="divider my-3" />
                                <div className="grid grid-cols-2 gap-2 w-full">
                                    {user?.district && (
                                        <div className="bg-base-200 rounded-xl p-3 text-center">
                                            <p className="text-sm font-medium text-primary">{user.district}</p>
                                            <p className="text-xs text-base-content/40 mt-0.5">District</p>
                                        </div>
                                    )}
                                    {user?.city && (
                                        <div className="bg-base-200 rounded-xl p-3 text-center">
                                            <p className="text-sm font-medium text-primary">{user.city}</p>
                                            <p className="text-xs text-base-content/40 mt-0.5">City</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>

                {/* Form — unchanged from previous */}
                <div className="lg:col-span-2">
                    <form
                        onSubmit={handleSubmit((data) => profileMutation.mutate(data))}
                        className="card bg-base-100 p-6 lg:p-8 space-y-6"
                    >
                        <section className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-base-content/40">
                                Personal info
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <label className="form-control w-full">
                                    <div className="label pb-1">
                                        <span className="label-text text-xs font-medium">Full name</span>
                                    </div>
                                    <input
                                        className={`input input-bordered w-full input-sm h-10 ${errors.name ? "input-error" : ""}`}
                                        placeholder="e.g. Arif Karimov"
                                        {...register("name", {
                                            required: "Name is required",
                                            minLength: { value: 3, message: "Min 3 characters" },
                                        })}
                                    />
                                    {errors.name && (
                                        <div className="label pt-1">
                                            <span className="label-text-alt text-error">{errors.name.message}</span>
                                        </div>
                                    )}
                                </label>

                                <label className="form-control w-full">
                                    <div className="label pb-1">
                                        <span className="label-text text-xs font-medium">Designation</span>
                                    </div>
                                    <input
                                        className="input input-bordered w-full input-sm h-10"
                                        placeholder="e.g. Agronomist"
                                        {...register("designation")}
                                    />
                                </label>
                            </div>
                        </section>

                        <div className="divider my-0" />

                        <section className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-base-content/40">
                                Contact details
                            </p>
                            <div className="space-y-4">
                                <label className="form-control w-full">
                                    <div className="label pb-1">
                                        <span className="label-text text-xs font-medium">Email address</span>
                                    </div>
                                    <input
                                        type="email"
                                        className={`input input-bordered w-full input-sm h-10 ${errors.email ? "input-error" : ""}`}
                                        placeholder="you@example.com"
                                        {...register("email", { required: "Email is required" })}
                                    />
                                    {errors.email && (
                                        <div className="label pt-1">
                                            <span className="label-text-alt text-error">{errors.email.message}</span>
                                        </div>
                                    )}
                                </label>

                                <label className="form-control w-full">
                                    <div className="label pb-1">
                                        <span className="label-text text-xs font-medium">Phone number</span>
                                    </div>
                                    <input
                                        type="tel"
                                        className="input input-bordered w-full input-sm h-10"
                                        placeholder="+880 1X XXXX XXXX"
                                        {...register("phoneNumber")}
                                    />
                                </label>
                            </div>
                        </section>

                        <div className="divider my-0" />

                        <section className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-base-content/40">
                                Location
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <label className="form-control w-full">
                                    <div className="label pb-1">
                                        <span className="label-text text-xs font-medium">District</span>
                                    </div>
                                    <input
                                        className="input input-bordered w-full input-sm h-10"
                                        placeholder="e.g. Dhaka"
                                        {...register("district")}
                                    />
                                </label>

                                <label className="form-control w-full">
                                    <div className="label pb-1">
                                        <span className="label-text text-xs font-medium">City / Upazila</span>
                                    </div>
                                    <input
                                        className="input input-bordered w-full input-sm h-10"
                                        placeholder="e.g. Mirpur"
                                        {...register("city")}
                                    />
                                </label>
                            </div>
                        </section>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={profileMutation.isPending}
                        >
                            {profileMutation.isPending ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                <FiCheck size={16} />
                            )}
                            {profileMutation.isPending ? "Saving…" : "Save changes"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}