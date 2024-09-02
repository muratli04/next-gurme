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
import { FaHamburger,FaCaravan, } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";




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

  const handleLogout = () => {
    alert('Oturum kapatıldı!');
    router.push('/admin/login');
  };

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
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-5 shadow-lg relative">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">Admin Paneli</h1>
            <nav>
              <ul className="flex space-x-6">
                <li className="relative">
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
