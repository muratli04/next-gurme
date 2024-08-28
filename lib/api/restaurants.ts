let restaurants = [];

export const addRestaurant = (restaurantData) => {
  const restaurant = {
    id: Date.now().toString(),
    name: restaurantData.get('name'),
    city: restaurantData.get('city'),
    image: restaurantData.get('image'), // Görseli burada kaydediyoruz
  };
  restaurants.push(restaurant);
};

export const getRestaurants = () => {
  return restaurants;
};
