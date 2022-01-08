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
  getClasses: () => Promise.resolve()
});

function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAdmins = async () => {
    try {
      const admins = await axios.get('/users/role/admin');
      dispatch({
        type: 'LIST_ADMIN',
        payload: {
          admins
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

  const getUsers = async () => {
    try {
      const users = await axios.get('/users');
      dispatch({
        type: 'LIST_USER',
        payload: {
          users
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
      const classes = await axios.get('/classes');
      dispatch({
        type: 'LIST_CLASSES',
        payload: {
          classes
        }
      });
    } catch (error) {
      dispatch({
        type: 'LIST_CLASSES',
        payload: {
          classes: []
        }
      });
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        await getClasses();
        await getAdmins();
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

    initialize();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        getAdmins,
        getClasses,
        getUsers
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
