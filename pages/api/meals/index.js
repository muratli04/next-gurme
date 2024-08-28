let meals = []; // Geçici olarak yemekler bellekte saklanacak

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Yemekleri listeleme işlemi
    res.status(200).json(meals);
  } else if (req.method === 'POST') {
    // Yeni yemek ekleme işlemi
    const { name, description, restaurant, image } = req.body;

    const newMeal = {
      id: meals.length + 1, // Yemek ID'si
      name,
      description,
      restaurant,
      image,
    };

    meals.push(newMeal); // Yemeği listeye ekliyoruz
    res.status(201).json(newMeal);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
