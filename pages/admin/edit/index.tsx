import React, { useState } from 'react';
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
import { FaHamburger,FaCaravan } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const AdminEdit: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [homeData, setHomeData] = useState({
    headerText: '',
    descriptionText: '',
    geziTitle: '', // Gezi sayfası başlığı
    geziImage1: '',
    geziImage2: '',
    geziImage3: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHomeData({ ...homeData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, imageField: string) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 800;
        const scaleSize = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);

        const resizedImage = canvas.toDataURL('image/jpeg', 0.7);
        setHomeData({ ...homeData, [imageField]: resizedImage });
      };
    };
  };

  const handleSave = () => {
    localStorage.setItem('homeData', JSON.stringify(homeData));
    alert('Değişiklikler kaydedildi!');
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

      {/* Main Content */}
      <div className="flex-grow bg-gray-100">
        {/* Navbar */}
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-5 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">Ana Sayfa Düzenleme</h1>
          </div>
        </header>

        {/* Sections */}
        <main className="p-8">
          <h2 className="text-2xl text-black font-bold mb-4">Düzenlenecek Alanlar</h2>
          <ul className="space-y-4">
          <li>
              <button
                onClick={() => setActiveSection('geziSlider')}
                className="bg-blue-500 text-white py-2 px-4 rounded w-full text-left"
              >
                Gezi Sayfam
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('slider')}
                className="bg-blue-500 text-white py-2 px-4 rounded w-full text-left"
              >
                Slider Görselleri
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveSection('images')}
                className="bg-blue-500 text-white py-2 px-4 rounded w-full text-left"
              >
                Diğer Görseller
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('texts')}
                className="bg-blue-500 text-white py-2 px-4 rounded w-full text-left"
              >
                Metinler
              </button>
            </li>
          </ul>

          {activeSection === 'slider' && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Slider Görselleri</h3>
              {[1, 2, 3].map((num) => (
                <div className="mb-4" key={num}>
                  <label className="block text-sm font-medium text-black">{`Slider Görsel ${num}`}</label>
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, `image${num}`)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                  />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'geziSlider' && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Gezi Sayfam</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Başlık</label>
                <input
                  type="text"
                  name="geziTitle"
                  value={homeData.geziTitle}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                />
              </div>
              {[1, 2, 3].map((num) => (
                <div className="mb-4" key={num}>
                  <label className="block text-sm font-medium text-black">{`Gezi Slider Görsel ${num}`}</label>
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, `geziImage${num}`)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                  />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'images' && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Diğer Görseller</h3>
              {[4, 5, 6, 7, 8].map((num) => (
                <div className="mb-4" key={num}>
                  <label className="block text-sm font-medium text-black">{`Görsel ${num}`}</label>
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, `image${num}`)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                  />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'texts' && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Metinler</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Başlık</label>
                <input
                  type="text"
                  name="headerText"
                  value={homeData.headerText}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Açıklama</label>
                <input
                  type="text"
                  name="descriptionText"
                  value={homeData.descriptionText}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Sol Metin</label>
                <input
                  type="text"
                  name="leftText"
                  value={homeData.leftText}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Sağ Metin</label>
                <input
                  type="text"
                  name="rightText"
                  value={homeData.rightText}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-8"
          >
            Kaydet
          </button>
        </main>
      </div>
    </div>
  );
};

export default AdminEdit;
