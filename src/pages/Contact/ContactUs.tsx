import React from 'react';
import Navbar from '../../components/Navbar'; // Adjust path as needed
import HeroSection from '../../components/HeroSection'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { Mail, Phone } from 'lucide-react'; // Icons for contact info
import filler from '../../assets/filler.png';
import dot from '../../assets/Ellipse 4.png';
const ContactUs: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement contact form submission logic
        console.log("Contact form submitted");
    };

    return (
        <div>
            <Navbar /> {/* Reusable Navbar */}

            {/* Reusable Hero Section with Contact Us background and breadcrumb */}
            <HeroSection
                backgroundImage={filler} // Replace with your image path
                breadcrumb={
                  <span className="flex flex-row items-center gap-2 text-right text-base">
                    <span className="text-blue-600">تواصل معنا</span>
                    <img src={dot} alt="dot" className="w-2 h-2" />
                    <span>الرئيسية</span>
                  </span>
                }
            />

            {/* Main Contact Us Content */}
            <div className="container mx-auto px-4 py-12 p-8 text-right">
                <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-8 lg:space-y-0 rtl:space-x-reverse"> {/* Responsive layout for info and form */}
                    {/* Information Section (Left side in the image) */}
                    <div className="lg:w-1/3 tex">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md shadow-gray-500 mb-8 text-right">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">معلومة</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                "نسعد لتواصلكم معنا للإجابة عن استفساراتكم وتلبية احتياجاتكم. يمكنكم طرح الأسئلة أو التواصل مباشرة مع الموظفين المتاحين."
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md shadow-gray-500"> 
                            {/* Phone Contact Item */}
                            <div className="flex items-center justify-end mb-6"> 
                                <div className="text-right">
                                {/* Heading */}
                                <h4 className="text-lg font-semibold text-gray-800">الهاتف</h4>
                                {/* Detail */}
                                <p className="text-gray-700 text-sm">+20 1234567890</p> 
                                </div>
                                <Phone size={20} className="text-blue-600 mr-3" />
                            </div>

                            {/* Email Contact Item */}
                            <div className="flex items-center justify-end">
                                <div className="text-right">
                                    {/* Heading */}
                                    <h4 className="text-lg font-semibold text-gray-800">البريد الإلكتروني</h4>
                                    {/* Detail */}
                                    <span className="text-gray-700 text-sm">info@dalil.com</span>
                                </div> 
                                <Mail size={20} className="text-blue-600 mr-3 m-1" />
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section (Right side in the image) */}
                    <div className="lg:w-2/3">
                        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-lg shadow-gray-500">
                            {/* Name and Email (Side by Side on larger screens) */}
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Input fields can reuse InputWithIcon or be standard inputs */}
                                <div className="flex-1"> {/* Use flex-1 to make them share space */}
                                     <input
                                        type="text"
                                        name="name"
                                        placeholder="ادخل الإسم"
                                        className="w-full p-5 border border-gray-500 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                                        required
                                    />
                                </div>
                                 <div className="flex-1"> {/* Use flex-1 to make them share space */}
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="ادخل البريد الإلكتروني"
                                        className="w-full p-5 border border-gray-500 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <textarea
                                    name="message"
                                    rows={6}
                                    placeholder="أكتب رسالتك هنا..."
                                    className="w-full p-3 border border-gray-500 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                                    required
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="text-right"> {/* Align button to the left as in the image */}
                                {/* You can reuse your SubmitButton component if its styling matches */}
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
                                >
                                    إرسال الرسالة
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer /> {/* Reusable Footer */}
        </div>
    );
};

export default ContactUs;