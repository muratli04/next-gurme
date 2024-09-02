/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { UserIcon } from '@heroicons/react/24/solid';

const Tavsiyelerim = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    setRestaurants(storedRestaurants);
  }, []);

  const handleRestaurantClick = (restaurant: React.SetStateAction<null>) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRestaurant(null);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
    ));
  };

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
              <Link href="/tavsiyeler" className="hover:text-gray-600">Tavsiyeler</Link>
            </li>
            <li>
              <Link href="/admin/home/blog1" className="hover:text-gray-600">Gezi Rehberim</Link>
            </li>
            <li>
              <Link href="/yazilarim" className="hover:text-gray-600">Yazılarım</Link>
            </li>
            <li>
              <Link href="/admin/home/contacts" className="hover:text-gray-600">İletişim</Link>
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
        <div className="slider flex transition-transform duration-300 ease-in-out overflow-x-scroll">
          {restaurants.length > 0 && restaurants.slice(0, 3).map((restaurant, index) => (
            <img key={index} src={restaurant.image} alt={`Slider Image ${index + 1}`} className="w-full h-auto flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Restoran Listesi */}
      <div className="tavsiyeler-container mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">Restoran Tavsiyelerim</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="restaurant-item border border-gray-200 p-4 flex-shrink-0 rounded-lg cursor-pointer" onClick={() => handleRestaurantClick(restaurant)}>
              <img src={restaurant.image} alt={restaurant.name} className="w-full h-28 object-cover rounded mb-2" />
              <h3 className="text-md font-semibold text-indigo-600">{restaurant.name}</h3>
              <p className="text-gray-700 text-sm">{restaurant.city}</p>
              <div className="mt-2">{renderStars(restaurant.rating)}</div>
            </div>
          ))}
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
            {selectedRestaurant && (
              <>
                <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="w-full h-64 object-cover mb-4 rounded" />
                <h2 className="text-xl font-bold mb-2">{selectedRestaurant.name}</h2>
                <p>{selectedRestaurant.description}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tavsiyelerim;
