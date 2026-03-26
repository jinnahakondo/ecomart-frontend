import Image from "next/image";
import { FaPiggyBank } from "react-icons/fa6";

export default function DailyBestDeals() {
  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-2xl font-bold text-primary mb-8">
          Daily Best Deals
        </h2>

        <div className="grid lg:grid-cols-4 gap-6">

          {/* LEFT DEAL CARD */}
          <div className="lg:col-span-3 bg-base-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Text */}
            <div className="space-y-4 max-w-md">

              <span className="badge badge-warning text-white">
                DEAL OF THE DAY
              </span>

              <h3 className="text-3xl font-bold">
                Summer Berry Mix Selection
              </h3>

              <p className="text-base-content/70">
                The finest organic strawberries, blueberries, and raspberries
                harvested at their peak. Perfect for your morning smoothie or snack.
              </p>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  BDT 550
                </span>

                <span className="line-through text-base-content/40">
                  BDT 780
                </span>
              </div>

              <button className="btn bg-amber-700 text-white border-none hover:bg-amber-800 rounded-xl">
                Grab Deal Now
              </button>
            </div>

            {/* Image */}
            <div className="bg-base-200 p-4 rounded-2xl">
              <Image
                src="/bestdeals.png"
                alt="Berry Mix"
                width={320}
                height={320}
                className="rounded-xl object-cover"
              />
            </div>
          </div>

          {/* RIGHT SUBSCRIBE CARD */}
          <div className="bg-base-100 text-base-content/80 rounded-3xl p-8 flex flex-col justify-between">

            <div>
              <FaPiggyBank className="text-2xl mb-4" />

              <h3 className="text-2xl font-bold mb-2">
                Subscribe & Save
              </h3>

              <p className="text-base-content/80">
                Get 10% extra off on your first weekly subscription box.
              </p>
            </div>

            <button className="btn btn-primary hover:btn-outline hover:bg-transparent hover:text-primary rounded-xl">
              Learn More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}