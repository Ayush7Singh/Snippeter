import {
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_LOAD_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  LOGOUT_USER,
  USER_LOGIN_FAIL,
} from "../constants/user.js";

const initialState = {
  user: {},
  isAuth: false,
  loading : false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOAD_REQUEST:
    case USER_LOGIN_REQUEST:
      case USER_REGISTER_REQUEST:
        return {
          loading: true,
          user: {},
          isAuth: false,
        };
        case USER_LOAD_SUCCESS:
      case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
          return {
            loading: false,
            user: action.payload,
            isAuth: true,
          };
          case USER_LOAD_FAIL:
      case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {
        loading: true,
        isAuth: false,
        user: null,
      };
      case  LOGOUT_USER :
        return {
          isAuth : false,
          loading : true,
          user : null
        }
    default:
      return state;
  }
};