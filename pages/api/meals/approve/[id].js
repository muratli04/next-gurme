import meals from '../index'; // Yemek listesini içe aktar

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'POST') {
    const mealIndex = meals.findIndex(meal => meal.id === parseInt(id));
    if (mealIndex !== -1) {
      meals[mealIndex].approved = true; // Yemeği onayla
      res.status(200).json({ message: 'Yemek onaylandı.' });
    } else {
      res.status(404).json({ message: 'Yemek bulunamadı.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
