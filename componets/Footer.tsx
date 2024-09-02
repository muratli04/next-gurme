import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

interface FooterProps {
  facebookLink?: string;
  twitterLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
  youtubeLink?: string;
}

const Footer: React.FC<FooterProps> = ({ facebookLink, twitterLink, instagramLink, linkedinLink, youtubeLink }) => {
  return (
    <footer className="bg-gray-800 text-white mt-8 p-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          {facebookLink && (
            <Link href={facebookLink} target="_blank" className="text-white hover:text-gray-400">
              <FaFacebookF />
            </Link>
          )}
          {twitterLink && (
            <Link href={twitterLink} target="_blank" className="text-white hover:text-gray-400">
              <FaTwitter />
            </Link>
          )}
          {instagramLink && (
            <Link href={instagramLink} target="_blank" className="text-white hover:text-gray-400">
              <FaInstagram />
            </Link>
          )}
          {linkedinLink && (
            <Link href={linkedinLink} target="_blank" className="text-white hover:text-gray-400">
              <FaLinkedinIn />
            </Link>
          )}
          {youtubeLink && (
            <Link href={youtubeLink} target="_blank" className="text-white hover:text-gray-400">
              <FaYoutube />
            </Link>
          )}
        </div>
        <div>
          <p className="text-sm">&copy; 2024 Sonradan Gurme. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
