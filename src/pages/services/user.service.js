import axios from '../../utils/axios';

export const getAllUser = async () => {
  const users = await axios.get('/users');
  return users;
};
export const getUserByRole = async (role) => {
  const users = await axios.get(`/users/role/${role}`);
  return users;
};
