import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import ServiceDetails from "../../components/ServiceTemplate";
import Footer from "../../components/Footer";
import filler from "../../assets/filler.png";
import dot from "../../assets/Ellipse 4.png";
import { Video, X, Volume2 } from "lucide-react";

const ObjectRecognition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const resultImgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [useFrontCamera, setUseFrontCamera] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [resultSrc, setResultSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = (text: string) => {
    if (!text.trim()) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Force English language
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error("SpeechSynthesis error:", event);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const startCamera = async () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    const constraints = {
      video: { facingMode: useFrontCamera ? "user" : "environment" },
    };
    try {
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) videoRef.current.srcObject = newStream;
      setStream(newStream);
    } catch (err) {
      alert("تعذر فتح الكاميرا. يرجى السماح بالوصول إلى الكاميرا.");
    }
  };

  const connectWS = () => {
    // Close existing connection if any
    if (ws) {
      ws.close();
    }

    const socket = new WebSocket("ws://localhost:8000/ws");

    socket.onopen = () => {
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.image) {
        setLoading(false);
        setResultSrc("data:image/jpeg;base64," + data.image);
        setDetecting(true);
        if (data.result) {
          setRecognitionResult(data.result);
        }
      }
    };

    socket.onclose = () => {
      console.log("WebSocket closed. Reconnecting...");
      setTimeout(connectWS, 2000);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  const captureAndSend = () => {
    if (!videoRef.current || !canvasRef.current || !ws) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    const imageData = canvas.toDataURL("image/jpeg").split(",")[1];
    ws.send(JSON.stringify({ type: "image", image: imageData }));
    setLoading(true);
    setDetecting(true);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !ws) return;

    setLoading(true);
    setDetecting(true);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      ws.send(JSON.stringify({ type: "image", image: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleCloseCamera = () => {
    setDetecting(false);
    setResultSrc("");
    setLoading(false);
    stream?.getTracks().forEach((track) => track.stop());
    setRecognitionResult("");
    window.speechSynthesis.cancel();
  };
  useEffect(() => {
    // Connect WebSocket when component mounts
    connectWS();

    return () => {
      // Cleanup on unmount
      stream?.getTracks().forEach((track) => track.stop());
      ws?.close();
      window.speechSynthesis.cancel();
    };
  }, []);
  useEffect(() => {
    if (detecting) {
      startCamera();
      connectWS();
    }
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
      ws?.close();
      window.speechSynthesis.cancel();
    };
  }, [useFrontCamera]);

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
          "خدمة متقدمة: توفر وصولاً دقيقاً وسريعاً للأشياء المحيطة.",
          "سهولة الاستخدام: تتطلب فقط فتح الكاميرا وتوجيهها نحو الشيء المراد التعرف عليه.",
          "دعم متنوع: تعمل على العناصر اليومية ومجموعة متنوعة من الأشياء.",
        ]}
      />
      {/* Camera Box Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="border-2 border-blue-200 rounded-xl p-8 flex flex-col items-center gap-4 bg-white shadow-sm">
          {!detecting && (
            <>
              <Video size={48} className="text-blue-500 mx-auto" />
              <p className="text-gray-600 text-center text-lg">
                قم بفتح الكاميرا أو رفع صورة للتعرف على الأشياء...
              </p>

              <div className="flex gap-4 flex-wrap justify-center">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded-lg flex items-center gap-2"
                  onClick={() => {
                    setDetecting(true);
                    startCamera();
                    connectWS();
                  }}
                >
                  <Video size={20} />
                  فتح الكاميرا
                </button>

                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-2 rounded-lg flex items-center gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  رفع صورة
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleUpload}
                  className="hidden"
                />
              </div>
            </>
          )}
          {(detecting || resultSrc) && (
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

              {!loading && !resultSrc && (
                <video
                  ref={videoRef}
                  className="rounded-lg border border-blue-300 w-full max-w-md mx-auto scale-x-[-1]"
                  autoPlay
                  playsInline
                  muted
                  style={{ background: "#000", minHeight: 320 }}
                />
              )}
              {loading && (
                <div className="flex justify-center items-center min-h-[200px]">
                  <div className="w-24 h-24 border-8 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {resultSrc && !loading && (
                <img
                  ref={resultImgRef}
                  src={resultSrc}
                  alt="Detection Result"
                  className="rounded-2xl max-w-[640px] max-h-[480px]"
                  style={{ transform: "scaleX(-1)" }}
                />
              )}

              <div className="mt-4 w-full max-w-md mx-auto p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
                <div className="flex justify-between items-center mb-2 ">
                  {recognitionResult && !loading && (
                    <button
                      onClick={() => speakText(recognitionResult)}
                      className="p-2 rounded-full hover:bg-gray-200"
                      disabled={isSpeaking}
                    >
                      <Volume2 size={20} className="text-blue-600" />
                    </button>
                  )}
                  <span className="block text-blue-600 font-bold">
                    :هذا الشيء يسمى
                  </span>
                </div>
                <span className="text-gray-700 text-lg">
                  {recognitionResult ||
                    (resultSrc
                      ? "تم الكشف عن الكائن - يمكنك تحميل النتيجة."
                      : "سيظهر النص هنا عند توفر نموذج التعرف على الأشياء.")}
                </span>
                {isSpeaking && (
                  <div className="mt-2 text-sm text-green-600">
                    جاري قراءة النص...
                  </div>
                )}
              </div>

              <canvas ref={canvasRef} className="hidden" />

              <div className="flex gap-2 flex-wrap justify-center">
                {!resultSrc && (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-2xl"
                    onClick={captureAndSend}
                  >
                    فحص
                  </button>
                )}
                {resultSrc && !loading && (
                  <>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-2xl"
                      onClick={() => {
                        setResultSrc("");
                        setRecognitionResult("");
                        setLoading(false);
                        startCamera();
                      }}
                    >
                      استكمال
                    </button>
                  </>
                )}

                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-2xl"
                  onClick={() => setUseFrontCamera((prev) => !prev)}
                >
                  تغيير الكاميرا
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-2xl"
                  onClick={() => fileInputRef.current?.click()}
                >
                  رفع صورة
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleUpload}
                  className="hidden"
                />
                {resultSrc && !loading && (
                  <button
                    className="bg-yellow-600 text-white px-4 py-2 rounded-2xl"
                    onClick={() => {
                      const img = new Image();
                      img.src = resultSrc;
                      img.onload = () => {
                        const downloadCanvas = document.createElement("canvas");
                        downloadCanvas.width = img.width;
                        downloadCanvas.height = img.height;
                        const ctx = downloadCanvas.getContext("2d");
                        if (!ctx) return;

                        ctx.translate(downloadCanvas.width, 0);
                        ctx.scale(-1, 1);
                        ctx.drawImage(
                          img,
                          0,
                          0,
                          downloadCanvas.width,
                          downloadCanvas.height
                        );

                        const link = document.createElement("a");
                        link.href = downloadCanvas.toDataURL("image/jpeg");
                        link.download = "detection_result.jpg";
                        link.click();
                      };
                    }}
                  >
                    تحميل الصورة
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ObjectRecognition;
