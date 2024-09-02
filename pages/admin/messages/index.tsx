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
import { FaHamburger, FaCaravan } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface Message {
  name: string;
  email: string;
  message: string;
}

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(storedMessages);
  }, []);

  const deleteMessage = (index: number) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const replyToMessage = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
  

      <div className="flex flex-grow">
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

        <div className="flex-grow p-8">
          <h1 className="text-3xl text-black font-bold mb-6">Gelen Mesajlar</h1>
          <div className="bg-white shadow-lg rounded-lg p-6">
            {messages.length > 0 ? (
              <ul className="space-y-6">
                {messages.map((message, index) => (
                  <li key={index} className="border-b border-gray-200 pb-4">
                    <h3 className="text-xl text-black font-semibold">{message.name} ({message.email})</h3>
                    <p className="mt-2 text-gray-700">{message.message}</p>
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={() => replyToMessage(message.email)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Yanıtla
                      </button>
                      <button
                        onClick={() => deleteMessage(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Sil
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Gelen mesaj yok.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
