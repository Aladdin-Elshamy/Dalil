declare var Camera: any;
import React, { useState, useEffect, useRef } from "react";
import { Video, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceDetails from "@/components/ServiceTemplate";
import Footer from "@/components/Footer";
import filler from "../../assets/filler.png";
import dot from "../../assets/Ellipse 4.png";
// Type definitions
interface Landmark {
  x: number;
  y: number;
  z?: number;
}

interface Results {
  image: HTMLCanvasElement;
  multiHandLandmarks: Landmark[][];
  multiHandedness: unknown[];
}

interface WsMessage {
  type: string;
  value?: string;
  landmarks?: number[];
  prediction?: string;
}

const DaleelSignLanguage: React.FC = () => {
  const [tracking, setTracking] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<string>("EN");
  const [latestPrediction, setLatestPrediction] = useState<string>("...");
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const [handsInitialized, setHandsInitialized] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Set default voice based on current mode
      const defaultVoice = availableVoices.find((voice) =>
        currentMode === "AR"
          ? voice.lang.includes("ar")
          : voice.lang.includes("en")
      );

      if (defaultVoice) {
        setSelectedVoice(defaultVoice);
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [currentMode]);

  // Play text to speech when prediction changes
  useEffect(() => {
    if (
      latestPrediction &&
      latestPrediction !== "..." &&
      latestPrediction !== "Waiting for hand..."
    ) {
      handleTextToSpeech(latestPrediction);
    }
  }, [latestPrediction]);

  // Initialize Mediapipe Hands
  useEffect(() => {
    if (!cameraOpen) return;

    const initializeHands = async () => {
      const hands = new (window as any).self.Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      const onResults = (results: Results) => {
        if (
          !results.multiHandLandmarks ||
          results.multiHandLandmarks.length === 0 ||
          !tracking
        ) {
          return;
        }

        const landmarks = results.multiHandLandmarks[0];

        // Prepare data for WebSocket
        let data_aux: number[] = [];
        const flippedLandmarks: Landmark[] = landmarks.map((p) => ({
          x: 1 - p.x,
          y: p.y,
        }));
        const minLandmarkX = Math.min(...flippedLandmarks.map((p) => p.x));
        const minLandmarkY = Math.min(...flippedLandmarks.map((p) => p.y));

        flippedLandmarks.forEach((p) => {
          data_aux.push(p.x - minLandmarkX);
          data_aux.push(p.y - minLandmarkY);
        });

        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const message: WsMessage = {
            type: "predict",
            landmarks: data_aux,
          };
          wsRef.current.send(JSON.stringify(message));
        }
      };

      hands.onResults(onResults);

      // Start camera
      if (videoRef.current) {
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current! });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }

      setHandsInitialized(true);
    };

    initializeHands();
  }, [cameraOpen, tracking]);

  // WebSocket connection
  useEffect(() => {
    if (!cameraOpen) return;

    const connectWebSocket = () => {
      const ws = new WebSocket("ws://localhost:8000/ws");

      ws.onopen = () => {
        console.log("WebSocket connected.");
        const message: WsMessage = { type: "mode", value: currentMode };
        ws.send(JSON.stringify(message));
      };

      ws.onmessage = async (event: MessageEvent) => {
        try {
          const message: WsMessage = JSON.parse(event.data);
          if (message.prediction) {
            setLatestPrediction(message.prediction);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected. Reconnecting in 2s...");
        setTimeout(connectWebSocket, 2000);
      };

      wsRef.current = ws;
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [cameraOpen, currentMode]);

  // Handle text to speech
  const handleTextToSpeech = (text: string) => {
    if (!text.trim() || !selectedVoice) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
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

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "s" || e.key === "S") {
        setTracking((prev) => !prev);
      } else if (["1", "2", "3", "4"].includes(e.key)) {
        const modes: Record<string, string> = {
          "1": "EN",
          "2": "AR",
          "3": "Words",
          "4": "Numbers",
        };
        const newMode = modes[e.key];
        setCurrentMode(newMode);

        // Update voice based on new mode
        const availableVoices = window.speechSynthesis.getVoices();
        const newVoice = availableVoices.find((voice) =>
          newMode === "AR" || newMode === "Words"
            ? voice.lang.includes("ar")
            : voice.lang.includes("en")
        );

        if (newVoice) {
          setSelectedVoice(newVoice);
        }

        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const message: WsMessage = { type: "mode", value: newMode };
          wsRef.current.send(JSON.stringify(message));
        }
      } else if (e.key === "q" || e.key === "Q") {
        setTracking(false);
        if (wsRef.current) wsRef.current.close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenCamera = () => {
    setCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
    setTracking(false);
    window.speechSynthesis.cancel();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <HeroSection
        backgroundImage={filler}
        breadcrumb={
          <span className="flex flex-row items-center gap-2 text-right text-base">
            <span className="text-blue-600">ترجمة لغة الاشارة</span>
            <img src={dot} alt="dot" className="w-2 h-2" />
            <span>الخدمات</span>
          </span>
        }
      />
      <ServiceDetails
        serviceName="ترجمة لغة الإشارة إلى نص مكتوب خلال فتح الكاميرا"
        serviceDescription="خدمة فتح الكاميرا وترجمة لغة الإشارة إلى نص مكتوب هي تقنية مبتكرة تستخدم الذكاء الاصطناعي لتحويل إشارات وحركات اليد إلى محتوى نصي، مما يسهل التواصل بين الأشخاص ذوي الإعاقة السمعية أو النطقية وبين المجتمع. توفر هذه الخدمة أداة فعالة للتواصل والتفاعل الفعّال والمباشر في المجتمع."
        serviceMerits={[
          "تحويل فوري: يتم تحويل حركات اليد أو لغة الإشارة إلى نص مكتوب بشكل فوري ودقيق، مما يوفر الوقت والجهد.",
          "سهولة الاستخدام: النظام سهل الاستخدام ويتطلب فقط فتح الكاميرا لبدء الترجمة.",
          "دعم متنوع: يمكن استخدام الخدمة للتواصل اليومي أو في حالات الطوارئ أو أثناء الاجتماعات.",
          "تعزز الدمج المجتمعي: تتيح للأشخاص ذوي الإعاقة السمعية أو النطقية التفاعل مع المجتمع والمشاركة في الحياة اليومية دون الحاجة إلى مترجمين إضافيين.",
        ]}
      />
      <div className="container mx-auto px-4 pb-8">
        <div className="border-2 border-blue-200 rounded-xl p-8 flex flex-col items-center gap-4 bg-white shadow-sm">
          {!cameraOpen ? (
            <>
              <Video size={48} className="text-blue-500 mx-auto" />
              <p className="text-gray-600 text-center text-lg">
                قم بفتح الكاميرا وسيتم ترجمة حركات يدك أو الشيء الذي تريد التعرف
                عليه إلى نص يمكنك قراءته هنا......
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded-lg flex items-center gap-2 mt-2"
                onClick={handleOpenCamera}
              >
                <Video size={20} />
                فتح الكاميرا
              </button>
            </>
          ) : (
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
              <div className="relative">
                {/* Hidden video element */}
                <video ref={videoRef} className="-scale-x-100" playsInline />
              </div>
              <div className="mt-4 w-full max-w-md mx-auto p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
                <span className="block text-blue-600 font-bold mb-2">
                  النص المترجم من لغة الإشارة:
                </span>
                <span className="text-gray-700 text-lg">
                  {latestPrediction}
                </span>
                {isSpeaking && (
                  <div className="mt-2 text-sm text-green-600">
                    جاري قراءة النص...
                  </div>
                )}
              </div>
              <div className="bg-gray-100 p-4 rounded-lg w-full max-w-md">
                <p className="text-gray-700 mb-2 text-right">
                  <strong>S: </strong>
                  {tracking ? "إيقاف التعرف" : "بدء التعرف"}
                </p>
                <p className="text-gray-700 mb-2 text-right">
                  <p>
                    <strong>1:</strong> English
                  </p>
                  <p>
                    العربية <strong>:2</strong>
                  </p>
                  <p>
                    كلمات <strong>:3</strong>
                  </p>
                  <p>
                    أرقام <strong>:4</strong>
                  </p>
                  <p>
                    <strong>{selectedVoice?.name || "غير محدد"}: </strong>
                    الوضع الحالي{" "}
                  </p>
                  <p>
                    <strong>{currentMode}: </strong>
                    الصوت{" "}
                  </p>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DaleelSignLanguage;
