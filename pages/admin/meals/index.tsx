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
import { FaHamburger,FaCaravan } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import Link from 'next/link';
import { useState, useEffect } from 'react';
export default function AdminPanel() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Local storage'dan yemekleri al
    const storedMeals = JSON.parse(localStorage.getItem('meals')) || [];
    setMeals(storedMeals);
  }, []);

  function deleteMeal(index: number) {
    // Mevcut yemek listesinden seçilen yemeği sil
    const updatedMeals = meals.filter((_, mealIndex) => mealIndex !== index);

    // Local storage'a güncellenmiş yemek listesini kaydet
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
    setMeals(updatedMeals);
  }

  return (
    <div className="min-h-screen flex">
 {/* Sidebar */}
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
            <h1 className="text-3xl font-bold"></h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/admin" className="hover:underline flex items-center">
                    <UserIcon className="h-6 w-6 text-black" />
                  </Link> 
                </li>
                <li>
                <Link href="/admin/home" className="hover:underline flex items-center">
                    <UserGroupIcon className="h-6 w-6 text-white" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="p-8 bg-gray-100 min-h-screen">
          {/* Yemek Listesi */}
          {meals.length > 0 ? (
            <div className="grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover rounded-t-lg"/>
                  <h2 className="text-xl font-bold mt-4">{meal.name}</h2>
                  <p className="text-gray-600">{meal.description}</p>
                  <p className="text-gray-800 font-semibold">Restoran: {meal.restaurant}</p>
                  <p className="mt-2 text-yellow-500">
                    Puan: {'⭐'.repeat(meal.rating)} ({meal.rating}/5)
                  </p>
                  <button
                    onClick={() => deleteMeal(index)}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-all"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700">Henüz yemek eklenmemiş.</p>
          )}
        </main>
      </div>
    </div>
  );
}
