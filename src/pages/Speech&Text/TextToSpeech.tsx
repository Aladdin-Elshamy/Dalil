import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import ServiceDetails from "../../components/ServiceTemplate";
import Footer from "../../components/Footer";
import filler from "../../assets/filler.png";
import dot from "../../assets/Ellipse 4.png";
import { Play, Pause, Loader2 } from "lucide-react";

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize voices and set up event listeners
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Try to find an Arabic voice by default
      const arabicVoice = availableVoices.find(
        (voice) => voice.lang.includes("ar") || voice.lang.includes("arabic")
      );

      if (arabicVoice) {
        setSelectedVoice(arabicVoice);
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    // Load voices when they change
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Initial load
    loadVoices();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // Play or pause speech
  const togglePlayback = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  // Convert text to speech using SpeechSynthesis API
  const handlePlay = () => {
    if (!text.trim() || !selectedVoice) return;

    setIsLoading(true);
    window.speechSynthesis.cancel(); // Cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
    utterance.rate = 1; // Adjust speed if needed
    utterance.pitch = 1; // Adjust pitch if needed

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setCurrentTime(0);
      // Estimate duration (characters per second is approximate)
      const estimatedDuration = text.length / 15; // Rough estimate
      setDuration(estimatedDuration);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    utterance.onerror = (event) => {
      console.error("SpeechSynthesis error:", event);
      setIsPlaying(false);
      setIsLoading(false);
    };

    // Store utterance in ref
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Pause speech
  const handlePause = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    utteranceRef.current = null;
  };

  // Reset everything
  const handleReset = () => {
    window.speechSynthesis.cancel();
    setText("");
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    utteranceRef.current = null;
  };

  // Update current time periodically
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 0.1;
          return newTime >= duration ? duration : newTime;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <HeroSection
        backgroundImage={filler}
        breadcrumb={
          <span className="flex flex-row items-center gap-2 text-right text-base">
            <span className="text-blue-600">تحويل النص إلى صوت</span>
            <img src={dot} alt="dot" className="w-2 h-2" />
            <span>الخدمات</span>
          </span>
        }
      />
      <ServiceDetails
        serviceName="تحويل النص إلى صوت"
        serviceDescription="خدمة تحويل النص إلى صوت (Text-to-Speech - TTS) هي تقنية مبتكرة لتحويل النصوص المكتوبة إلى صوت بشري مسموع باستخدام الذكاء الاصطناعي. تتيح هذه الخدمة قراءة النصوص الطويلة بطريقة مريحة وسهلة مما يسهل الوصول إلى المحتوى للأشخاص ذوي الإعاقة البصرية أو صعوبات القراءة أو حتى أثناء الاستماع بدل من القراءة."
        serviceMerits={[
          "تساعد الأشخاص ذوي الإعاقة البصرية أو صعوبات القراءة في الوصول إلى المحتوى المكتوب بسهولة. تسهل قراءة النصوص الطويلة والاستماع إليها أثناء القيام بأنشطة أخرى مثل القيادة أو ممارسة الرياضة.",
          "تسهل للطلاب الاستماع إلى المصطلحات أو المواد التعليمية أثناء المراجعة.",
          "تساعد الأشخاص الذين يعانون من ضعف البصر أو صعوبة في قراءة النصوص المطبوعة.",
          "تساعد الأفراد الذين يفضلون الاستماع إلى المحتوى المكتوب بسهولة. تسهل قراءة النصوص الطويلة والاستماع إليها أثناء القيام بأنشطة أخرى مثل القيادة أو ممارسة الرياضة.",
        ]}
      />

      {/* Text Input and Audio Bar Section */}
      <div className="container mx-auto px-4 flex flex-col gap-6 pb-8">
        {/* Voice selection dropdown */}
        {voices.length > 0 && (
          <div className="flex flex-col gap-2 text-right">
            <label htmlFor="voice-select" className="text-gray-700">
              اختر صوتًا:
            </label>
            <select
              id="voice-select"
              className="border border-gray-300 rounded-lg p-2 text-right"
              value={selectedVoice?.voiceURI || ""}
              onChange={(e) => {
                const voice = voices.find((v) => v.voiceURI === e.target.value);
                if (voice) setSelectedVoice(voice);
              }}
            >
              {voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang}) {voice.default && " - Default"}
                </option>
              ))}
            </select>
          </div>
        )}

        <textarea
          className="w-full min-h-[120px] border border-gray-300 rounded-lg p-4 text-right text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="أدخل النص الذي تريد تحويله إلى صوت..."
          value={text}
          onChange={handleTextChange}
        />

        {/* Audio Bar and Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="flex flex-row gap-4 w-full md:w-auto">
            <button
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2 rounded-lg font-bold text-blue-600 border border-blue-600 hover:bg-blue-50"
              onClick={handleReset}
              disabled={isLoading}
            >
              إلغاء
            </button>
            <button
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2 rounded-lg font-bold text-white transition-colors bg-blue-600 hover:bg-blue-700"
              onClick={togglePlayback}
              disabled={isLoading || !text.trim() || !selectedVoice}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} />
              )}
              {isPlaying ? "إيقاف" : "تشغيل"}
            </button>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 min-w-[180px] w-full md:w-auto">
            <Play size={20} className="text-blue-600 shrink-0" />
            <div className="flex-1 flex items-center justify-between">
              {/* Progress bar */}
              <div className="flex-1 h-6 mx-2 relative">
                <div
                  className="absolute inset-0 bg-blue-200 rounded-full"
                  style={{
                    width: `${
                      duration > 0 ? (currentTime / duration) * 100 : 0
                    }%`,
                  }}
                />
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-gray-700">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TextToSpeech;
