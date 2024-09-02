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
  import { FaHamburger,FaCaravan } from "react-icons/fa";
  import { FaPencil } from "react-icons/fa6";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

interface SocialMediaLink {
  id: number;
  platform: string;
  url: string;
}

const SocialMediaAdmin: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);
  const [newLink, setNewLink] = useState({ platform: '', url: '' });

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem('socialLinks') || '[]');
    setSocialLinks(storedLinks);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLink((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLink = () => {
    const updatedLinks = [...socialLinks, { id: Date.now(), ...newLink }];
    setSocialLinks(updatedLinks);
    localStorage.setItem('socialLinks', JSON.stringify(updatedLinks));
    setNewLink({ platform: '', url: '' });
  };

  const handleDeleteLink = (id: number) => {
    const updatedLinks = socialLinks.filter((link) => link.id !== id);
    setSocialLinks(updatedLinks);
    localStorage.setItem('socialLinks', JSON.stringify(updatedLinks));
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
      <div className="flex-grow bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Sosyal Medya Yönetimi</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-black">Yeni Sosyal Medya Hesabı Ekle</h2>
          <input
            type="text"
            name="platform"
            placeholder="Platform Adı"
            value={newLink.platform}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
          />
          <input
            type="url"
            name="url"
            placeholder="Platform URL"
            value={newLink.url}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
          />
          <button onClick={handleAddLink} className="bg-blue-500 text-white py-2 px-4 rounded">Ekle</button>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-black">Mevcut Sosyal Medya Hesapları</h2>
          <ul className="space-y-4">
            {socialLinks.map((link) => (
              <li key={link.id} className="flex justify-between items-center p-4 border border-gray-300 rounded bg-white">
                <span className="text-black">{link.platform}: {link.url}</span>
                <button onClick={() => handleDeleteLink(link.id)} className="text-red-500 hover:underline">Sil</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAdmin;
