import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import ServiceDetails from "../../components/ServiceTemplate";
import Footer from "../../components/Footer";
import signLangImg from "../../assets/Videoimg.png"; // Use your hero image
import resourceImg from "../../assets/signlang-resource.png"; // Use your resource illustration
import dot from "../../assets/Ellipse 4.png";
import { Book, FileText, SquarePlay } from "lucide-react";

export default function SignLanguage() {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        backgroundImage={signLangImg}
        breadcrumb={
          <span className="flex flex-row items-center gap-2 text-right text-base">
            <span className="text-blue-600">تعلم لغة الإشارة</span>
            <img src={dot} alt="dot" className="w-2 h-2" />
            <span>الخدمات</span>
          </span>
        }
      />

      {/* Service Details Section */}
      <div className="container mx-auto px-4 py-10">
        <ServiceDetails
          serviceName="تعلم لغة الإشارة"
          serviceDescription={
            "خدمة تعلم لغة الإشارة هي مبادرة تعليمية تهدف إلى تمكين الأفراد من تعلم لغة التواصل مع الصم والبكم، وهي أداة تواصل بصرية فعالة وشاملة. تعد لغة الإشارة الوسيلة الأساسية للتواصل بين الصم والمجتمع السامع، مما يعزز الدمج المجتمعي. تسهل التواصل مع الصم ودمجهم المجتمعي. توفر مقاطع فيديو تعليمية تفاعلية تغطي أساسيات اللغة وأبجدية اليدين. تطوير المهارات وتوسيع فرص العمل للأفراد المهتمين."
          }
          serviceMerits={[
            "تواصل فعال مع الصم والبكم",
            "دروس فيديو تفاعلية",
            "تطوير مهارات جديدة",
          ]}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 pb-4 flex justify-end">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg border font-bold ${
              activeTab === "videos"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-blue-600 border-blue-600"
            }`}
            onClick={() => setActiveTab("videos")}
          >
            فيديوهات تعليمية
          </button>
          <button
            className={`px-4 py-2 rounded-lg border font-bold ${
              activeTab === "books"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-blue-600 border-blue-600"
            }`}
            onClick={() => setActiveTab("books")}
          >
            كتب تعلم لغة الإشارة
          </button>
          <button
            className={`px-4 py-2 rounded-lg border font-bold ${
              activeTab === "skills"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-blue-600 border-blue-600"
            }`}
            onClick={() => setActiveTab("skills")}
          >
            اختبر مهاراتك
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 pb-10">
        {activeTab === "books" && (
          <div className="bg-gray-50 border border-blue-500 rounded-2xl p-6 shadow-lg shadow-gray-400 flex flex-col md:flex-row items-center gap-8">
            <img
              src={resourceImg}
              alt="مصادر تعلم لغة الإشارة"
              className="w-64 h-64 object-contain"
            />
            <div dir="rtl" className="flex-1">
              <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <Book className="text-xl font-bold text-blue-700" />
                <span>إليك أهم المصادر التي ستساعدك في التعلم</span>
              </h2>
              <ul className="space-y-4 text-right">
                <li>
                  <div>
                    <span>
                      1- قاموس لغة الإشارة للأطفال والمراهقين والبالغين الصم
                      يقدم هذا الكتاب شرحًا بسيطًا وصورًا للحركات اللازمة لأداء
                      الإشارات المرتبطة بمفاهيم معينة.
                    </span>
                  </div>
                  <a
                    href="#"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold mt-2 inline-block"
                  >
                    قراءة الكتاب
                  </a>
                </li>
                <li>
                  <div>
                    <span>
                      2- تعلم لغة الإشارة للصم من الصفر كتاب مصور يساعد
                      المبتدئين على فهم أساسيات لغة الإشارة مع أمثلة عملية تشمل
                      العديد من المجالات.
                    </span>
                  </div>
                  <a
                    href="#"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold mt-2 inline-block"
                  >
                    قراءة الكتاب
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "videos" && (
          <div className="bg-gray-50 border border-blue-500 rounded-2xl p-6 shadow-lg shadow-gray-400 flex flex-col md:flex-row items-center gap-8">
            <img
              src={resourceImg}
              alt="فيديوهات تعليمية"
              className="w-64 h-64 object-contain"
            />
            <div dir="rtl" className="flex-1">
              <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <SquarePlay className="text-xl font-bold text-blue-700" />
                <span>إليك أهم الفيديوهات التي ستساعدك في التعلم</span>
              </h2>
              <ul className="space-y-6 text-right">
                <li>
                  <div>
                    1- فيديو: مقدمة إلى لغة الإشارة العربية للمبتدئين، يشرح
                    الحروف والأرقام وبعض العبارات الأساسية.
                  </div>
                  <a
                    href="#"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold mt-3 inline-flex items-center gap-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="16" height="16" rx="2" />
                      <polygon points="8,7 15,12 8,17" fill="currentColor" />
                    </svg>
                    مشاهدة
                  </a>
                </li>
                <li>
                  <div>
                    2- فيديو: تعلم الإشارات اليومية الأكثر استخداماً في الحياة
                    العامة.
                  </div>
                  <a
                    href="#"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold mt-3 inline-flex items-center gap-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="16" height="16" rx="2" />
                      <polygon points="8,7 15,12 8,17" fill="currentColor" />
                    </svg>
                    مشاهدة
                  </a>
                </li>
                <li>
                  <div>
                    3- فيديو: شرح مفصل لقواعد لغة الإشارة وكيفية تكوين الجمل.
                  </div>
                  <a
                    href="#"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold mt-3 inline-flex items-center gap-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="16" height="16" rx="2" />
                      <polygon points="8,7 15,12 8,17" fill="currentColor" />
                    </svg>
                    مشاهدة
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "skills" && (
          <div className="bg-gray-50 border border-blue-500 rounded-2xl p-6 shadow-lg shadow-gray-400 flex flex-col md:flex-row items-center gap-8">
            <img
              src={resourceImg}
              alt="اختبر مهاراتك"
              className="w-64 h-64 object-contain"
            />
            <div className="flex-1" dir="rtl">
              <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <FileText className="text-xl font-bold text-blue-700" />
                <span>مصادر ستساعدك في اختبار مهاراتك</span>
              </h2>
              <ul className="space-y-6 text-right">
                <li>
                  <div>
                    1- امتحان تحديد المستوى في لغة الإشارة وهو مكوّن من 150
                    سؤالًا تغطي المفردات الأساسية في لغة واحدة. يوفر هذا
                    الامتحان فرصة لتقييم مستواك قبل البدء في دورات.
                  </div>
                  <a
                    href="#"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold mt-3 inline-flex items-center gap-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="16" height="16" rx="2" />
                      <path d="M8 12h8M8 16h8M8 8h8" />
                    </svg>
                    أكثر مهاراتك
                  </a>
                </li>
                <li>
                  <div>
                    2- اختبارات شاملة تشمل الجوانب النظرية والعملية. هذا
                    الاختبار مناسب للمترجمين الذين يسعون إلى تقييم مهاراتهم بشكل
                    دوري، أو لمن يرغب في الحفاظ على المستوى المستمر للمهارات.
                  </div>
                  <a
                    href="#"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold mt-3 inline-flex items-center gap-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="16" height="16" rx="2" />
                      <path d="M8 12h8M8 16h8M8 8h8" />
                    </svg>
                    أكثر مهاراتك
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
