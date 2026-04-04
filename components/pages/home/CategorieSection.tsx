import SectionHeader from '@/components/SectionHeader'
import Title from '@/components/Title'
import { categories } from '@/lib/category.data'
import React from 'react'


export default function Categories() {

    return (
        <section className='max-w-7xl mx-auto'>
            {/* Header */}
            <div className='pt-24'>
                <SectionHeader title="Explore Categories" subtitle="  Shop by your favorite product groups" />
                <div className="flex justify-between items-center mb-8">
                </div>

                <div className='flex justify-end'>
                    <button className="text-primary font-medium hover:underline">
                        View All +
                    </button>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
                {
                    categories.map((category, i) => <div key={i} className='flex flex-col items-center gap-2 cursor-pointer group'>
                        {/* Icon Circle */}
                        <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center transition group-hover:bg-primary/10">
                            {category.Icon}
                        </div>

                        {/* Category Name */}
                        <p className="text-sm text-base-content/80 text-center">
                            {category?.category}
                        </p>
                    </div>)
                }
            </div>

        </section>
    )
}
