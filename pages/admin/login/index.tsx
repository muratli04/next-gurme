import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Giriş İşlemi
  const handleLogin = (e) => {
    e.preventDefault();

    // Varsayılan olarak basit bir doğrulama
    if (email === 'admin@gmail.com' && password === '123456') {
      // Eğer doğru giriş yapıldıysa admin bilgilerini localStorage'a kaydet
      const adminInfo = {
        name: 'Murat Atlı',
        email: 'admin@gmail.com',
        role: 'Sistem Yöneticisi',
      };
      localStorage.setItem('adminInfo', JSON.stringify(adminInfo));

      // Admin paneline yönlendirme
      router.push('/admin');
    } else {
      alert('Hatalı giriş bilgileri. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Girişi</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">E-posta</label>
            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Şifre</label>
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-all"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
