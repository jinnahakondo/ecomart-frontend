import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content px-2.5 py-12 md:px-16 lg:px-24">
            <div className="flex flex-col md:flex-row gap-10 md:grid-cols-4 md:justify-between md:items-center max-w-7xl mx-auto ">

                {/* Left section */}
                <div className="space-y-4 max-w-96">
                    {/* Logo */}
                    <h2 className="text-xl font-semibold text-primary">
                        ecomart
                    </h2>

                    {/* Description */}
                    <p className="text-sm leading-relaxed">
                        Your trusted partner for organic and fresh
                        food products. Delivering healthy lifestyle
                        to your doorstep since 2018.
                    </p>

                    {/* Social icons */}
                    <div className="flex gap-3 pt-2">
                        <button className="btn btn-circle btn-sm bg-base-100 border-none hover:bg-primary hover:text-primary-content">
                            <FaFacebookF size={14} />
                        </button>

                        <button className="btn btn-circle btn-sm bg-base-100 border-none hover:bg-primary hover:text-primary-content">
                            <FaTwitter size={14} />
                        </button>

                        <button className="btn btn-circle btn-sm bg-base-100 border-none hover:bg-primary hover:text-primary-content">
                            <FaInstagram size={14} />
                        </button>
                    </div>


                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold mb-4">Quick Links</h3>

                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-primary cursor-pointer">Home</li>
                        <li className="hover:text-primary cursor-pointer">Fruits & Berries</li>
                        <li className="hover:text-primary cursor-pointer">Vegetables</li>
                        <li className="hover:text-primary cursor-pointer">Special Deals</li>
                        <li className="hover:text-primary cursor-pointer">Track Order</li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h3 className="font-semibold mb-4">Customer Support</h3>

                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-primary cursor-pointer">About ecomart</li>
                        <li className="hover:text-primary cursor-pointer">Shipping Policy</li>
                        <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-primary cursor-pointer">FAQs</li>
                        <li className="hover:text-primary cursor-pointer">Contact Us</li>
                    </ul>
                </div>
                {/* Contact info */}
                <div className="text-xs pt-3 space-y-1">
                    <p>Hotline: +880 1234 567890</p>
                    <p>Email: support@ecomart.com</p>
                    <p>Address: 123 Green Valley, Organic District</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;