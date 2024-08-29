import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';

const Home: React.FC = () => {
  const [videoData, setVideoData] = useState<{ link: string, description: string }[]>([]);
  const [restaurantData, setRestaurantData] = useState<{ name: string, city: string, image: string, rating: number }[]>([]);
  const [homeData, setHomeData] = useState({
    headerText: '',
    descriptionText: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    image6: '',
    image7: '',
    image8: '',
    leftText: '',
    rightText: '',
  });

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedVideos = JSON.parse(localStorage.getItem('videoLinks') || '[]');
      setVideoData(storedVideos);

      const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
      setRestaurantData(storedRestaurants);

      const storedHomeData = JSON.parse(localStorage.getItem('homeData') || '{}');
      setHomeData(storedHomeData);
    } catch (error) {
      console.error('LocalStorage getItem hatası:', error);
    }
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
    ));
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Sonradan Gurme</h1>
          <ul className="flex space-x-4 items-center ml-auto">
            <li>
              <Link href="/about" className="hover:text-gray-400">Hakkımızda</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">İletişim</Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-gray-400 flex items-center">
                <UserIcon className="h-6 w-6 text-white" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="slider-container bg-gray-200 mt-4 overflow-hidden relative" style={{ height: '430px' }}>
        <div ref={sliderRef} className="slider flex transition-transform duration-300 ease-in-out overflow-x-scroll">
          <img src={homeData.image1 || "/slider1.jpg"} alt="Slider Image 1" className="w-full h-auto flex-shrink-0" />
          <img src={homeData.image2 || "/slider2.jpg"} alt="Slider Image 2" className="w-full h-auto flex-shrink-0" />
          <img src={homeData.image3 || "/slider3.jpg"} alt="Slider Image 3" className="w-full h-auto flex-shrink-0" />
        </div>
        <button onClick={() => scrollSlider('left')} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">{"<"}</button>
        <button onClick={() => scrollSlider('right')} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">{">"}</button>
      </div>

      <div className="tavsiyeler-container bg-white mt-8 p-4">
        <div className="flex">
          <div className="w-1/5"></div>
          <div className="w-4/5 flex">
            <div className="w-1/3 pr-8">
              <h2 className="text-2xl text-black font-bold mb-2" style={{ fontFamily: 'Open Sans', fontSize: '24px', fontWeight: '700', lineHeight: '32px' }}>
                {homeData.headerText || "Tavsiyelerim"}
              </h2>
              <p className="text-gray-700 mb-4" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: '600', lineHeight: '22px' }}>
                {homeData.descriptionText || "En özel lezzetleri keşfetmeniz için seçtiğim mekanlar ve tatlarla mutfağın en iyilerini deneyimleyin."}
              </p>
            </div>
            <div className="w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {restaurantData.map((restaurant, index) => (
                <div key={index} className="restaurant-item bg-white border border-gray-200 p-4 flex-shrink-0 rounded-lg">
                  <img src={restaurant.image} alt={restaurant.name} className="w-full h-28 object-cover rounded mb-2" />
                  <h3 className="text-md font-semibold text-indigo-600" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: '600' }}>{restaurant.name}</h3>
                  <p className="text-gray-700 text-sm" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>{restaurant.city}</p>
                  <div className="mt-2">{renderStars(restaurant.rating)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8">
          <div className="flex-grow text-right mr-8" style={{ maxWidth: 'calc(50% - 189px)' }}>
            <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: '600', lineHeight: '22px' }}>
              {homeData.leftText || "Bu alanın sol tarafındaki açıklama metni burada olacak."}
            </p>
          </div>
          <div className="bg-gray-200" style={{ width: '378px', height: '648px' }}>
            <img src={homeData.image4 || "/your-image.jpg"} alt="Placeholder Image" className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow text-left ml-8" style={{ maxWidth: 'calc(50% - 189px)' }}>
            <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: '600', lineHeight: '22px' }}>
              {homeData.rightText || "Bu alanın sağ tarafındaki açıklama metni burada olacak."}
            </p>
          </div>
        </div>
      </div>

      <div className="videos-container bg-white mt-8 p-4 flex">
        <div className="w-1/5"></div>
        <div className="flex-grow overflow-x-scroll flex space-x-4">
          {videoData.map((video, index) => (
            <div key={index} className="video-item bg-white border border-gray-200 p-4 flex-shrink-0 rounded-lg" style={{ width: '240px' }}>
              <iframe
                width="100%"
                height="135"
                src={video.link}
                title={`Video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="text-gray-700 mt-2" style={{ fontFamily: 'Open Sans', fontSize: '14px' }}>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Yeni Görsel Alanları */}
      <div className="new-sections-container bg-white mt-8 p-4">
        <div className="flex justify-between gap-4">
          <div className="bg-gray-300" style={{ width: '465px', height: '760px' }}>
            <img src={homeData.image5 || "/your-image1.jpg"} alt="Image 1" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="bg-gray-300" style={{ width: '465px', height: '370px' }}>
              <img src={homeData.image6 || "/your-image2.jpg"} alt="Image 2" className="w-full h-full object-cover" />
            </div>
            <div className="bg-gray-300 mt-4" style={{ width: '465px', height: '370px' }}>
              <img src={homeData.image7 || "/your-image3.jpg"} alt="Image 3" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="bg-gray-300" style={{ width: '950px', height: '760px' }}>
            <img src={homeData.image8 || "/your-image4.jpg"} alt="Image 4" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-8 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm">&copy; </p>
          </div>
          <div className="flex space-x-4">
            <Link href={homeData.facebookLink || '#'} target="_blank" className="hover:text-gray-400">Facebook</Link>
            <Link href={homeData.twitterLink || '#'} target="_blank" className="hover:text-gray-400">Twitter</Link>
            <Link href={homeData.instagramLink || '#'} target="_blank" className="hover:text-gray-400">Instagram</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
