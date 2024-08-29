import Link from 'next/link';
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

export default function AddMeal() {
  const [meal, setMeal] = useState({
    name: '',
    description: '',
    restaurant: '',
    image: null,
    rating: 0,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMeal({ ...meal, image: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedMeals = JSON.parse(localStorage.getItem('meals')) || [];
    const updatedMeals = [...storedMeals, meal];
    localStorage.setItem('meals', JSON.stringify(updatedMeals));

    alert('Yemek başarıyla eklendi!');
    setMeal({ name: '', description: '', restaurant: '', image: null, rating: 0 });
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Yemek Ekle</h2>
        <nav className="flex-grow">
          <ul className="p-4 space-y-4">
            <li>
              <Link href="/admin/meals" className="hover:text-gray-300">Yemekler</Link>
            </li>
            <li>
              <Link href="/admin/meals/add" className="hover:text-gray-300">Yemek Ekle</Link>
            </li>
            <li>
              <Link href="/admin/restaurants/add" className="hover:text-gray-300">Restoran Ekle</Link>
            </li>
            <li>
              <Link href="/admin/comments/index" className="hover:text-gray-300">Yorumlar</Link>
            </li>
            <li>
              <Link href="/admin/video" className="hover:text-gray-300">Videolarım </Link>
            </li>
            <li>
              <Link href="/admin/edit" className="hover:text-gray-300">
                Edit
              </Link>

            </li>
           </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-grow">
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-5 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold"></h1>
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
          </div>
        </header>

        {/* Content */}
        <main className="p-8 bg-gray-100 min-h-screen">
          <h2 className="text-2xl font-semibold mb-6">Yeni Yemek Ekle</h2>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white border border-gray-300 shadow-lg rounded-lg">
            <h1 className="text-3xl mb-6 font-semibold text-center text-gray-800">Yemek Ekle</h1>

            <div className="mb-4">
              <label htmlFor="mealName" className="block text-sm font-medium text-gray-700">Yemek Adı</label>
              <input
                id="mealName"
                type="text"
                placeholder="Yemek Adı"
                value={meal.name}
                onChange={(e) => setMeal({ ...meal, name: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mealDescription" className="block text-sm font-medium text-gray-700">Yemek Açıklaması</label>
              <textarea
                id="mealDescription"
                placeholder="Yemek Açıklaması"
                value={meal.description}
                onChange={(e) => setMeal({ ...meal, description: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">Restoran Adı</label>
              <input
                id="restaurantName"
                type="text"
                placeholder="Restoran Adı"
                value={meal.restaurant}
                onChange={(e) => setMeal({ ...meal, restaurant: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mealImage" className="block text-sm font-medium text-gray-700">Yemek Görseli</label>
              <input
                id="mealImage"
                type="file"
                onChange={handleImageChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mealRating" className="block text-sm font-medium text-gray-700">Yemek Puanı</label>
              <select
                id="mealRating"
                value={meal.rating}
                onChange={(e) => setMeal({ ...meal, rating: e.target.value })}
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value={0}>Puan Ver</option>
                <option value={1}>⭐</option>
                <option value={2}>⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={5}>⭐⭐⭐⭐⭐</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-all">
              Yemek Ekle
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
