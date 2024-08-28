import { UserIcon ,UserGroupIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AdminPanel() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Local storage'dan yemekleri al
    const storedMeals = JSON.parse(localStorage.getItem('meals')) || [];
    setMeals(storedMeals);
  }, []);

  const deleteMeal = (index) => {
    // Mevcut yemek listesinden seçilen yemeği sil
    const updatedMeals = meals.filter((_, mealIndex) => mealIndex !== index);
    
    // Local storage'a güncellenmiş yemek listesini kaydet
    localStorage.setItem('meals', JSON.stringify(updatedMeals));

    // State'i güncelle
    setMeals(updatedMeals);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Yemekler</h2>
        <nav className="flex-grow">
          <ul className="p-4 space-y-4">
            <li>
              <Link href="/admin/meals" className="hover:text-gray-300">
                Yemekler
              </Link>
            </li>
            <li>
              <Link href="/admin/meals/add" className="hover:text-gray-300">
                Yemek Ekle
              </Link>
            </li>
            <li>
              <Link href="/admin/restaurants/add" className="hover:text-gray-300">
                Restoran Ekle
              </Link>
            </li>
            <li>
              <Link href="/admin/comments/index" className="hover:text-gray-300">
                Yorumlar
              </Link>
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
                <Link href="/admin/settings" className="hover:underline flex items-center">
                    <UserGroupIcon className="h-6 w-6 text-white" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 bg-gray-400 min-h-screen">
          <h2 className="text-2xl font-semibold mb-6">Hoşgeldiniz, Admin Paneli</h2>

          {/* Yemek Listesi */}
          {meals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
