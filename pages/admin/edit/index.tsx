import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';

const AdminEdit: React.FC = () => {
  const [homeData, setHomeData] = useState({
    headerText: '',
    descriptionText: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    image6: '',
    image7: '',
    image8: '',
    leftText: '',
    rightText: '',
  });

  useEffect(() => {
    const storedHomeData = JSON.parse(localStorage.getItem('homeData') || '{}');
    setHomeData(storedHomeData);
  }, []);

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
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Admin Panel</h2>
        <nav className="flex-grow">
          <ul className="p-4 space-y-4">
            <li>
              <Link href="/admin/home" className="hover:text-gray-300">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link href="/admin/meals" className="hover:text-gray-300">
                Yemekler
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
              <Link href="/admin/video" className="hover:text-gray-300">
                Videolarım
              </Link>
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
      <div className="flex-grow bg-gray-100">
        {/* Navbar */}
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-5 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">Ana Sayfa Düzenleme</h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/admin/home" className="hover:underline flex items-center">
                    <UserIcon className="h-6 w-6 text-white" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Edit Content */}
        <main className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-black">Ana Sayfa Düzenleme</h2>

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

          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div className="mb-4" key={num}>
              <label className="block text-sm font-medium text-black">{`Görsel ${num}`}</label>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, `image${num}`)}
                className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
              />
            </div>
          ))}

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Kaydet
          </button>
        </main>
      </div>
    </div>
  );
};

export default AdminEdit;
