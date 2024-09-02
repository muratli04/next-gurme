import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedMeals = JSON.parse(localStorage.getItem('meals')) || [];
    setMeals(storedMeals);
  }, []);

  const openModal = (meal) => {
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMeal(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Sonradan Gurme</h1>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="hover:text-gray-300">Ana Sayfa</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">Hakkımda</Link>
            </li>
            <li>
              <Link href="/gezi-rehberim" className="hover:text-gray-300">Gezi Rehberim</Link>
            </li>
            <li>
              <Link href="/yazilarim" className="hover:text-gray-300">Yazılarım</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">İletişim</Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-gray-300 flex items-center">
                <UserIcon className="h-6 w-6" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Yemek Listesi */}
      <main className="flex-grow container mx-auto p-6 bg-white">
        <h1 className="text-3xl font-bold mb-6">Yemekler</h1>
        {meals.length > 0 ? (
          <div className="grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => openModal(meal)}
              >
                <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover rounded-t-lg" />
                <h2 className="text-xl font-bold mt-4">{meal.name}</h2>
                <p className="text-gray-600">{meal.description}</p>
                <p className="text-gray-800 font-semibold">Kategori: {meal.category}</p>
                <p className="text-gray-800 font-semibold">Restoran: {meal.restaurant}</p>
                <p className="mt-2 text-yellow-500">
                  Puan: {'⭐'.repeat(meal.rating)} ({meal.rating}/5)
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700">Henüz yemek eklenmemiş.</p>
        )}
      </main>

      {/* Modal */}
      {showModal && selectedMeal && (
        <div className="fixed inset-0 text-black flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <button className="text-gray-500" onClick={closeModal}>X</button>
            <img src={selectedMeal.image} alt={selectedMeal.name} className="w-full h-64 object-cover rounded mb-4" />
            <h2 className="text-2xl font-bold mb-2">{selectedMeal.name}</h2>
            <p className="text-gray-700 mb-4">{selectedMeal.description}</p>
            <p className="text-gray-800 font-semibold">Kategori: {selectedMeal.category}</p>
            <p className="text-gray-800 font-semibold">Restoran: {selectedMeal.restaurant}</p>
            <p className="mt-2 text-yellow-500">
              Puan: {'⭐'.repeat(selectedMeal.rating)} ({selectedMeal.rating}/5)
            </p>
            {/* Yorum Ekleme Formu ve Yorumlar */}
            {/* Bu kısmı burada uygulayabilirsiniz */}
          </div>
        </div>
      )}

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
    </div>
  );
}
