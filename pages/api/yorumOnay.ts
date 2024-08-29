export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
      const { yorumId } = req.body;
  
      try {
        await prisma.yorum.update({
          where: { id: yorumId },
          data: { onayli: true },
        });
        res.status(200).json({ message: 'Yorum onaylandı' });
      } catch (error) {
        res.status(500).json({ message: 'Yorum onaylanırken hata oluştu' });
      }
    }
  }
  