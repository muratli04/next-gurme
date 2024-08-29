import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Yorum ekleme işlemi
    const { yemekId, yorum } = req.body;

    try {
      const yeniYorum = await prisma.yorum.create({
        data: {
          yemekId: yemekId,
          yorum: yorum,
          onayli: false, // Onaylanmadığı için varsayılan olarak false
        },
      });

      res.status(200).json({ message: 'Yorum başarıyla eklendi', yeniYorum });
    } catch (error) {
      res.status(500).json({ message: 'Yorum eklenirken hata oluştu' });
    }
  } else if (req.method === 'GET') {
    // Tüm onaylanmış yorumları getir
    const { yemekId } = req.query;
    try {
      const yorumlar = await prisma.yorum.findMany({
        where: {
          yemekId: Number(yemekId),
          onayli: true, // Sadece onaylanmış yorumlar gösterilsin
        },
      });

      res.status(200).json(yorumlar);
    } catch (error) {
      res.status(500).json({ message: 'Yorumlar alınırken hata oluştu' });
    }
  } else {
    res.status(405).json({ message: 'Yalnızca POST ve GET istekleri destekleniyor.' });
  }
}
