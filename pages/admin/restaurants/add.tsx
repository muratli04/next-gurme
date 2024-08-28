import Link from 'next/link';
import { useState } from 'react'; 
import { UserIcon,UserGroupIcon } from '@heroicons/react/24/solid';
export default function AddRestaurant() {
  const [restaurant, setRestaurant] = useState({ name: '', city: '', image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/restaurants/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurant),
    });

    if (response.ok) {
      alert('Restoran eklendi!');
      setRestaurant({ name: '', city: '', image: null });
    } else {
      alert('Hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Restoranlar</h2>
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
            <h1 className="text-4xl font-bold"></h1>
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

            {/* Restoran Görseli */}
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Restoran Görseli</label>
              <input
                id="image"
                type="file"
                onChange={(e) => setRestaurant({ ...restaurant, image: e.target.files[0] })}
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
        </main>
      </div>
    </div>
  );
}
