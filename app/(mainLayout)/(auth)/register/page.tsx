"use client"
import Link from 'next/link'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { FaGoogle } from 'react-icons/fa6'

interface Inputs {
    name: string,
    email: string,
    password: string,
}

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    //Login handler 
    const handleRegister: SubmitHandler<Inputs> = async (data) => {
        const uri = `${process.env.NEXT_PUBLIC_API}/auth/register`
        const res = await fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const user = await res.json()
        console.log(user)
    }
    return (
        <div className='max-w-96 mt-20 bg-base-100 border p-2.5 border-base-300 rounded-2xl mx-auto'>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className='flex flex-col gap-4'>
                    {/* name  */}
                    <div>
                        <h2 className='text-2xl font-bold text-center py-10 w-full'>
                            Register
                        </h2>
                        <input
                            {...register('name', { required: "please enter your name" })}
                            type="text"
                            placeholder="Full Name"
                            className="input w-full" />
                        {errors.name && <p className='text-error'>{errors.name.message}</p>}
                    </div>
                    {/* email  */}
                    <div>
                        <input
                            {...register('email', { required: 'pelase enter a valid email' })}
                            type="email"
                            placeholder="Email"
                            className="input w-full" />
                        {errors.email && <p className='text-error'>{errors.email.message}</p>}
                    </div>
                    {/* password  */}
                    <div>

                        <input
                            {...register('password', {
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                    message: "Password must have at least 6 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character."
                                }
                            })}
                            type="password"
                            placeholder="Password"
                            className="input w-full" />
                        {errors.password && <p className='text-error'>{errors.password.message}</p>}
                    </div>
                </div>
                {/* sign up button  */}
                <button type="submit" className='btn btn-primary mt-4 w-full'>
                    Sign Up
                </button>
            </form>
            {/* google login and other links */}
            <div className='space-y-4'>
                <p className='text-center pt-4'>OR</p>
                {/* Google */}
                <button className="btn bg-white text-black border-[#e5e5e5] w-full">
                    <FaGoogle />
                    Login with Google
                </button>

                <div className='flex items-center gap-2 justify-center text-sm md:text-base'>
                    <p className=''>Not a member yet?</p>
                    <Link href={'/login'} className='link'>Log in</Link>
                </div>
            </div>
        </div>
    )
}
