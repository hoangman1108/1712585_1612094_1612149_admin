import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from '../utils/axios';

const initialState = {
  users: [],
  admins: [],
  classes: []
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { users, admins, classes } = action.payload;
    return {
      ...state,
      users,
      admins,
      classes
    };
  },
  LIST_ADMIN: (state, action) => {
    const { admins } = action.payload;

    return {
      ...state,
      admins
    };
  },
  CREATE_ADMIN: (state, action) => {
    const { admin } = action.payload;

    return {
      ...state,
      admins: [...state.admins, admin]
    };
  },
  DELETE_ADMIN: (state, action) => {
    const { email } = action.payload;
    const newAdmins = state.admins.filter((element) => element.email !== email);
    return {
      ...state,
      admins: [...newAdmins]
    };
  },
  LIST_USER: (state, action) => {
    const { users } = action.payload;

    return {
      ...state,
      users
    };
  },
  UPDATE_USER: (state, action) => {
    const { user } = action.payload;
    const newUsers = [...state.users];
    const index = newUsers.findIndex((element) => element.email === user.email);
    newUsers[index] = user;
    return {
      ...state,
      users: [...newUsers]
    };
  },
  LIST_CLASS: (state, action) => {
    const { classes } = action.payload;
    return {
      ...state,
      classes
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const DashboardContext = createContext({
  ...initialState,
  getAdmins: () => Promise.resolve(),
  getUsers: () => Promise.resolve(),
  createAdmin: () => Promise.resolve(),
  deleteAdmin: () => Promise.resolve(),
  getClasses: () => Promise.resolve()
});

function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAdmins = async () => {
    try {
      const { data } = await axios.get('/users/role/admin');
      dispatch({
        type: 'LIST_ADMIN',
        payload: {
          admins: data
        }
      });
    } catch (error) {
      dispatch({
        type: 'LIST_ADMIN',
        payload: {
          admins: []
        }
      });
    }
  };

  const createAdmin = async (account) => {
    try {
      const { data } = await axios.post('/users/admin/create', {
        ...account,
        role: 'admin'
      });
      dispatch({
        type: 'CREATE_ADMIN',
        payload: { admin: data }
      });
      return 'CREATE_SUCCESS';
    } catch (err) {
      return {
        error: err.message
      };
    }
  };

  const deleteAdmin = async (email) => {
    try {
      await axios.post('/users/admin/delete', {
        email
      });
      dispatch({
        type: 'DELETE_ADMIN',
        payload: { email }
      });
    } catch (err) {
      dispatch({
        type: 'DELETE_ADMIN',
        payload: { email: null }
      });
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get('users/admin/all-user');
      dispatch({
        type: 'LIST_USER',
        payload: {
          users: data
        }
      });
    } catch (error) {
      dispatch({
        type: 'LIST_USER',
        payload: {
          users: []
        }
      });
    }
  };

  const getClasses = async () => {
    try {
      const { data } = await axios.get('/classes');
      console.log('response: ', data);
      dispatch({
        type: 'LIST_CLASS',
        payload: {
          classes: data
        }
      });
    } catch (error) {
      dispatch({
        type: 'LIST_CLASS',
        payload: {
          classes: []
        }
      });
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        await getAdmins();
        await getUsers();
        await getClasses();
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            users: [],
            classes: [],
            admins: []
          }
        });
      }
    };

    setTimeout(() => {
      initialize();
    }, 300);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        getAdmins,
        getClasses,
        getUsers,
        deleteAdmin,
        createAdmin
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

DashboardProvider.propTypes = {
  children: PropTypes.node
};

export { DashboardContext, DashboardProvider };
