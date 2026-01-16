import axios from 'axios';

type newUser = {
  name: string;
  username?: string;
  email?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  } | null;
  phone: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
export async function addUser(newUser: newUser | null) {
  const API_URL = 'https://jsonplaceholder.typicode.com/users';
  try {
    const response = await axios.get(API_URL);
    const users = response.data;

    if (!Array.isArray(users) || users.length === 0) {
      return [];
    }

    if (newUser === null) {
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
    }

    const lastUser = users[users.length - 1];
    const newUserId = lastUser.id + 1;
    const newUserData = {
      id: newUserId,
      name: newUser.name || null,
      phone: newUser.phone || null,
      address:
        newUser.address !== null && newUser.address !== undefined
          ? {
              street: newUser.address.street || null,
              suite: newUser.address.suite || null,
              city: newUser.address.city || null,
              zipcode: newUser.address.zipcode || null,
              geo:
                newUser.address.geo !== null && newUser.address.geo !== undefined
                  ? {
                      lat: newUser.address.geo.lat || null,
                      lng: newUser.address.geo.lng || null,
                    }
                  : null,
            }
          : null,
    };

    return [...users, newUserData];
  } catch (error) {
    return [];
  }
}