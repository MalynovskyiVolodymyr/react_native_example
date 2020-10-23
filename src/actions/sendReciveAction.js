import commonService from './commonServices';
import queries from './queries/sendRecive';

const ACTION_SEND_TOKEN = 'ACTION_SEND_TOKEN';
const ACTION_SEND_TOKEN_SUCCESS = 'ACTION_SEND_TOKENE_SUCCESS';
const ACTION_SEND_TOKEN_FAILED = 'ACTION_SEND_TOKEN_FAILED';

function sendToken(){
  return {
    type: ACTION_SEND_TOKEN
  }
}

function sendTokenSuccess(data){
  return {
    type: ACTION_SEND_TOKEN_SUCCESS,
    data
  }
}

function sendTokenFailed(data){
  return {
    type: ACTION_SEND_TOKEN_FAILED,
    data
  }
}

function ActionSendToken(recipient, token, amount){
  return (dispatch) => {
    dispatch(sendToken());
    commonService.request(queries.sendReciveQuery(recipient, token, amount), 'mutation')
      .then((response) => {
        console.log('in action sendTokenSuccess',response);
        dispatch(sendTokenSuccess(response))
      })
      .catch((e) => {
        dispatch(sendTokenFailed(e));
      });
  }
}

export default {ActionSendToken};