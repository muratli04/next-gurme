import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/solid';

// convertToEmbedURL fonksiyonunu tanımlayın
const convertToEmbedURL = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  } else {
    return '';
  }
};

const VideoPage: React.FC = () => {
  const [videoLinks, setVideoLinks] = useState<{ link: string, description: string }[]>([]);
  const [newVideoLink, setNewVideoLink] = useState<string>('');
  const [newVideoDescription, setNewVideoDescription] = useState<string>('');

  useEffect(() => {
    try {
      const storedVideos = JSON.parse(localStorage.getItem('videoLinks') || '[]');
      setVideoLinks(storedVideos);
    } catch (error) {
      console.error('LocalStorage getItem hatası:', error);
    }
  }, []);

  const handleAddVideo = () => {
    if (newVideoLink.trim() !== '' && newVideoDescription.trim() !== '') {
      const embedLink = convertToEmbedURL(newVideoLink);
      const updatedVideos = [...videoLinks, { link: embedLink, description: newVideoDescription }];
      setVideoLinks(updatedVideos);
      try {
        localStorage.setItem('videoLinks', JSON.stringify(updatedVideos));
      } catch (error) {
        console.error('LocalStorage setItem hatası:', error);
      }
      setNewVideoLink('');
      setNewVideoDescription('');
    }
  };

  const handleDeleteVideo = (index: number) => {
    const updatedVideos = videoLinks.filter((_, i) => i !== index);
    setVideoLinks(updatedVideos);
    try {
      localStorage.setItem('videoLinks', JSON.stringify(updatedVideos));
    } catch (error) {
      console.error('LocalStorage setItem hatası:', error);
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
      <div className="flex-grow">
        {/* Navbar */}
        <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-5 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold">Video Yönetimi</h1>
            <nav>
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
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 bg-gray-100 min-h-screen">
          <h2 className="text-2xl font-semibold mb-6">Video Ekle</h2>

          {/* Video Ekleme Formu */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="YouTube Video Linki Ekle"
              value={newVideoLink}
              onChange={(e) => setNewVideoLink(e.target.value)}
              className="p-2 border border-gray-300 rounded mb-2 w-full bg-white text-black"
            />
            <input
              type="text"
              placeholder="Video Açıklaması Ekle"
              value={newVideoDescription}
              onChange={(e) => setNewVideoDescription(e.target.value)}
              className="p-2 border border-gray-300 rounded mb-2 w-full bg-white text-black"
            />
            <button
              onClick={handleAddVideo}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-all"
            >
              Video Ekle
            </button>
          </div>

          {/* Eklenen Videoların Listesi */}
          <div className="flex flex-wrap gap-4">
            {videoLinks.map((video, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-md w-80">
                <iframe
                  width="100%"
                  height="180"
                  src={convertToEmbedURL(video.link)}
                  title={`Video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="text-black mt-2">{video.description}</p>
                <button
                  onClick={() => handleDeleteVideo(index)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-all mt-2"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default VideoPage;
