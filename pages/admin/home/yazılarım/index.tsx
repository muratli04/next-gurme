import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

interface BlogPost {
  title: string;
  content: string;
  image: string;
}

const Yazilarim: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('yazilarimPosts') || '[]') as BlogPost[];
    setPosts(savedPosts);
  }, []);

  const openModal = (post: BlogPost) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white text-black p-4 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Sonradan Gurme</h1>
          <ul className="flex space-x-4 items-center ml-auto">
            <li>
              <Link href="/about" className="hover:text-gray-600">Hakkımda</Link>
            </li>
            <li>
              <Link href="/admin/home/tavsiyelerim" className="hover:text-gray-600">Tavsiyeler</Link>
            </li>
            <li>
              <Link href="/gezi-rehberim" className="hover:text-gray-600">Gezi Rehberim</Link>
            </li>
            <li>
              <Link href="/yazilarim" className="hover:text-gray-600">Yazılarım</Link>
            </li>
            <li>
              <Link href="/admin/home/contacts" className="hover:text-gray-600">İletişim</Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-gray-600 flex items-center">
                <UserIcon className="h-6 w-6" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">Yazılarım</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              onClick={() => openModal(post)}
              className="border border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer"
            >
              {post.image && <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-100">
          <div className="bg-white rounded-lg w-3/4 max-h-screen p-6 overflow-y-auto shadow-lg">
            <button onClick={closeModal} className="absolute top-2 right-2 text-black text-2xl">
              &times;
            </button>
            {selectedPost.image && <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 object-cover mb-4 rounded" />}
            <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
            <div className="text-gray-700 text-lg" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
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
};

export default Yazilarim;
