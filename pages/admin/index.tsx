import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

export default function AdminInfo() {
  const [adminInfo, setAdminInfo] = useState({
    name: 'Murat Atlı',
    email: 'admin@example.com',
    role: 'Sistem Yöneticisi',
    image: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedAdminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    if (storedAdminInfo) {
      setAdminInfo(storedAdminInfo);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAdminInfo({ ...adminInfo, image: URL.createObjectURL(file) });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo({ ...adminInfo, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
    setEditMode(false);
    alert('Bilgiler başarıyla güncellendi!');
  };

  // Çıkış Yapma Fonksiyonu (Admin bilgileri kalacak, sadece oturum sonlanacak)
  const handleLogout = () => {
    alert('Oturum kapatıldı!');
    router.push('/admin/login'); // Çıkıştan sonra login sayfasına yönlendir.
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Admin Paneli</h2>
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
        {/* Navbar */}
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-5 shadow-lg relative">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold"></h1>
            <nav>
              <ul className="flex space-x-6">
                <li className="relative">
                  {/* Dropdown Menü ile User Icon */}
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="hover:underline flex items-center focus:outline-none"
                  >
                    <UserIcon className="h-6 w-6 text-white" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                      <ul>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Çıkış Yap
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <Link href="/admin/home" className="hover:underline flex items-center">
                    <UserGroupIcon className="h-6 w-6 text-white rounded-lg" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 bg-gray-100 min-h-screen">
          <div className="bg-white p-6 shadow-md rounded-lg">
            {adminInfo.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={adminInfo.image}
                alt="Admin Görseli"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
            )}

            <div className="text-center text-black">
              {editMode ? (
                <div>
                  {/* Admin Görseli */}
                  <div className="mb-4">
                    <label htmlFor="adminImage" className="block text-sm font-medium text-gray-700">
                      Admin Görseli
                    </label>
                    <input
                      id="adminImage"
                      type="file"
                      onChange={handleImageChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Admin Adı */}
                  <div className="mb-4">
                    <label htmlFor="adminName" className="block text-sm font-medium text-gray-700">
                      Admin Adı
                    </label>
                    <input
                      id="adminName"
                      name="name"
                      type="text"
                      value={adminInfo.name}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Admin E-posta */}
                  <div className="mb-4">
                    <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">
                      Admin E-posta
                    </label>
                    <input
                      id="adminEmail"
                      name="email"
                      type="email"
                      value={adminInfo.email}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Admin Görevi */}
                  <div className="mb-4">
                    <label htmlFor="adminRole" className="block text-sm font-medium text-gray-700">
                      Görev
                    </label>
                    <input
                      id="adminRole"
                      name="role"
                      type="text"
                      value={adminInfo.role}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Kaydet Butonu */}
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-all"
                  >
                    Kaydet
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold">{adminInfo.name}</h2>
                  <p className="mt-2">E-posta: {adminInfo.email}</p>
                  <p className="mt-2">Görev: {adminInfo.role}</p>

                  <button
                    onClick={() => setEditMode(true)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
                  >
                    Düzenle
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
