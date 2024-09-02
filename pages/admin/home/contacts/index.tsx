import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface SliderData {
  image1: string;
  image2: string;
  image3: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({ name: '', email: '', message: '' });
  const [sliderData, setSliderData] = useState<SliderData>({
    image1: '/slider1.jpg',
    image2: '/slider2.jpg',
    image3: '/slider3.jpg',
  });

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedSliderData = JSON.parse(localStorage.getItem('sliderData') || '{}');
    if (storedSliderData) {
      setSliderData(storedSliderData);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const updatedMessages = [...existingMessages, formData];
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    alert('Mesajınız iletildi!');
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
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
            <Link href="/admin/home/blog1" className="hover:text-gray-600">Gezi Rehberim</Link>
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

      {/* Slider */}
      <div className="slider-container mt-4 overflow-hidden relative" style={{ height: '430px', marginLeft: '5cm', marginRight: '4cm' }}>
        <div ref={sliderRef} className="slider flex transition-transform duration-300 ease-in-out overflow-x-scroll">
          <img src={sliderData.image1} alt="Slider Image 1" className="w-full h-auto flex-shrink-0" />
          <img src={sliderData.image2} alt="Slider Image 2" className="w-full h-auto flex-shrink-0" />
          <img src={sliderData.image3} alt="Slider Image 3" className="w-full h-auto flex-shrink-0" />
        </div>
        <button onClick={() => scrollSlider('left')} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">{"<"}</button>
        <button onClick={() => scrollSlider('right')} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">{">"}</button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8 flex" style={{ marginLeft: '5cm', marginRight: '4cm' }}>
        <div className="w-2/3 p-4">
          <h2 className="text-2xl font-bold mb-4 text-black">Bize Ulaşın</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-black">Adınız Soyadınız</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-black">E-posta Adresiniz</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-black">Mesajınız</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded text-black"
                rows={5}
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Gönder</button>
          </form>
        </div>

        <div className="w-1/3 p-4">
          <img src="/contact-image.jpg" alt="Contact Us" className="w-full h-auto rounded-lg" />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-8 p-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex space-x-4 mb-4">
            <Link href="/about" className="hover:text-gray-400">Hakkımda</Link>
            <Link href="/admin/home/tavsiyelerim" className="hover:text-gray-400">Tavsiyeler</Link>
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

export default Contact;
