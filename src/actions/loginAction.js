import commonService from './commonServices';
import queries from './queries/login';

const ACTION_LOGIN = 'ACTION_LOGIN';
const ACTION_LOGIN_SUCCESS = 'ACTION_LOGIN_SUCCESS';
const ACTION_LOGIN_FAILED = 'ACTION_LOGIN_FAILED';

function login(){
  return {
    type: ACTION_LOGIN
  }
}

function loginSuccess(data){
  return {
    type: ACTION_LOGIN_SUCCESS,
    data
  }
}

function loginFailed(data){
  return {
    type: ACTION_LOGIN_FAILED,
    data
  }
}

const ACTION_REGISTER = 'ACTION_REGISTER';
const ACTION_REGISTER_SUCCESS = 'ACTION_REGISTER_SUCCESS';
const ACTION_REGISTER_FAILED = 'ACTION_REGISTER_FAILED';

function register(){
  return {
    type: ACTION_REGISTER
  }
}

function registerSuccess(data){
  return {
    type: ACTION_REGISTER_SUCCESS,
    data
  }
}

function registerFailed(data){
  return {
    type: ACTION_REGISTER_FAILED,
    data
  }
}

function ActionLogin(username, password){
  return (dispatch) => {
    dispatch(login());
    commonService.request(queries.loginQuery(username, password), 'mutation')
      .then((response) => {
        dispatch(loginSuccess(response))
      })
      .catch((e) => {
        console.log('in login action error => ', e);
        dispatch(loginFailed(e));
      });
  }
}

function ActionRegister(username, useremail, password){
  return (dispatch) => {
    dispatch(register());
    commonService.request(queries.registerQuery(username, useremail, password), 'mutation')
      .then((response) => {
        dispatch(registerSuccess(response))
      })
      .catch((e) => {
        dispatch(registerFailed(e));
      });
  }
}

export default {ActionLogin, ActionRegister};