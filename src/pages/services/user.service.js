import axios from '../../utils/axios';

export const getAllUser = async () => {
  const users = await axios.get('/users');
  return users;
};
export const getUserByRole = async (role) => {
  const users = await axios.get(`/users/role/${role}`);
  return users;
};

export const createAdminAccount = async (account) => {
  try {
    const response = await axios.post('/users/admin/create', {
      ...account,
      role: 'admin'
    });
    return response;
  } catch (err) {
    return { err: err.message };
  }
};
