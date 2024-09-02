import React from 'react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  return (
    <nav className="bg-white text-black p-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">Sonradan Gurme</h1>
      <ul className="flex space-x-4 items-center">
        <li>
          <Link href="/about" className="hover:text-gray-600 text-black">Hakkımda</Link>
        </li>
        <li>
          <Link href="/tavsiyeler" className="hover:text-gray-600 text-black">Tavsiyeler</Link>
        </li>
        <li>
          <Link href="/gezi-rehberim" className="hover:text-gray-600 text-black">Gezi Rehberim</Link>
        </li>
        <li>
          <Link href="/yazilarim" className="hover:text-gray-600 text-black">Yazılarım</Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-gray-600 text-black">İletişim</Link>
        </li>
        <li>
          <Link href="/admin/login" className="hover:text-gray-600 flex items-center text-black">
            <UserIcon className="h-6 w-6" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
