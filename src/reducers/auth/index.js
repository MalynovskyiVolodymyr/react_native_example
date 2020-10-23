
const initialState = {
  isLoggedIn: true,
  hasSkippedLogin: false,
  hasPassedWalkthrough: false,
  hasPressedSingupButton: false,
  id: null,
  name: null,
  userToken: null,
  loginData: null,
  registerData: null,
  loading: false,
  loginError: null,
  registerError: null
};

// Actions
const SKIPPED_LOGIN = 'AuthState/SKIP';
const LOGIN_NEXTSTEP = 'AuthState/NEXTSTEP';
const LOGGED_IN = 'AuthState/LOGGED_IN';
const PASSED_WALKTHROUGH = 'AuthState/PASSED_WALKTHROUGH';
const LOGGED_OUT = 'AuthState/LOGGED_OUT';


// Action creators
// export function loggedIn(userData) {
//   return {
//     type: LOGGED_IN,
//     payload: userData,
//   };
// }
//
// export function skipLogin(data) {
//   return {
//     type: SKIPPED_LOGIN
//   };
// }
//
// export function authNextStep(){
//   return {
//     type: LOGIN_NEXTSTEP
//   }
// }
//
// export function passedWalkthrough() {
//   return {
//     type: PASSED_WALKTHROUGH,
//   };
// }
//
// export function loggedOut() {
//   return {
//     type: LOGGED_OUT,
//   };
// }

const ACTION_LOGIN = 'ACTION_LOGIN';
const ACTION_LOGIN_SUCCESS = 'ACTION_LOGIN_SUCCESS';
const ACTION_LOGIN_FAILED = 'ACTION_LOGIN_FAILED';
const ACTION_REGISTER = 'ACTION_REGISTER';
const ACTION_REGISTER_SUCCESS = 'ACTION_REGISTER_SUCCESS';
const ACTION_REGISTER_FAILED = 'ACTION_REGISTER_FAILED';

// Reducer
export default function AuthStateReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_LOGIN:
          return {...state, loading: true, loginError: null, loginData: null  };
        case ACTION_LOGIN_SUCCESS:
          return {...state, loading: false, loginData: action.data, loginError: null };
        case ACTION_LOGIN_FAILED:
          if(action.data.message && !action.data.graphQLErrors.length){
            return {...state, loading: false, loginError: action.data.message, loginData: null };
          }else{
            return {...state, loading: false, loginError: action.data.graphQLErrors[0].message, loginData: null };
          }
        case ACTION_REGISTER:
          return {...state, loading: true, registerError: null, registerData: null };
        case ACTION_REGISTER_SUCCESS:
          return {...state, loading: false, registerData: action.data, registerError: null };
        case ACTION_REGISTER_FAILED:
          if(action.data.message && !action.data.graphQLErrors.length){
            return {...state, loading: false, registerError: action.data.message, registerData: null };
          }else{
            return {...state, loading: false, registerError: action.data.graphQLErrors[0].message, registerData: null };
          }
        // case LOGGED_IN:
        //   return Object.assign({}, state, {
        //     hasPassedWalkthrough: state.hasPassedWalkthrough,
        //     isLoggedIn: true,
        //     id: action.data.id,
        //     name: action.data.name,
        //     userToken: action.data.userToken,
        //   });
        // case SKIPPED_LOGIN:
        //   return Object.assign({}, state, {
        //     isLoggedIn: true,
        //     hasSkippedLogin: true,
        //     id: null,
        //     name: null,
        //     hasPassedWalkthrough: state.hasPassedWalkthrough,
        //   });
        // case PASSED_WALKTHROUGH:
        //   return Object.assign({}, state, {
        //     isLoggedIn: true,
        //     hasSkippedLogin: false,
        //     id: null,
        //     name: null,
        //     hasPassedWalkthrough: true,
        //   });
        // case LOGGED_OUT:
        //   return Object.assign({}, state, {
        //     isLoggedIn: true,
        //     hasSkippedLogin: false,
        //     loggedOut: true,
        //     hasPassedWalkthrough: state.hasPassedWalkthrough,
        //     id: null,
        //     name: null,
        //   });
        default:
          return state;
      }
}
