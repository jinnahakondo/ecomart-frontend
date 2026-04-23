import { blogPosts } from "@/lib/data/blogData";
import Link from "next/link";
import { FaArrowLeft, FaCalendar, FaUser, FaTag } from "react-icons/fa";

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = blogPosts.find(p => p.id === Number(id));

    if (!post) {
        return (
            <div className="hero min-h-[60vh] bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h2 className="text-3xl font-bold">Post not found</h2>
                        <Link href="/blog" className="btn btn-primary mt-4">
                            <FaArrowLeft /> Back to Blogs
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in duration-700 bg-base-100 text-base-content">
            {/* Navigation */}
            <Link
                href="/blog"
                className="btn btn-ghost btn-sm gap-2 mb-8 group normal-case"
            >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to all posts
            </Link>

            {/* Header Section */}
            <header className="space-y-6 mb-10">
                <div className="badge badge-primary badge-outline gap-2 py-3">
                    <FaTag size={10} />
                    {post.category}
                </div>

                <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-base-content">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm opacity-70 border-b border-base-300 pb-8">
                    <div className="flex items-center gap-2">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-8">
                                <FaUser size={14} />
                            </div>
                        </div>
                        <span className="font-bold">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCalendar />
                        <span>{post.date}</span>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-xl mb-12">
                <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
            </div>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content/80 prose-strong:text-base-content">
                <p className="text-xl leading-relaxed italic mb-8 border-l-4 border-primary pl-6 text-base-content/90">
                    {post.excerpt}
                </p>

                <div className="space-y-6">
                    <p>
                        In today's fast-paced world, finding balance is more important than ever.
                        Modern living often pulls us in a thousand directions, but adopting
                        sustainable habits can ground us and provide a sense of purpose.
                    </p>
                    <h2 className="text-2xl font-bold">Why Sustainability Matters</h2>
                    <p>
                        It's not just about the environment; it's about personal well-being.
                        When we choose products and habits that are better for the planet,
                        we often find they are better for our health and our wallets too.
                    </p>
                </div>
            </div>

            {/* Footer / Share Placeholder */}
            <footer className="mt-16 pt-8 border-t border-base-300 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm opacity-60 text-center md:text-left">
                    Enjoyed this read? Share it with your network.
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-circle btn-outline btn-sm">f</button>
                    <button className="btn btn-circle btn-outline btn-sm">t</button>
                    <button className="btn btn-circle btn-outline btn-sm">in</button>
                </div>
            </footer>
        </article>
    );
}