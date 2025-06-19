import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SubmitButton from "../../components/SubmitButton";
import filler from "../../assets/filler.png";
import video from "../../assets/Videoimg.png";
import EasyLife from "../../assets/EasyLife.png";
import LearnSign from "../../assets/LearnSign.png";
import translateSign from "../../assets/translateSign.png";
import textToSpeech from "../../assets/textToSpeech.png";
import speechToText from "../../assets/speechToText.png";
import Location from "../../assets/Location.png";
import Alert from "../../assets/Alerts.png";
import Yassin from "../../assets/Yacine Zoghby.png";
import Sherif from "../../assets/sherif Othman.png";
import Fatma from "../../assets/Fatma Amr.png";
import Mohamed from "../../assets/Mohammed Karam.png";
import Rahma from "../../assets/Rahma Khaled.png";
import home from "../../assets/mainPage.png";
import vid from "../../assets/prev video.mp4";
import { SquareCheck } from "lucide-react";
const champions = [
  {
    name: "شريف عثمان",
    image: Sherif,
    description:
      "حاصل على ذهبية بطولة إفريقيا البارالمبية والتي أقيمت بالجزائر شهر أغسطس الماضي، لوزن 59 كجم، برفع ثقل 206 كجم.",
  },
  {
    name: "فاطمة عمر",
    image: Fatma,
    description:
      "أفضل ربّاعة في سيدات اللجنة البارالمبية الدولية عام 2012، وهي صاحبة الرقم العالمي لوزن 56 كجم، إذ رفعت وزن 142 كجم.",
  },
  {
    name: "محمد كرم",
    image: Mohamed,
    description:
      "لاعب كرة قدم في منتخب مصر لذوي الاحتياجات الخاصة،شارك في العديد من البطولات القارية والعالمية وحقق إنجازات كثيرة.",
  },
  {
    name: "رحمة خالد",
    image: Rahma,
    description:
      "سباحة بارالمبية مصرية وحصدت على بطولات عالمية وإقليمية في السباحة. أصبحت أول مذيعة من ذوي الهمم في الوطن العربي، مما جعلها رمزًا للإلهام في الإعلام.",
  },
  {
    name: "ياسين الزغبي",
    image: Yassin,
    description:
      "حاصل 18 عامًا فقد ساقه البشري في الثانية عشر من عمره إثر اصطدم قطار أثناء محاولته عبور السكة، وشارك في تحدي ركوب الدراجات بعد أن تمكن من مواءمة حواجز إرادته ليكون أول مرة في رحلة كوب دراجات انطلقت من القاهرة إلى العين السخنة عام 2015 وحققت صدى واسع. هو الحاضر في مسابقات رياضة كوب الدراجات، ومنذ ذلك الوقت خاض السباقات المختلفة في محافظات مصر المختلفة والبطولة.",
  },
];

