import axios from 'axios';
import { get } from 'http';
const API_URL = 'https://jsonplaceholder.typicode.com/users';
export async function getPostalAddress() {
  try {
    const response = await axios.get(API_URL);
    const users = response.data;

    if (!Array.isArray(users) || users.length === 0) {
      return [];
    }

    return users.map((user: any) => ({
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
    }));
  } catch (error) {
    return [];
  }
}