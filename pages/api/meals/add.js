import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Dosya yükleme hatası' });
    }
    
    const { name, description, restaurant } = req.body;
    const image = req.file; // Yüklenen dosya burada

  
    res.status(201).json({ message: 'Yemek başarıyla eklendi.' });
  });
};

export default handler;
