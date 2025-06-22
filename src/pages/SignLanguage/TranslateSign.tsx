// DaleelSignLanguage.tsx

import React, { useState, useEffect, useRef } from "react";
import { Video, X, Volume2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceDetails from "@/components/ServiceTemplate";
import Footer from "@/components/Footer";
import filler from "../../assets/filler.png";
import dot from "../../assets/Ellipse 4.png";

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
  const [tracking, setTracking] = useState(false);
  const [currentMode, setCurrentMode] = useState("EN");
  const [latestPrediction, setLatestPrediction] = useState("...");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [handsInitialized, setHandsInitialized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      const defaultVoice = availableVoices.find((voice) =>
        currentMode === "AR" ||
        currentMode === "Words" ||
        currentMode === "Numbers"
          ? voice.lang.toLowerCase().includes("ar")
          : voice.lang.toLowerCase().includes("en")
      );
      setSelectedVoice(defaultVoice || availableVoices[0]);
      console.log(
        "🔊 Loaded voice:",
        (defaultVoice || availableVoices[0])?.name
      );
    };

    if (speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      setTimeout(loadVoices, 100);
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [currentMode]);

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
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (
          !results.multiHandLandmarks ||
          results.multiHandLandmarks.length === 0 ||
          !tracking
        ) {
          return;
        }

        const landmarks = results.multiHandLandmarks[0];
        const flippedLandmarks = landmarks.map((p) => ({
          x: 1 - p.x,
          y: p.y,
        }));

        const width = canvas.width;
        const height = canvas.height;
        const points = flippedLandmarks.map((p) => ({
          x: p.x * width,
          y: p.y * height,
        }));

        const xs = points.map((p) => p.x);
        const ys = points.map((p) => p.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        ctx.strokeStyle = "#FF66FF";
        ctx.lineWidth = 4;
        const topMargin = 20;
        const leftMargin = 15;
        const rightMargin = 25;
        const bottomMargin = 10;

        ctx.strokeRect(
          minX - leftMargin,
          minY - topMargin,
          maxX - minX + leftMargin + rightMargin,
          maxY - minY + topMargin + bottomMargin
        );

        if (
          latestPrediction &&
          latestPrediction !== "..." &&
          latestPrediction !== "Waiting for hand..."
        ) {
          ctx.fillStyle = "yellow";
          ctx.font = "bold 24px 'Cairo', sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(latestPrediction, (minX + maxX) / 2, minY - 20);
        }

        let data_aux: number[] = [];
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

      if (videoRef.current) {
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current! });
          },
          width: 640,
          height: 480,
        });

        camera.start();

        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = 640;
          canvas.height = 480;
        }
      }

      setHandsInitialized(true);
    };

    initializeHands();
  }, [cameraOpen, tracking]);

  useEffect(() => {
    if (!cameraOpen) return;

    const connectWebSocket = () => {
      const ws = new WebSocket("ws://localhost:8000/ws");
      ws.onopen = () => {
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
          console.error("WebSocket error:", error);
        }
      };

      ws.onclose = () => {
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

  const handleTextToSpeech = (text: string) => {
    const voice = selectedVoice || speechSynthesis.getVoices()[0];
    if (!text.trim() || !voice) {
      console.warn("No valid text or voice selected.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      console.error("Speech synthesis error.");
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "s") {
        setTracking((prev) => !prev);
      } else if (["1", "2", "3", "4"].includes(key)) {
        const modes: Record<string, string> = {
          "1": "EN",
          "2": "AR",
          "3": "Words",
          "4": "Numbers",
        };
        const newMode = modes[key];
        setCurrentMode(newMode);

        const availableVoices = window.speechSynthesis.getVoices();
        const newVoice =
          availableVoices.find((voice) =>
            newMode === "AR" || newMode === "Words" || newMode === "Numbers"
              ? voice.lang.toLowerCase().includes("ar")
              : voice.lang.toLowerCase().includes("en")
          ) || availableVoices[0];

        setSelectedVoice(newVoice);
        console.log("🔁 Mode changed to:", newMode, "| Voice:", newVoice?.name);

        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const message: WsMessage = { type: "mode", value: newMode };
          wsRef.current.send(JSON.stringify(message));
        }
      } else if (key === "q") {
        setTracking(false);
        if (wsRef.current) wsRef.current.close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [latestPrediction, selectedVoice]);

  const handleOpenCamera = () => setCameraOpen(true);
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
        serviceDescription="خدمة فتح الكاميرا وترجمة لغة الإشارة إلى نص مكتوب هي تقنية مبتكرة..."
        serviceMerits={[
          "تحويل فوري...",
          "سهولة الاستخدام...",
          "دعم متنوع...",
          "تعزز الدمج المجتمعي...",
        ]}
      />
      <div className="container mx-auto px-4 pb-8">
        <div className="border-2 border-blue-200 rounded-xl p-8 flex flex-col items-center gap-4 bg-white shadow-sm">
          {!cameraOpen ? (
            <>
              <Video size={48} className="text-blue-500 mx-auto" />
              <p className="text-gray-600 text-center text-lg">
                قم بفتح الكاميرا...
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
                <video ref={videoRef} className="-scale-x-100" playsInline />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
              </div>
              <div className="mt-4 w-full max-w-md mx-auto p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
                <div className="flex justify-between items-center mb-2">
                  <span className="block text-blue-600 font-bold">
                    النص المترجم من لغة الإشارة:
                  </span>
                  {latestPrediction &&
                    latestPrediction !== "..." &&
                    latestPrediction !== "Waiting for hand..." && (
                      <button
                        onClick={() => handleTextToSpeech(latestPrediction)}
                        className="p-2 rounded-full hover:bg-gray-200"
                        disabled={isSpeaking}
                      >
                        <Volume2 size={20} className="text-blue-600" />
                      </button>
                    )}
                </div>
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
                    <strong>{selectedVoice?.name || "غير محدد"}: </strong>الصوت
                    الحالي
                  </p>
                  <p>
                    <strong>{currentMode}: </strong>الوضع الحالي
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
