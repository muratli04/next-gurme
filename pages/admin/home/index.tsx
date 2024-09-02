/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

interface VideoData {
  link: string;
  description: string;
}

interface RestaurantData {
  name: string;
  city: string;
  image: string;
  rating: number;
  description: string;
}

interface HomeData {
  headerText: string;
  descriptionText: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  image6: string;
  image7: string;
  image8: string;
  leftText: string;
  rightText: string;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedinLink: string;
  youtubeLink: string;
}

interface FAQData {
  question: string;
  answer: string;
}

const Home: React.FC = () => {
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [restaurantData, setRestaurantData] = useState<RestaurantData[]>([]);
  const [homeData, setHomeData] = useState<HomeData>({
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
    facebookLink: '',
    twitterLink: '',
    instagramLink: '',
    linkedinLink: '',
    youtubeLink: '',
  });

  const [faqData, setFaqData] = useState<FAQData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantData | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedVideos = JSON.parse(localStorage.getItem('videoLinks') || '[]') as VideoData[];
      setVideoData(storedVideos);

      const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]') as RestaurantData[];
      setRestaurantData(storedRestaurants);

      const storedHomeData = JSON.parse(localStorage.getItem('homeData') || '{}') as HomeData;
      setHomeData(storedHomeData);

      const storedFaqData = JSON.parse(localStorage.getItem('faqData') || '[]') as FAQData[];
      setFaqData(storedFaqData);
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

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleRestaurantClick = (restaurant: RestaurantData) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  const handleVideoClick = (video: VideoData) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRestaurant(null);
    setSelectedVideo(null);
  };

  const newLocal = <img src={homeData.image1} alt="Slider Image 1" className="w-full h-auto flex-shrink-0" />;
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Navbar */}
      <nav className="bg-white text-black p-4 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Sonradan Gurme</h1>
          <ul className="flex space-x-4 items-center ml-auto">
            <li>
              <Link href="/about" className="hover:text-gray-600">Hakkımda</Link>
            </li>
            <li>
              <Link href="/admin/home/tavsiyelerim" className="hover:text-gray-600">Tavsiyeler</Link>
            </li>
            <li>
              <Link href="/admin/home/blog1" className="hover:text-gray-600">Gezi Rehberim</Link>
            </li>
            <li>
              <Link href="/admin/home/yazi" className="hover:text-gray-600">Yazılarım</Link>
            </li>
            <li>
              <Link href="/admin/home/contacts" className="hover:text-gray-600">İletişim</Link>
            </li>
            <li>
              <Link href="/admin/home/meals" className="hover:text-gray-600">Yemekler</Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-gray-600 flex items-center">
                <UserIcon className="h-6 w-6" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Slider */}
      <div className="slider-container mt-4 overflow-hidden relative" style={{ height: '430px' }}>
        <div ref={sliderRef} className="slider flex transition-transform duration-300 ease-in-out overflow-x-scroll">
          {homeData.image1 && newLocal}
          {homeData.image2 && <img src={homeData.image2} alt="Slider Image 2" className="w-full h-auto flex-shrink-0" />}
          {homeData.image3 && <img src={homeData.image3} alt="Slider Image 3" className="w-full h-auto flex-shrink-0" />}
        </div>
        <button onClick={() => scrollSlider('left')} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">{"<"}</button>
        <button onClick={() => scrollSlider('right')} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">{">"}</button>
      </div>

      {/* Tavsiyeler */}
      <div className="tavsiyeler-container mt-8 p-4">
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
                <div key={index} className="restaurant-item border border-gray-200 p-4 flex-shrink-0 rounded-lg cursor-pointer" onClick={() => handleRestaurantClick(restaurant)}>
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
          <div style={{ width: '378px', height: '648px' }}>
            <img src={homeData.image4} alt="Placeholder Image" className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow text-left ml-8" style={{ maxWidth: 'calc(50% - 189px)' }}>
            <p className="text-gray-700" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: '600', lineHeight: '22px' }}>
              {homeData.rightText || "Bu alanın sağ tarafındaki açıklama metni burada olacak."}
            </p>
          </div>
        </div>
      </div>

      {/* Videolar */}
      <div className="videos-container mt-8 p-4 flex">
        <div className="w-1/5"></div>
        <div className="flex-grow overflow-x-scroll flex space-x-4">
          {videoData.map((video, index) => (
            <div key={index} className="video-item border border-gray-200 p-4 flex-shrink-0 rounded-lg cursor-pointer" style={{ width: '240px' }} onClick={() => handleVideoClick(video)}>
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
      <div className="new-sections-container mt-8 p-4">
        <div className="flex justify-between gap-4">
          <div style={{ width: '465px', height: '760px' }}>
            <img src={homeData.image5} alt="Image 1" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-between">
            <div style={{ width: '465px', height: '370px' }}>
              <img src={homeData.image6} alt="Image 2" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4" style={{ width: '465px', height: '370px' }}>
              <img src={homeData.image7} alt="Image 3" className="w-full h-full object-cover" />
            </div>
          </div>
          <div style={{ width: '950px', height: '760px' }}>
            <img src={homeData.image8} alt="Image 4" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Sıkça Sorulan Sorular */}
      <div className="mt-8 p-6 flex">
        <div className="w-1/2"></div>
        <div className="w-1/2">
          <h2 className="text-2xl text-black font-bold mb-4">Gastronomi Hakkında Sık Sorulan Sorular</h2>
          <ul className="space-y-4">
            {faqData.map((faq, index) => (
              <li key={index} className="bg-white p-4 rounded shadow-md">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(index)}>
                  <p className="font-semibold text-lg text-black" style={{ fontSize: '14px' }}>{faq.question}</p>
                  <span>{activeIndex === index ? '-' : '+'}</span>
                </div>
                {activeIndex === index && (
                  <p className="text-black mt-2" style={{ fontSize: '14px' }}>{faq.answer}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

        {/* Footer */}
      <footer className="bg-gray-800 text-white mt-8 p-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex space-x-4 mb-4">
            <Link href="/about" className="hover:text-gray-400">Hakkımda</Link>
            <Link href="/tavsiyeler" className="hover:text-gray-400">Tavsiyeler</Link>
            <Link href="/gezi-rehberim" className="hover:text-gray-400">Gezi Rehberim</Link>
            <Link href="/yazilarim" className="hover:text-gray-400">Yazılarım</Link>
            <Link href="/contact" className="hover:text-gray-400">İletişim</Link>
          </div>
          <div className="flex space-x-4 mb-4">
            <Link href="https://facebook.com" target="_blank" className="text-white hover:text-gray-400">
              <FaFacebookF />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="text-white hover:text-gray-400">
              <FaTwitter />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="text-white hover:text-gray-400">
              <FaInstagram />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="text-white hover:text-gray-400">
              <FaLinkedinIn />
            </Link>
            <Link href="https://youtube.com" target="_blank" className="text-white hover:text-gray-400">
              <FaYoutube />
            </Link>
          </div>
          <div>
            <p className="text-sm">&copy; 2024 Sonradan Gurme. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-2/3 p-6">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-black text-2xl">&times;</button>
            {selectedRestaurant ? (
              <>
                <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="w-full h-64 object-cover mb-4 rounded" />
                <h2 className="text-xl font-bold mb-2">{selectedRestaurant.name}</h2>
                <p>{selectedRestaurant.description}</p>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Yorumlar</h4>
                  <textarea className="w-full mt-2 p-2 border border-gray-300 rounded" rows={4} placeholder="Yorumunuzu buraya yazın..."></textarea>
                  <button className="bg-blue-500 text-white mt-2 px-4 py-2 rounded">Yorum Yap</button>
                </div>
              </>
            ) : (
              selectedVideo && (
                <div>
                  <iframe
                    width="100%"
                    height="400"
                    src={selectedVideo.link}
                    title="Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p className="mt-4">{selectedVideo.description}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
