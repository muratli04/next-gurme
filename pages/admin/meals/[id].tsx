import { useState } from 'react';

export default function YemekDetay({ yemek }) {
  const [yorum, setYorum] = useState('');
  const [yorumlar, setYorumlar] = useState([]);

  const yorumEkle = async () => {
    if (yorum.trim()) {
      try {
        const response = await fetch('/api/yorumlar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            yemekId: yemek.id,
            yorum: yorum,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setYorumlar([...yorumlar, data.yeniYorum]);
          setYorum('');
        } else {
          console.error('Yorum eklenirken hata oluştu');
        }
      } catch (error) {
        console.error('Sunucu hatası:', error);
      }
    }
  };

  return (
    <div>
      <h1>{yemek.ad}</h1>
      <p>{yemek.aciklama}</p>

      {/* Yorumlar */}
      <div>
        <h2>Yorumlar</h2>
        {yorumlar.length === 0 ? (
          <p>Henüz yorum yok.</p>
        ) : (
          yorumlar.map((yorum, index) => <p key={index}>{yorum.yorum}</p>)
        )}

        <textarea
          value={yorum}
          onChange={(e) => setYorum(e.target.value)}
          placeholder="Yorumunuzu buraya yazın"
          rows={4}
        ></textarea>
        <button onClick={yorumEkle}>Yorum Ekle</button>
      </div>
    </div>
  );
}
