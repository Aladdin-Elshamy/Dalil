import React, { useState, useRef } from 'react';
import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import ServiceDetails from '../../components/ServiceTemplate';
import Footer from '../../components/Footer';
import filler from '../../assets/filler.png';
import dot from '../../assets/Ellipse 4.png';
import { Mic, Pause, Loader2 } from 'lucide-react';

const SpeechToText: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [audioTime, setAudioTime] = useState('0:00');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const secondsRef = useRef<number>(0);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString();
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Start/stop recording and speech recognition
  const handleRecord = async () => {
    if (!recording) {
      setLoading(true);
      setText('');
      setAudioUrl(null);
      secondsRef.current = 0;
      setAudioTime('0:00');
      // Start timer
      timerRef.current = setInterval(() => {
        secondsRef.current += 1;
        setAudioTime(formatTime(secondsRef.current));
      }, 1000);
      // Start MediaRecorder
      if (navigator.mediaDevices && window.MediaRecorder) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const mediaRecorder = new MediaRecorder(stream);
          audioChunksRef.current = [];
          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) audioChunksRef.current.push(e.data);
          };
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            setAudioUrl(URL.createObjectURL(audioBlob));
            stream.getTracks().forEach(track => track.stop());
          };
          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.start();
        } catch (err) {
          alert('تعذر الوصول إلى الميكروفون.');
          setLoading(false);
          if (timerRef.current) clearInterval(timerRef.current);
          return;
        }
      } else {
        alert('متصفحك لا يدعم تسجيل الصوت.');
        setLoading(false);
        if (timerRef.current) clearInterval(timerRef.current);
        return;
      }
      // Start SpeechRecognition
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('متصفحك لا يدعم تحويل الصوت إلى نص. يرجى استخدام Chrome أو Edge.');
        setLoading(false);
        if (timerRef.current) clearInterval(timerRef.current);
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-EG';
      recognition.interimResults = true;
      recognition.continuous = true;
      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setText(transcript.trim());
      };
      recognition.onerror = (event: any) => {
        setLoading(false);
        setRecording(false);
        alert('حدث خطأ أثناء التسجيل: ' + event.error);
      };
      recognitionRef.current = recognition;
      recognition.start();
      setRecording(true);
      setLoading(false);
    } else {
      // Stop everything
      setRecording(false);
      setLoading(false);
      if (timerRef.current) clearInterval(timerRef.current);
      // Stop MediaRecorder
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      // Stop SpeechRecognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <HeroSection
        backgroundImage={filler}
        breadcrumb={
          <span className="flex flex-row items-center gap-2 text-right text-base">
            <span className="text-blue-600">تحويل الصوت إلى نص</span>
            <img src={dot} alt="dot" className="w-2 h-2" />
            <span>الخدمات</span>
          </span>
        }
      />
      <ServiceDetails
        serviceName="تحويل الصوت إلى نص"
        serviceDescription="خدمة تحويل الصوت إلى نص (Speech-to-Text - STT) هي تقنية تعتمد على الذكاء الاصطناعي لتحويل الكلام المسموع إلى نص مكتوب بدقة وسرعة. تعد هذه الخدمة أداة هامة لتحسين الإنتاجية وإمكانية الوصول حيث تتيح للمستخدمين من تسجيل الأفكار والملاحظات والاجتماعات أو التفاعل مع المحتوى الصوتي بسهولة."
        serviceMerits={[
          'يتمكن المستخدمون من تحويل المحادثات أو التسجيلات الصوتية إلى نصوص مكتوبة بسرعة مما يوفر الوقت والجهد في التلخيص أو الأرشفة أو الكتابة اليدوية.',
          'تساعد الخدمة ذوي الإعاقة السمعية أو النطقية في التفاعل مع العالم على الإنترنت.',
          'إمكانية التعديل على النص الناتج ومشاركته أو تعديله بسهولة.'
        ]}
      />
      {/* Recording and Text Area Section */}
      <div className="container mx-auto px-4 flex flex-col gap-6 pb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="flex flex-row gap-4 w-full md:w-auto">
            <button
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2 rounded-lg font-bold text-blue-600 border border-blue-600 hover:bg-blue-50"
              onClick={() => {
                setRecording(false);
                setText('');
                setLoading(false);
                setAudioUrl(null);
                setAudioTime('0:00');
                if (timerRef.current) clearInterval(timerRef.current);
                if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                  mediaRecorderRef.current.stop();
                }
                if (recognitionRef.current) {
                  recognitionRef.current.stop();
                }
              }}
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2 rounded-lg font-bold text-white transition-colors ${recording ? 'bg-red-500' : 'bg-blue-600'} hover:bg-blue-700`}
              onClick={handleRecord}
              disabled={loading}
            >
              {recording ? <Pause size={20} /> : <Mic size={20} />}
              {recording ? 'إيقاف' : 'تحويل'}
            </button>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 min-w-[180px] w-full md:w-auto">
            <Mic size={20} className="text-blue-600 shrink-0" />
            <div className="flex-1 flex items-center justify-between">
              {/* Waveform placeholder as a full-width gradient */}
              <div className="flex-1 h-6 mx-2 relative">
                <div className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `repeating-linear-gradient(to right, #2563eb 0 2px, transparent 2px 10px)`
                  }}
                />
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-gray-700">{audioTime}</span>
                {loading && <Loader2 size={18} className="animate-spin text-blue-600" />}
              </div>
            </div>
          </div>
        </div>
        {audioUrl && (
          <div className="flex justify-center mt-2">
            <audio controls src={audioUrl} className="w-full max-w-md" />
          </div>
        )}
        <textarea
          className="w-full min-h-[120px] border border-gray-300 rounded-lg p-4 text-right text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="تم تسجيل ما تريده وسيتحول إلى نص يمكنك قراءته هنا......"
          value={text}
          readOnly
        />
      </div>
      <Footer />
    </div>
  );
};

export default SpeechToText;
