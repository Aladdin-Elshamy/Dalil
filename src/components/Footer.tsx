import React from "react";
import { Facebook, Twitter, Linkedin, Mail, User } from "lucide-react";
import logo from "../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[linear-gradient(84.42deg,_#AEDDE9_0%,_#C7E9F1_53.17%,_#ADD8E2_100%)] text-white p-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Latest Updates */}
          <div className="text-right">
            <div className="inline-block">
              <h4 className="text-lg font-semibold text-black mb-1">
                أخر التحديثات
              </h4>
              <div className="h-1 bg-blue-600 rounded w-full"></div>
            </div>
            <p className="text-sm mb-4 text-gray-500 mt-2">
              ابق على اتصال معنا للحصول على تحديثات منتظمة من خلال تقديم اسمك
              وعنوان بريدك الإلكتروني
            </p>

            {/* Latest Updates Content */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3 flex justify-between">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-700">
                    إطلاق خدمة الترجمة الجديدة
                  </p>
                  <p className="text-xs text-gray-500">
                    تم إضافة دعم لترجمة لغة الإشارة في الوقت الفعلي
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 flex justify-between">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-700">
                    تحديث واجهة المستخدم
                  </p>
                  <p className="text-xs text-gray-500">
                    تحسينات جديدة لسهولة الاستخدام والوصول
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 flex justify-between">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-700">إضافة خدمات جديدة</p>
                  <p className="text-xs text-gray-500">
                    خدمات التعرف على الكائنات والتنقل المحسن
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Information Links */}
          <div className="text-center">
            <div className="inline-block">
              <h4 className="text-lg font-semibold text-black mb-1">
                المعلومات
              </h4>
              <div className="h-1 bg-blue-600 rounded w-full"></div>
            </div>
            <ul className="mt-2">
              <li className="mb-2">
                <a href="#" className="text-sm hover:underline text-gray-500">
                  الرئيسية
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-sm hover:underline text-gray-500">
                  من نحن
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-sm hover:underline text-gray-500">
                  الخدمات
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-sm hover:underline text-gray-500">
                  المقالات
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-sm hover:underline text-gray-500">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Logo and Description */}
          <div className="items-center">
            <img
              src={logo}
              alt="DALIL Logo"
              className="h-16 lg:h-20 w-auto mb-4 mx-auto"
            />
            <p className="text-sm mb-4 text-gray-500 text-right">
              نسعى لتمكين ذوي الاحتياجات الخاصة من الوصول إلى الخدمات بسهولة
              وكرامة، من خلال تصميم حلول مبتكرة وشاملة تلبي احتياجاتهم وتعزز
              استقلاليتهم في الحياة اليومية.
            </p>

            {/* Contact Information */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-end gap-2">
                <Mail size={16} className="text-blue-600" />
                <span>info@dalil.com</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <User size={16} className="text-blue-600" />
                <span>فريق الدليل</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex border-t border-gray-600 mt-8 pt-6 text-right text-sm text-black">
          <div className="flex space-x-4 text-blue-600 text-right w-1/2">
            <a href="#" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
          <p className="text-right w-1/2">
            جميع الحقوق محفوظة 2025{" "}
            <span className="text-blue-700">Dalil Team</span> تم الإنشاء بواسطة{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
