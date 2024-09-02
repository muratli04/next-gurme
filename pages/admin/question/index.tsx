import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UserIcon,
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

export default function AdminFaq() {
  const [faqData, setFaqData] = useState<{ question: string; answer: string; active: boolean }[]>([]);

  useEffect(() => {
    const storedFaqData = JSON.parse(localStorage.getItem('faqData') || '[]');
    setFaqData(storedFaqData);
  }, []);

  const handleInputChange = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedFaqData = [...faqData];
    updatedFaqData[index][field] = value;
    setFaqData(updatedFaqData);
  };

  const handleToggleActive = (index: number) => {
    const updatedFaqData = [...faqData];
    updatedFaqData[index].active = !updatedFaqData[index].active;
    setFaqData(updatedFaqData);
  };

  const addFaq = () => {
    setFaqData([...faqData, { question: '', answer: '', active: true }]);
  };

  const removeFaq = (index: number) => {
    const updatedFaqData = faqData.filter((_, i) => i !== index);
    setFaqData(updatedFaqData);
  };

  const handleSave = () => {
    localStorage.setItem('faqData', JSON.stringify(faqData));
    alert('Sorular ve Cevaplar başarıyla güncellendi!');
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
      <div className="flex-grow">
        {/* Navbar */}
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-5 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">Sıkça Sorulan Sorular</h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/admin/home" className="hover:underline flex items-center">
                    <UserIcon className="h-6 w-6 text-white rounded-lg" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* FAQ Content */}
        <main className="p-8 bg-gray-100 min-h-screen">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Soruları ve Cevapları Yönet</h2>

            {faqData.map((faq, index) => (
              <div key={index} className="mb-4">
                <label htmlFor={`question-${index}`} className="block text-sm font-medium text-gray-700">
                  Soru {index + 1}
                </label>
                <input
                  id={`question-${index}`}
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleInputChange(index, 'question', e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <label htmlFor={`answer-${index}`} className="block text-sm font-medium text-gray-700 mt-2">
                  Cevap {index + 1}
                </label>
                <textarea
                  id={`answer-${index}`}
                  value={faq.answer}
                  onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={() => removeFaq(index)}
                    className="text-red-500"
                  >
                    Kaldır
                  </button>
                  <button
                    onClick={() => handleToggleActive(index)}
                    className={`py-1 px-3 rounded ${faq.active ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  >
                    {faq.active ? 'Aktif' : 'Pasif'}
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addFaq}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all mb-4"
            >
              Soru ve Cevap Ekle
            </button>

            <button
              onClick={handleSave}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-all"
            >
              Kaydet
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
