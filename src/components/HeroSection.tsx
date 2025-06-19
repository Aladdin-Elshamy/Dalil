import React from 'react';

interface HeroSectionProps {
  backgroundImage: string; // Path to the background image
  breadcrumb?: React.ReactNode; // Optional: Breadcrumb or title content
}

const HeroSection: React.FC<HeroSectionProps> = ({ backgroundImage, breadcrumb }) => {
  return (
    <div
      className="relative h-64 bg-cover bg-center flex items-center justify-center opacity-0.5" // Adjust height as needed
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div> {/* Overlay for better text readability */}
      <div className="relative text-white z-10 w-full">
        {/* Breadcrumb or Title */}
        {breadcrumb && (
            <div className="flex justify-end w-ful p-8">
                <div className="text-sm mb-2 text-right">{breadcrumb}</div>
            </div>
        )}
        {/* You can add a main title here if needed */}
      </div>
    </div>
  );
};

export default HeroSection;