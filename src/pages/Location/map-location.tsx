import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceDetails from "../../components/ServiceTemplate";
import HeroSection from "../../components/HeroSection";
import filler from "../../assets/filler.png";
import dot from "../../assets/Ellipse 4.png";
import restaurant from "../../assets/restaurant.png";
import hospital from "../../assets/Hospital.png";
import hotel from "../../assets/hotel.png";
import bank from "../../assets/bank.png";

const MapLocation: React.FC = () => {
  const [search, setSearch] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [cityName, setCityName] = useState("");
  const [userCoords, setUserCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [results, setResults] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 30.0444,
    lon: 31.2357,
    zoom: 6,
  });

  // Reverse geocode to get city name from coordinates
  const getCityName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data.address) {
        // Try to get the most specific locality name available
        const city = data.address.city + ", " + data.address.country;
        console.log(data);

        setCityName(city || "موقعك الحالي");
      }
    } catch (error) {
      console.error("Error fetching city name:", error);
      setCityName("موقعك الحالي");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setUserCoords(coords);
        setCurrentLocation(
          `${pos.coords.latitude.toFixed(6)},${pos.coords.longitude.toFixed(6)}`
        );
        setMapCenter({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          zoom: 14,
        });
        await getCityName(pos.coords.latitude, pos.coords.longitude);
      });
    }
  }, []);

  // Function to search for wheelchair accessible places using Overpass API
  // Function to search for wheelchair accessible places using Overpass API only
  const searchWheelchairAccessiblePlaces = async (category: string) => {
    if (!userCoords) return;

    const overpassCategoryMap: { [key: string]: string } = {
      مطعم: "restaurant",
      بنك: "bank",
      مستشفى: "hospital",
      فندق: "hotel",
    };

    const osmCategory = overpassCategoryMap[category];

    if (!osmCategory) return;

    const query = `
    [out:json]; node [amenity=${osmCategory}] [wheelchair=yes] (around:5000,30.0444,31.2357); out center;
  `;

    try {
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      setResults(data.elements);
    } catch (error) {
      console.error("Error fetching from Overpass API:", error);
      setResults([]);
    }
  };

  const handleSearch = async (searchTermOverride?: string) => {
    const currentSearchTerm =
      searchTermOverride !== undefined ? searchTermOverride : search;

    if (!currentSearchTerm) {
      setResults([]);
      return;
    }

    // Check if it's a category search (which we'll handle with wheelchair accessible places)
    const categories = ["مطعم", "بنك", "مستشفى", "فندق"];
    if (categories.includes(currentSearchTerm)) {
      await searchWheelchairAccessiblePlaces(currentSearchTerm);
      return;
    }

    // Otherwise do regular search
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      currentSearchTerm
    )}`;
    if (userCoords) {
      const delta = 0.2;
      const left = userCoords.lon - delta;
      const right = userCoords.lon + delta;
      const top = userCoords.lat + delta;
      const bottom = userCoords.lat - delta;
      url += `&viewbox=${left},${top},${right},${bottom}&bounded=1`;
    }
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResults(data);
      if (data.length > 0) {
        setMapCenter({
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          zoom: 14,
        });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
  };

  const handleCategorySelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSearch(selectedValue);
    handleSearch(selectedValue);
  };

  const PLACE_IMAGES: { [key: string]: string } = {
    restaurant: restaurant,
    hospital: hospital,
    hotel: hotel,
    bank: bank,
    default:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  };

  function getPlaceImage(name: string, wheelchairAccess: string) {
    const lower = name?.toLowerCase();
    if (wheelchairAccess && wheelchairAccess !== "no")
      return PLACE_IMAGES.wheelchair;
    if (lower?.includes("مطعم") || lower?.includes("restaurant"))
      return PLACE_IMAGES.restaurant;
    if (lower?.includes("مستشفى") || lower?.includes("hospital"))
      return PLACE_IMAGES.hospital;
    if (lower?.includes("فندق") || lower?.includes("hotel"))
      return PLACE_IMAGES.hotel;
    if (lower?.includes("بنك") || lower?.includes("bank"))
      return PLACE_IMAGES.bank;
    return PLACE_IMAGES.default;
  }

  return (
    <div>
      <Navbar />
      <HeroSection
        backgroundImage={filler}
        breadcrumb={
          <span className="flex flex-row items-center gap-2 text-right text-base">
            <span className="text-blue-600">تحديد الموقع</span>
            <img src={dot} alt="dot" className="w-2 h-2" />
            <span>الخدمات</span>
          </span>
        }
      />
      <ServiceDetails
        serviceName="تحديد الموقع"
        serviceDescription="خدمة تحديد مواقع الأماكن المخصصة لذوي الهمم تسهل العثور على مطاعم، مستشفيات، وأماكن ترفيهية مجهزة تلبي احتياجاتهم الخاصة، مما يعزز راحتهم واستقلاليتهم في التنقل والاستمتاع بحياتهم اليومية."
        serviceMerits={[
          "سهولة العثور على الأماكن المهيأة لذوي الهمم بسرعة مما يوفر الوقت في البحث أو الانتظار الطويل.",
          "توفير بيانات دقيقة تشمل دعم المستشفيات والمطاعم وأماكن الترفيه.",
          "أماكن محدثة لتحصيل دقة البيانات.",
        ]}
      />

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 w-full">
          <div
            className="rounded-xl overflow-hidden shadow"
            style={{ minHeight: 350 }}
          >
            <iframe
              title="خريطة"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                mapCenter.lon - 0.05
              },${mapCenter.lat - 0.05},${mapCenter.lon + 0.05},${
                mapCenter.lat + 0.05
              }&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lon}`}
              className="w-full h-[590px] border-0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <div className="mb-4">
            <div
              className="w-full flex items-center bg-white rounded-xl shadow-md overflow-hidden"
              dir="rtl"
            >
              <div className="relative flex-1" style={{ minWidth: 0 }}>
                <select
                  value={search}
                  onChange={handleCategorySelect}
                  className="w-full py-3 pl-10 pr-4 text-gray-400 bg-white border-none focus:outline-none appearance-none"
                >
                  <option value="" disabled={search !== ""}>
                    بحث عن
                  </option>
                  <option value="مطعم">مطعم (مهيأ لذوي الهمم)</option>
                  <option value="بنك">بنك (مهيأ لذوي الهمم)</option>
                  <option value="مستشفى">مستشفى (مهيأ لذوي الهمم)</option>
                  <option value="فندق">فندق (مهيأ لذوي الهمم)</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.232 7.232a.75.75 0 011.06 0L10 10.939l3.707-3.707a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0l-4.25-4.25a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="w-px h-8 bg-gray-200 mx-2" />
              <input
                type="text"
                placeholder="الموقع الحالي"
                value={cityName || `موقعي: ${currentLocation}`}
                readOnly
                className="flex-1 px-4 py-3 text-gray-400 bg-white border-none focus:outline-none cursor-pointer"
                style={{ minWidth: 0 }}
              />

              <button
                className="bg-blue-600 h-full py-3.5 px-5 flex items-center justify-center"
                onClick={() => handleSearch()}
              >
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
            {results.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() =>
                  setMapCenter({
                    lat: parseFloat(item.lat),
                    lon: parseFloat(item.lon),
                    zoom: 16,
                  })
                }
              >
                <div className="flex-shrink-0">
                  <img
                    src={getPlaceImage(item.display_name, item.wheelchair)}
                    alt={item.tags.name}
                    className="w-24 h-20 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="text-blue-700 font-bold text-lg">
                      {item.tags.name}
                    </span>
                    {item.tags.wheelchair && item.tags.wheelchair !== "no" && (
                      <span className="text-green-600 text-sm">
                        {item.tags.wheelchair === "yes"
                          ? "مهيأ بالكامل"
                          : "مهيأ جزئياً"}
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm mb-2">
                    {item.display_name}
                  </div>
                </div>
              </div>
            ))}
            {results.length === 0 && search && (
              <div className="text-center text-gray-500 py-4">
                لم يتم العثور على نتائج لـ "{search}"
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MapLocation;
