import SectionHeader from "@/components/SectionHeader";

export default function FAQSection() {
    return (
        <section className="py-16 bg-base-200">
            <div className="max-w-7xl mx-auto px-4">

                {/* Title */}
                <div className="text-center mb-10">
                </div>
                <SectionHeader title="Frequently Asked Questions"  />
                <div className="flex justify-between items-center mb-8"></div>

                {/* FAQ Items */}
                <div className="space-y-4">

                    {/* Item 1 */}
                    <div className="collapse collapse-arrow bg-base-100 shadow">
                        <input type="radio" name="faq-accordion" defaultChecked />
                        <div className="collapse-title text-lg font-medium">
                            How long does delivery take?
                        </div>
                        <div className="collapse-content text-base-content/70">
                            <p>
                                Most orders are delivered within 24 hours. If you order before
                                12 PM, we often provide same-day evening delivery within city limits.
                            </p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="collapse collapse-arrow bg-base-100 shadow">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title text-lg font-medium">
                            Are your products really 100% organic?
                        </div>
                        <div className="collapse-content text-base-content/70">
                            <p>
                                Yes, all products are sourced from certified organic farms and
                                go through strict quality checks.
                            </p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="collapse collapse-arrow bg-base-100 shadow">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title text-lg font-medium">
                            Can I pause my subscription box?
                        </div>
                        <div className="collapse-content text-base-content/70">
                            <p>
                                Absolutely. You can pause or resume your subscription anytime
                                from your account dashboard.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}