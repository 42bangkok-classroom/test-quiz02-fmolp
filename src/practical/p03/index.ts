import axios from 'axios';
export async function filterUserById(id: number) {
  const API_URL = 'https://jsonplaceholder.typicode.com/users';
  try {
    const response = await axios.get(API_URL);
    const users = response.data;

    if (!Array.isArray(users) || users.length === 0) {
      return "Invalid id";
    }

    const user = users.find((user: any) => user.id === id);

    if (!user) {
      return "Invalid id";
    }

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address
        ? {
            street: user.address.street,
            suite: user.address.suite,
            city: user.address.city,
            zipcode: user.address.zipcode,
            geo: {
              lat: user.address.geo.lat,
              lng: user.address.geo.lng,
            },
          }
        : null,
    };
  } catch (error) {
    return "Invalid id";
  }
}