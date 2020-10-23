import commonService from './commonServices';
import queries from './queries/balance';

const ACTION_BALANCE = 'ACTION_BALANCE';
const ACTION_BALANCE_SUCCESS = 'ACTION_BALANCE_SUCCESS';
const ACTION_BALANCE_FAILED = 'ACTION_BALANCE_FAILED';

function balance(){
  return {
    type: ACTION_BALANCE
  }
}

function balanceSuccess(data){
  return {
    type: ACTION_BALANCE_SUCCESS,
    data
  }
}

function balanceFailed(data){
  return {
    type: ACTION_BALANCE_FAILED,
    data
  }
}

function ActionBalance(token){
  return (dispatch) => {
    dispatch(balance());
    commonService.request(queries.getUserBalance(token), 'mutation')
      .then((response) => {
        console.log('in action balance',response);
        dispatch(balanceSuccess(response))
      })
      .catch((e) => {
        dispatch(balanceFailed(e));
      });
  }
}

export default {ActionBalance};