const heroSlides = [
  {
    image: home, // your first image
    headline: (
      <>
        معاً نبني تجربة شاملة تلبي <br />
        <span className="text-blue-500">احتياجات الجميع.</span>
      </>
    ),
    breadcrumb: "دليل",
  },
  {
    image: filler, // your second image
    headline: (
      <>
        معاً نحو مستقبل أفضل <br />
        <span className="text-blue-500">للجميع.</span>
      </>
    ),
    breadcrumb: "دليل",
  },
  {
    image: video, // your third image
    headline: (
      <>
        خدمات متكاملة <br />
        <span className="text-blue-500">لذوي الهمم.</span>
      </>
    ),
    breadcrumb: "دليل",
  },
];

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedChampion, setSelectedChampion] = useState(
    champions[champions.length - 1]
  );

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const faqData = [
    {
      question: "كيف يمكنني الاستفادة من خدمات الموقع؟",
      answer:
        "يمكنك الاستفادة من خدمات الموقع من خلال التسجيل وإنشاء حساب شخصي، ثم تصفح الخدمات المتاحة واختيار ما يناسب احتياجاتك. يوفر الموقع مجموعة متنوعة من الخدمات مثل ترجمة لغة الإشارة، تحويل النص إلى صوت، وتحديد المواقع المناسبة.",
    },
    {
      question: "هل يقدم الموقع دعمًا شخصيًا للمستخدمين؟",
      answer:
        "نعم، يقدم الموقع دعمًا شخصيًا للمستخدمين من خلال فريق متخصص جاهز لمساعدتك في أي استفسار أو مشكلة تواجهها أثناء استخدام الموقع.",
    },
    {
      question: "هل هناك تطبيق مخصص للموقع؟",
      answer:
        "نعم، يمكنك تحميل تطبيق دليل من متاجر التطبيقات للاستفادة من جميع الخدمات بسهولة على هاتفك المحمول.",
    },
    {
      question: "ما هو الهدف الرئيسي للموقع؟",
      answer:
        "الهدف الرئيسي للموقع هو تسهيل حياة ذوي الهمم من خلال تقديم خدمات متكاملة تساعدهم في حياتهم اليومية وتواصلهم مع المجتمع.",
    },
    {
      question: "ما نوع الخدمات التي يقدمها الموقع؟",
      answer:
        "يقدم الموقع مجموعة متنوعة من الخدمات تشمل ترجمة لغة الإشارة، تحويل النص إلى صوت، تحديد المواقع المناسبة، التعرف على الأشياء، والعديد من الخدمات الأخرى.",
    },
    {
      question: "هل الموقع مناسب لجميع أنواع الإعاقات؟",
      answer:
        "نعم، تم تصميم الموقع ليكون مناسبًا لجميع أنواع الإعاقات، مع مراعاة احتياجات كل فئة وتوفير وسائل وصول مناسبة.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="-mt-4">
      <Navbar />
      {/* Custom Hero Section with Slider */}
      <div
        className="relative w-full h-[420px] md:h-[480px] overflow-hidden"
        style={{
          backgroundImage: `url(${heroSlides[currentSlide].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="container mx-auto px-4 h-full flex">
          {/* Stepper/Slider Navigation (left) - now using flex instead of absolute */}
          <div className="flex flex-col justify-center items-start z-10 mr-4">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`focus:outline-none ${
                  currentSlide === idx
                    ? "w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold"
                    : "text-white text-xl font-bold"
                }`}
                style={{ marginBottom: idx < 2 ? "1rem" : 0 }}
                aria-label={`انتقل إلى الشريحة ${idx + 1}`}
              >
                {`0${idx + 1}`}
              </button>
            ))}
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col justify-start items-end h-full relative pt-10">
            {/* Headline and Breadcrumb (upper right) - now using flex instead of absolute */}
            <div className="z-10 flex flex-col items-end max-w-xl">
              <span className="text-cyan-400 font-bold text-lg mb-2">
                {heroSlides[currentSlide].breadcrumb}
              </span>
              <h1 className="text-white text-3xl md:text-5xl font-bold text-right leading-snug mb-2">
                {heroSlides[currentSlide].headline}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Video and About Us Section (replaces previous video/features section) */}
      <div className="px-4 container py-16 flex flex-col md:flex-row gap-8 items-center justify-between bg-white">
        {/* Video */}
        <div className="justify-center">
          <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-lg">
            <video
              src={vid}
              className="w-full h-96 object-cover rounded-2xl"
              controls
            />
            <button
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all duration-300"
              onClick={(e) => {
                const video = e.currentTarget
                  .previousElementSibling as HTMLVideoElement;
                if (video.paused) {
                  video.play();
                  e.currentTarget.style.display = "none";
                }
              }}
            >
              <span className="bg-blue-600 bg-opacity-90 rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors duration-300">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="text-white"
                >
                  <polygon points="9,7 22,12 9,17" fill="currentColor" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        {/* About Us Content */}
        <div className="md:w-1/2 text-right flex flex-col gap-4" dir="rtl">
          <div className="flex items-center gap-2">
            <span className="bg-sky-100 text-sky-700 px-4 py-1 rounded-lg text-base font-bold">
              من نحن
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-2">رفيقك الشخصي في كل مكان</h2>
          {/* 1. رسالتنا حول المستخدمين */}
          <div className="mb-2">
            <span className="text-blue-500 font-bold text-3xl ml-2">1-</span>
            <span className="text-blue-500 font-bold text-3xl">
              رسالتنا حول المستخدمين
            </span>
            <p className="text-gray-500 mt-2 text-base" dir="rtl">
              هدفنا أن نكون الأفضل في مساعدة الأشخاص ذوي الهمم من خلال تقديم
              خدمات فردية وشاملة تعتمد على أحدث التقنيات الذكية. نسعى لبناء
              علاقات طويلة الأمد معكم قائمة على الثقة والاحترام المتبادل بهدف
              تحسين جودة حياتكم وتحقيق رضاكم الكامل.
            </p>
          </div>
          {/* 2. الرؤية */}
          <div className="mb-2">
            <span className="text-blue-500 font-bold text-3xl ml-2">2-</span>
            <span className="text-blue-500 font-bold text-3xl">الرؤية</span>
            <p className="text-gray-500 mt-2 text-base" dir="rtl">
              نسعى لتمكين ذوي الاحتياجات الخاصة من الوصول إلى الخدمات بسهولة
              وكرامة، من خلال تصميم حلول مبتكرة وشاملة تلبي احتياجاتهم وتعزز
              استقلاليتهم في الحياة اليومية، وتدعم مشاركتهم في المجتمع، ونلتزم
              بتوفير بيئة رقمية آمنة تدعم الشمولية والاندماج، حيث يحصل كل فرد
              على الخدمات الكاملة دون عوائق، وبأعلى درجات الجودة.
            </p>
          </div>
          {/* 3. الأهداف */}
          <div className="mb-2">
            <span className="text-blue-500 font-bold text-3xl ml-2">3-</span>
            <span className="text-blue-500 font-bold text-3xl">الأهداف</span>
            <div
              className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 text-gray-500 text-right"
              dir="rtl"
            >
              {/* Right column */}
              <div className="flex flex-row-reverse items-center justify-end gap-2">
                <span>تعزيز الوصول إلى الخدمات.</span>
                <SquareCheck size={22} className="text-blue-600" />
              </div>
              {/* Left column */}
              <div className="flex flex-row-reverse items-center gap-2 justify-end">
                <span>زيادة الوعي.</span>
                <SquareCheck size={22} className="text-blue-600" />
              </div>
              {/* Right column */}
              <div className="flex flex-row-reverse items-center gap-2 justify-end">
                <span>تعزيز الوصول إلى الخدمات.</span>
                <SquareCheck size={22} className="text-blue-600" />
              </div>
              {/* Left column */}
              <div className="flex flex-row-reverse items-center gap-2 justify-end">
                <span>تحفيز الابتكار.</span>
                <SquareCheck size={22} className="text-blue-600" />
              </div>
              {/* Right column */}
              <div className="flex flex-row-reverse items-center gap-2 justify-end">
                <span>دعم الدمج المجتمعي.</span>
                <SquareCheck size={22} className="text-blue-600" />
              </div>
              {/* Left column */}
              <div className="flex flex-row-reverse items-center gap-2 justify-end">
                <span>التعاون مع الشركاء.</span>
                <SquareCheck size={22} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-8">
        {/* FAQ Title and Subtitle */}
        <div className="text-right mb-8">
          <span className="bg-sky-100 text-sky-600 px-4 py-1 rounded-lg text-base font-bold mb-2 inline-block">
            الأسئلة
          </span>
          <h4 className="text-3xl font-bold mb-2">
            هل لديك أسئلة حول ما يقدمه موقع دليل؟
          </h4>
          <p className="text-gray-500 text-base mb-4">
            ابحث عن إجابات للاستفسارات الأكثر شيوعًا هنا. بدءًا من التسجيل وحتى
            إتمام الخدمة والمزيد، نحن نوفر لك كل ما تحتاجه!
          </p>
        </div>
        {/* FAQ Questions */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              {faqData.slice(0, 3).map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md shadow-gray-500 overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-4 flex items-center gap-4 justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-right font-semibold">
                      {faq.question}
                    </span>
                    <span
                      className={`bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold transition-transform ${
                        openAccordion === index ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {openAccordion === index && (
                    <div className="p-4 border-t border-gray-200 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              {faqData.slice(3).map((faq, index) => (
                <div
                  key={index + 3}
                  className="bg-white rounded-xl shadow-md shadow-gray-500 overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index + 3)}
                    className="w-full p-4 flex items-center gap-4 justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-right font-semibold">
                      {faq.question}
                    </span>
                    <span
                      className={`bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold transition-transform ${
                        openAccordion === index + 3 ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {openAccordion === index + 3 && (
                    <div className="p-4 border-t border-gray-200 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-right mb-8">
          <span className="bg-sky-100 text-sky-600 px-4 py-1 rounded-lg text-base font-bold mb-2 inline-block">
            الخدمات
          </span>
          <h3 className="text-3xl font-bold mb-2">
            الخدمات التي يقدمها الموقع
          </h3>
          <p className="text-gray-500 text-base mb-4">
            يوفر الموقع خدمات متكاملة تشمل ترجمة الإشارات الصوتية إلى المستندات
            الخاصة، ترجمة لغة الإشارة، تحويل النصوص إلى صوت، دعم استفسارات ذوي
            الإعاقة وتسهيل وصولهم للعلوم وصولهم.
          </p>
        </div>
        <div
          dir="rtl"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between items-center text-center">
            <img src={Location} alt="service icon" className="w-30 h-30 mb-4" />
            <h4 className="font-bold text-lg mb-2">تحديد الموقع</h4>
            <p className="text-gray-600 mb-4">
              تتيح الخدمة لمستخدمي الموقع ذوي الإعاقة من تحديد موقعهم الجغرافي
              بسهولة وتوفير معلومات حول الأماكن المناسبة لاحتياجاتهم، مثل
              المرافق العامة والمستشفيات والمدارس.
            </p>
            <SubmitButton label="عرض الخدمة" link="/Location" />
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between items-center text-center">
            <img
              src={translateSign}
              alt="service icon"
              className="w-30 h-30 mb-4"
            />
            <h4 className="font-bold text-lg mb-2">التعرف على الأشياء</h4>
            <p className="text-gray-600 mb-4">
              خدمة التعرف على الأشياء عن طريق الصور، حيث يمكن للمستخدم رفع صورة
              والحصول على وصف صوتي أو نصي لمحتوى الصورة، مما يسهل عليهم التفاعل
              مع البيئة المحيطة.
            </p>
            <SubmitButton label="عرض الخدمة" link="/ObjectRecognition" />
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between items-center text-center">
            <img
              src={translateSign}
              alt="service icon"
              className="w-30 h-30 mb-4"
            />
            <h4 className="font-bold text-lg mb-2">ترجمة لغة الإشارة</h4>
            <p className="text-gray-600 mb-4">
              تتيح الخدمة لمستخدمي الموقع من ذوي الإعاقة السمعية ترجمة لغة
              الإشارة إلى نصوص مكتوبة أو صوتية، مما يسهل التواصل مع الآخرين في
              مختلف المواقف.
            </p>
            <SubmitButton label="عرض الخدمة" link="/TranslateSign" />
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between items-center text-center">
            <img src={Alert} alt="service icon" className="w-30 h-30 mb-4" />
            <h4 className="font-bold text-lg mb-2">التنبيهات</h4>
            <p className="text-gray-600 mb-4">
              خدمة التنبيهات الصوتية أو المرئية، مخصصة لمساعدة المستخدمين في
              تلقي الإشعارات الهامة أو التنبيهات الخاصة بالموقع أو الخدمات.
            </p>
            <SubmitButton label="عرض الخدمة" link="/Alerts" />
          </div>
          {/* Card 5 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between items-center text-center">
            <img
              src={speechToText}
              alt="service icon"
              className="w-30 h-30 mb-4"
            />
            <h4 className="font-bold text-lg mb-2">تحويل الصوت إلى نص</h4>
            <p className="text-gray-600 mb-4">
              خدمة تحويل الكلام المنطوق إلى نص مكتوب، مما يساعد المستخدمين ذوي
              الإعاقة السمعية أو النطقية على التواصل بشكل أفضل.
            </p>
            <SubmitButton label="عرض الخدمة" link="/STT" />
          </div>
          {/* Card 6 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between items-center text-center">
            <img
              src={textToSpeech}
              alt="service icon"
              className="w-30 h-30 mb-4"
            />
            <h4 className="font-bold text-lg mb-2">تحويل الصوت إلى نص</h4>
            <p className="text-gray-600 mb-4">
              خدمة تحويل الكلام المنطوق إلى نص مكتوب، مما يساعد المستخدمين ذوي
              الإعاقة السمعية أو النطقية على التواصل بشكل أفضل.
            </p>
            <SubmitButton label="عرض الخدمة" link="/TTS" />
          </div>
          {/* Card 7 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between items-center text-center">
            <img
              src={LearnSign}
              alt="service icon"
              className="w-30 h-30 mb-4"
            />
            <h4 className="font-bold text-lg mb-2">تعلم لغة الإشارة</h4>
            <p className="text-gray-600 mb-4">
              تهدف إلى تمكين الأفراد من تعلم لغة الإشارة للتواصل مع الأشخاص ذوي
              الإعاقة السمعية بطريقة فعّالة وشاملة. تُعد لغة الإشارة وسيلة
              أساسية لتعزيز التفاهم والشمولية في المجتمع، مما يجعلها أداة تواصل
              مهمة في العديد من المجالات.
            </p>
            <SubmitButton label="عرض الخدمة" link="/SignLanguage" />
          </div>
        </div>
      </div>

      {/* Product Highlight Section - المنتجات */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center gap-8 rounded-2xl justify-between">
          {/* Illustration */}
          {/* Replace with your actual illustration */}
          <img src={EasyLife} alt="منتجات" className="w-full max-w-md " />
          {/* Content */}
          <div className="md:w-1/2 text-right flex flex-col justify-center">
            <span className="bg-sky-100 text-sky-600 px-4 py-1 rounded-lg text-base font-bold mb-2 self-end">
              المنتجات
            </span>
            <h2 className="text-3xl font-bold mb-2">
              كل ما تحتاجه لجعل حياتك أسهل
              <br />
              في مكان واحد!
            </h2>
            <p className="text-gray-500 text-base mb-4">
              توفر مستلزمات مخصصة تتيح شراء المنتجات بسهولة وأمان لتحسين جودة
              الحياة اليومية.
            </p>
            <div className="mb-4">
              <h4 className="text-blue-600 font-bold text-xl mb-2">
                مزايا الخدمة
              </h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2" dir="rtl">
                <div className="flex flex-row-reverse items-center gap-2 justify-end">
                  <span>تشكيلة واسعة.</span>
                  <SquareCheck size={22} className="text-blue-600" />
                </div>
                <div className="flex flex-row-reverse items-center gap-2 justify-end">
                  <span>معلومات تفصيلية.</span>
                  <SquareCheck size={22} className="text-blue-600" />
                </div>
                <div className="flex flex-row-reverse items-center gap-2 justify-end">
                  <span>سهولة الوصول.</span>
                  <SquareCheck size={22} className="text-blue-600" />
                </div>
                <div className="flex flex-row-reverse items-center gap-2 justify-end">
                  <span>خدمة توصيل.</span>
                  <SquareCheck size={22} className="text-blue-600" />
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <SubmitButton
                label="عرض المنتجات"
                link="Shopping"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Champions/Athletes Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Other Champions */}
          <div
            dir="rtl"
            className="md:w-1/2 bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center"
          >
            <h3 className="text-2xl font-bold text-center mb-6">أبطال آخرين</h3>
            <div className="flex flex-col gap-6 w-full">
              {champions.map((champion, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-xl"
                  onClick={() => setSelectedChampion(champion)}
                >
                  <img
                    src={champion.image}
                    alt={champion.name}
                    className="w-44 h-44 object-cover rounded-xl border"
                  />
                  <div>
                    <div className="font-bold text-xl mb-1">
                      {champion.name}
                    </div>
                    <div className="text-gray-600 text-base">
                      {champion.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: Main Athlete */}
          <div className="md:w-1/2 bg-white p-4 flex flex-col items-center">
            <span className="bg-sky-100 text-sky-600 px-4 py-1 rounded-lg text-base font-bold mb-2 self-end">
              المقالات
            </span>
            <img
              src={selectedChampion.image}
              alt={selectedChampion.name}
              className="w-full h-100 object-cover rounded-2xl mb-4"
            />
            <div className="font-bold text-2xl mb-2 text-center">
              {selectedChampion.name}
            </div>
            <div className="text-gray-700 text-right text-base leading-relaxed">
              {selectedChampion.description}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
