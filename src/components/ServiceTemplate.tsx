import React from "react";
import video from "../assets/Videoimg.png";
import vid from "../assets/prev video.mp4";

interface ServiceDetailsProps {
  serviceName: string;
  serviceDescription: string;
  serviceMerits: string[];
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  serviceName,
  serviceDescription,
  serviceMerits,
}) => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row gap-8 justify-between items-center bg-white">
      {/* Left: Video with play button */}
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
      {/* Right: Service Content */}
      <div className="md:w-1/2 flex flex-col gap-4 text-right">
        <span className="bg-sky-100 text-sky-600 px-6 py-1 rounded-lg text-base font-bold self-end mb-2">
          الخدمة
        </span>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{serviceName}</h1>
        {/* عن الخدمة */}
        <div dir="rtl" className="mb-4">
          <h2 className="text-xl font-bold text-blue-600 mb-2">1- عن الخدمة</h2>
          <p className="text-gray-600 leading-relaxed">{serviceDescription}</p>
        </div>
        {/* مزايا الخدمة */}
        <div dir="rtl">
          <h2 className="text-xl font-bold text-blue-600 mb-2">
            2- مزايا الخدمة
          </h2>
          <ul className="list-disc pr-5 text-gray-600 space-y-2">
            {serviceMerits.map((merit, index) => (
              <li key={index}>{merit}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
