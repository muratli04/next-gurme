import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { HomeIcon, PlusCircleIcon, DocumentTextIcon, VideoCameraIcon, PencilSquareIcon, EnvelopeIcon, QuestionMarkCircleIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { FaHamburger } from "react-icons/fa";
import { FaPencil,FaCaravan } from "react-icons/fa6";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface BlogPost {
  title: string;
  content: string;
  image: string;
}

const AdminEditYazilarim: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('yazilarimPosts') || '[]');
    setPosts(savedPosts);
  }, []);

  const handleSave = () => {
    // Base64 resim verilerini kontrol et
    const imageMatch = content.match(/<img.*?src="(data:image\/[^;]+;base64[^"]*)"/);
    const imageUrl = imageMatch ? imageMatch[1] : '';

    let updatedPosts = [...posts];
    const newPost = { title, content, image: imageUrl };
    if (editIndex !== null) {
        updatedPosts[editIndex] = newPost;
    } else {
        updatedPosts.push(newPost);
    }
    setPosts(updatedPosts);
    localStorage.setItem('geziPosts', JSON.stringify(updatedPosts));
    alert('İçerik kaydedildi!');
    setTitle('');
    setContent('');
    setEditIndex(null);
};


  const handleEdit = (index: number) => {
    const post = posts[index];
    setTitle(post.title);
    setContent(post.content);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem('yazilarimPosts', JSON.stringify(updatedPosts));
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'color', 'background', 'align'
  ];

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
            <h1 className="text-2xl font-bold">Yazılarım İçerik Düzenleme</h1>
          </div>
        </header>

        {/* Editor */}
        <main className="p-8">
          <h2 className="text-2xl text-black font-bold mb-4">Yazı İçeriğini Düzenle</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Başlık"
            className="w-full mb-4 p-2 border text-black border-gray-300 rounded"
          />
          <ReactQuill
            value={content}
            onChange={setContent}
            className="h-96 mb-6"
            modules={modules}
            formats={formats}
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-8"
          >
            Kaydet
          </button>

          <h2 className="text-2xl text-black font-bold my-4">Eklenen Yazılar</h2>
          <ul>
            {posts.map((post, index) => (
              <li key={index} className="mb-4 p-4 bg-white rounded shadow">
                <h3 className="text-lg font-bold">{post.title}</h3>
                {post.image && <img src={post.image} alt={post.title} className="max-w-full h-auto rounded mb-2" />}
                <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Sil
                </button>
              </li>
            ))}
          </ul>
        </main>
      </div>

      <style jsx>{`
        .ql-editor {
          color: black; /* Metin rengini siyah yapar */
        }
      `}</style>
    </div>
  );
};

export default AdminEditYazilarim;
