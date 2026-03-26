import Title from "@/components/Title";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Verified Buyer",
        image: "/users/user1.jpg",
        review:
            "The quality of the vegetables is unmatched. They stay fresh for nearly a week in the fridge. Highly recommended!",
        rating: 5,
    },
    {
        name: "David Miller",
        role: "Local Chef",
        image: "/users/user2.jpg",
        review:
            "Convenient, ethical, and delicious. Greenhouse has completely changed how I shop for groceries.",
        rating: 4,
    },
    {
        name: "Elena Gomez",
        role: "Nutritionist",
        image: "/users/user3.jpg",
        review:
            "I love the transparent sourcing. Knowing where my food comes from is very important for my family.",
        rating: 5,
    },
];

export default function TestimonialSection() {
    return (
        <section className="bg-base-200 py-16">
            <div className="max-w-7xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-12">
                    <Title>What Our Clients Say</Title>

                    <p className="text-base-content/70 mt-2">
                        Join over 10,000 happy families eating fresh organic food every day.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="bg-base-100 rounded-2xl p-6 shadow-sm"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 text-yellow-500 mb-4">
                                {[...Array(item.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>

                            {/* Review */}
                            <p className="text-base-content/80 italic leading-relaxed mb-6">
                                {item.review}
                            </p>

                            {/* User */}
                            <div className="flex items-center gap-3">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={45}
                                    height={45}
                                    className="rounded-full object-cover"
                                />

                                <div>
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-sm text-base-content/60">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}