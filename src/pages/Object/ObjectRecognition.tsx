import React, { useRef, useState } from 'react';
import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import ServiceDetails from '../../components/ServiceTemplate';
import Footer from '../../components/Footer';
import filler from '../../assets/filler.png';
import dot from '../../assets/Ellipse 4.png';
import { Video, X } from 'lucide-react';

const ObjectRecognition: React.FC = () => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Open camera and show video feed
  const handleOpenCamera = async () => {
    if (cameraOpen) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      streamRef.current = stream;
      setCameraOpen(true);
      // Optionally, start object recognition logic here
      // startObjectRecognition();
    } catch (err) {
      alert('تعذر فتح الكاميرا. يرجى السماح بالوصول إلى الكاميرا.');
    }
  };

  // Close camera and stop video stream
  const handleCloseCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraOpen(false);
    setRecognitionResult('');
  };

  // Cleanup on unmount or when closing camera
  React.useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Placeholder for object recognition logic
  // Example stub:
  // function startObjectRecognition() {
  //   // Use TensorFlow.js or send video frames to an API
  //   // setRecognitionResult('...');
  // }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <HeroSection
        backgroundImage={filler}
        breadcrumb={
          <span className="flex flex-row items-center gap-2 text-right text-base">
            <span className="text-blue-600">التعرف على الأشياء</span>
            <img src={dot} alt="dot" className="w-2 h-2" />
            <span>الخدمات</span>
          </span>
        }
      />
      <ServiceDetails
        serviceName="التعرف على الأشياء"
        serviceDescription="خدمة التعرف على الأشياء من خلال الكاميرا هي أداة مبتكرة تهدف إلى تسهيل حياة ذوي الهمم، حيث يمكن للمستخدم فتح الكاميرا عبر الموقع لتحديد الأشياء المحيطة به، سواء كان ذلك لتحديد العناصر اليومية مثل الطعام، الملابس، أو الأجهزة.توظف الخدمة الذكاء الاصطناعي لمساعدة الأفراد وجعل حياتهم اليومية أكثر سهولة وأمانة."
        serviceMerits={[
          'خدمة متقدمة: توفر وصولاً دقيقاً وسريعاً للأشياء المحيطة.',
          'سهولة الاستخدام: تتطلب فقط فتح الكاميرا وتوجيهها نحو الشيء المراد التعرف عليه.',
          'دعم متنوع: تعمل على العناصر اليومية ومجموعة متنوعة من الأشياء.'
        ]}
      />
      {/* Camera Box Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="border-2 border-blue-200 rounded-xl p-8 flex flex-col items-center gap-4 bg-white shadow-sm">
          {!cameraOpen && (
            <>
              <Video size={48} className="text-blue-500 mx-auto" />
              <p className="text-gray-600 text-center text-lg">قم بفتح الكاميرا وسيتم ترجمة الشيء الذي تريد التعرف عليه إلى نص يمكنك قراءته هنا......</p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded-lg flex items-center gap-2 mt-2"
                onClick={handleOpenCamera}
              >
                <Video size={20} />
                فتح الكاميرا
              </button>
            </>
          )}
          {cameraOpen && (
            <>
              <div className="w-full flex justify-end">
                <button
                  className="flex items-center gap-1 text-blue-600 hover:text-red-600 font-bold mb-2"
                  onClick={handleCloseCamera}
                  title="إغلاق الكاميرا"
                >
                  <X size={24} />
                  إغلاق الكاميرا
                </button>
              </div>
              <video
                ref={videoRef}
                className="rounded-lg border border-blue-300 w-full max-w-md mx-auto"
                autoPlay
                playsInline
                muted
                style={{ background: '#000', minHeight: 320 }}
              />
              {/* Placeholder for recognition result */}
              <div className="mt-4 w-full max-w-md mx-auto p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
                <span className="block text-blue-600 font-bold mb-2">هذا الشيء يسمى:</span>
                <span className="text-gray-700 text-lg">{recognitionResult || 'سيظهر النص هنا عند توفر نموذج التعرف على الأشياء.'}</span>
              </div>
              {/* Stub for object recognition integration */}
              {/*
                Here you would process video frames and run them through a model, e.g.:
                setInterval(() => {
                  // capture frame from videoRef.current
                  // run recognition
                  // setRecognitionResult(result)
                }, 1000);
              */}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ObjectRecognition;
