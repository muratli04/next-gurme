import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UserIcon,
  UserGroupIcon,
  HomeIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/solid';
import { FaHamburger,FaCaravan } from 'react-icons/fa';
import { FaPencil } from "react-icons/fa6";

export default function AddRestaurant() {
  const [restaurant, setRestaurant] = useState({
    name: '',
    city: '',
    category: '',
    image: '',
    rating: 0,
  });
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Mevcut restoranları localStorage'dan al
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    setRestaurants(storedRestaurants);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resmi base64 formatına çevir
    const reader = new FileReader();
    reader.readAsDataURL(restaurant.image);
    reader.onloadend = () => {
      const newRestaurant = { ...restaurant, image: reader.result as string };
      const updatedRestaurants = [...restaurants, newRestaurant];

      try {
        // Güncellenen listeyi localStorage'a kaydet
        localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
        setRestaurants(updatedRestaurants);

        alert('Restoran eklendi!');
        setRestaurant({ name: '', city: '', category: '', image: '', rating: 0 });
      } catch (error) {
        console.error('Veri kaydedilirken hata oluştu:', error);
        alert('Restoran eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    };
    reader.onerror = (error) => {
      console.error('Resim yüklenirken hata oluştu:', error);
      alert('Resim yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    };
  };

  const handleDelete = (index) => {
    const updatedRestaurants = restaurants.filter((_, i) => i !== index);
    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
    ));
  };

  return (
    <div className="min-h-screen flex">
 <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Admin Paneli</h2>
        <nav className="flex-grow">
          <ul className="p-4 space-y-4">
            <li className="group flex items-center space-x-4 hover:bg-gray-700 p-2 rounded transition-all duration-200 ease-in-out">
              <HomeIcon className="h-6 w-6 text-white group-hover:text-gray-300" />
              <Link href="/admin/home" className="group-hover:text-gray-300">
                Ana Sayfa
              </Link>
            </li>
            <li className="group flex items-center space-x-4 hover:bg-gray-700 p-2 rounded transition-all duration-200 ease-in-out">
              <FaHamburger className="h-6 w-6 text-white group-hover:text-gray-300" />
              <Link href="/admin/meals" className="group-hover:text-gray-300">
                Yemekler
              </Link>
            </li>
            <li className="group flex items-center space-x-4 hover:bg-gray-700 p-2 rounded transition-all duration-200 ease-in-out">
              <PlusCircleIcon className="h-6 w-6 text-white group-hover:text-gray-300" />
              <Link href="/admin/meals/add" className="group-hover:text-gray-300">
                Yemek Ekle
              </Link>
            </li>
            <li className="group flex items-center space-x-4 hover:bg-gray-700 p-2 rounded transition-all duration-200 ease-in-out">
              <PlusCircleIcon className="h-6 w-6 text-white group-hover:text-gray-300" />
              <Link href="/admin/restaurants/add" className="group-hover:text-gray-300">
                Restoran Ekle
              </Link>
            </li>
            <li className="group flex items-center space-x-4 hover:bg-gray-700 p-2 rounded transition-all duration-200 ease-in-out">
              <DocumentTextIcon className="h-6 w-6 text-white group-hover:text-gray-300" />
              <Link href="/admin/comments/index" className="group-hover:text-gray-300">
                Yorumlar
              </Link>
            </li>
            <li className="group flex items-center space-x-4 hover:bg-gray-700 p-2 rounded transition-all duration-200 ease-in-out">
              <VideoCameraIcon className="h-6 w-6 text-white group-hover:text-gray-300" />
              <Link href="/admin/video" className="group-hover:text-gray-300">Videolarım</Link>
            </li>
            <li className="group flex items-center space-x-4 hover:bg-gray-700 p-2 rounded transition-all duration-200 ease-in-out">
              <PencilSquareIcon className="h-6 w-6 text-white group-hover:text-gray-300" />
              <Link href="/admin/edit" className="group-hover:text-gray-300">
                Edit
              </Link>
            </li>
            <li className="group flex items-center space-x-4 hover:bg-gray-700 p-2 rounded transition-all duration-200 ease-in-out">
              <QuestionMarkCircleIcon className="h-6 w-6 text-white group-hover:text-gray-300" />
              <Link href="/admin/question" className="group-hover:text-gray-300">
                Sorular
              </Link>
            </li>
            <li className="group flex items-center space-x-4 hover:bg-gray-700 p-2 rounded transition-all duration-200 ease-in-out">
              <EnvelopeIcon className="h-6 w-6 text-white group-hover:text-gray-300" />
              <Link href="/admin/messages" className="group-hover:text-gray-300">
                Mesajlar
              </Link>
            </li>
            <li className="group flex items-center space-x-4 hover:bg-gray-700 p-2 rounded transition-all duration-200 ease-in-out">
              <GlobeAltIcon className="h-6 w-6 text-white group-hover:text-gray-300" />
              <Link href="/admin/social" className="group-hover:text-gray-300">Sosyal Medya</Link>
            </li>
            <li className="group flex items-center space-x-4 hover:bg-gray-700 p-2 rounded transition-all duration-200 ease-in-out">
              <FaCaravan className="h-6 w-6 text-white group-hover:text-gray-300" />
              <Link href="/admin/geziler" className="group-hover:text-gray-300">Geziler</Link>
            </li>
            <li className="group flex items-center space-x-4 hover:bg-gray-700 p-2 rounded transition-all duration-200 ease-in-out">
              <FaPencil className="h-6 w-6 text-white group-hover:text-gray-300" />
              <Link href="/admin/yazi" className="group-hover:text-gray-300">Yazılar</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-grow">
        {/* Navbar */}
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-5 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold">Restoran Ekle</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 bg-gray-100 min-h-screen">
          <h2 className="text-2xl font-semibold mb-6">Restoran Ekle</h2>

          {/* Restoran Ekleme Formu */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white border border-gray-300 shadow-lg rounded-lg">
            <h1 className="text-3xl mb-6 font-semibold text-center text-gray-800">Restoran Ekle</h1>

            {/* Restoran Adı */}
            <div className="mb-4">
              <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">Restoran Adı</label>
              <input
                id="restaurantName"
                type="text"
                placeholder="Restoran Adı"
                value={restaurant.name}
                onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Şehir */}
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Şehir</label>
              <input
                id="city"
                type="text"
                placeholder="Şehir"
                value={restaurant.city}
                onChange={(e) => setRestaurant({ ...restaurant, city: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Kategori */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
              <input
                id="category"
                type="text"
                placeholder="Kategori"
                value={restaurant.category}
                onChange={(e) => setRestaurant({ ...restaurant, category: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Restoran Görseli */}
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Restoran Görseli</label>
              <input
                id="image"
                type="file"
                onChange={(e) => setRestaurant({ ...restaurant, image: e.target.files![0] })}
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Puanlama */}
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Puanlama</label>
              <input
                id="rating"
                type="number"
                max="5"
                min="1"
                placeholder="Puan"
                value={restaurant.rating}
                onChange={(e) => setRestaurant({ ...restaurant, rating: parseInt(e.target.value) })}
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Submit Butonu */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-all"
            >
              Restoran Ekle
            </button>
          </form>

          {/* Eklenen Restoranların Listesi */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Eklenen Restoranlar</h3>
            {restaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {restaurants.map((restaurant, index) => (
                  <div key={index} className="p-4 bg-white rounded shadow-md">
                    <img src={restaurant.image} alt={restaurant.name} className="w-full h-32 object-cover rounded mb-2" />
                    <h4 className="text-lg font-semibold text-indigo-600">{restaurant.name}</h4>
                    <p className="text-gray-700">{restaurant.city}</p>
                    <p className="text-gray-700">{restaurant.category}</p>
                    <div className="mt-2 mb-4">{renderStars(restaurant.rating)}</div>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-all w-full"
                    >
                      Sil
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Henüz restoran eklenmedi.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
