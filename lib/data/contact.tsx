import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export const contactInfo = [
    {
        icon: <FaEnvelope />,
        title: "Email Us",
        details: "hello@example.com",
        link: "mailto:hello@ecomart.com"
    },
    {
        icon: <FaPhoneAlt />,
        title: "Call Us",
        details: "+880 1234-567890",
        link: "tel:+8801234567890"
    },
    {
        icon: <FaMapMarkerAlt />,
        title: "Visit Office",
        details: "123 Business Lane, Dhaka, BD",
        link: "https://maps.google.com"
    },
    {
        icon: <FaClock />,
        title: "Working Hours",
        details: "Mon - Fri: 9AM - 6PM",
        link: "#"
    }
];