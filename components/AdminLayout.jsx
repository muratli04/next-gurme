import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div>
      <h1>Admin Paneli</h1>
      <nav>
        <ul>
          <li>
            <Link href="/admin/meals">Yemekler</Link>
          </li>
          <li>
            <Link href="/admin/meals/add">Yemek Ekle</Link>
          </li>
          <li>
            <Link href="/admin/restaurants/add">Restoran Ekle</Link>
          </li>
          <li>
            <Link href="/admin/comments/index">Yorumlar</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
}
