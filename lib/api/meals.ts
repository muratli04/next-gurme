let meals = [];

export const addMeal = (mealData) => {
  const meal = {
    id: Date.now().toString(),
    name: mealData.get('name'),
    description: mealData.get('description'),
    restaurant: mealData.get('restaurant'),
    image: mealData.get('image') // Görsel verisini burada sakla
  };
  meals.push(meal);
};

export const getMeals = () => {
  return meals;
};
