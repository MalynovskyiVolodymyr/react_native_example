
const initialState = {
  loading: false,
  balanceError: false,
  userBalance: null
};

const ACTION_BALANCE = 'ACTION_BALANCE';
const ACTION_BALANCE_SUCCESS = 'ACTION_BALANCE_SUCCESS';
const ACTION_BALANCE_FAILED = 'ACTION_BALANCE_FAILED';
const WAVES = 100000000;

// Reducer
export default function BalanceStateReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_BALANCE:
      return {...state, loading: true, balanceError: false};
    case ACTION_BALANCE_SUCCESS:
      console.log('in balance success reducer ', action.data);
      return {...state, loading: false, userBalance: action.data, balanceError: false};
    case ACTION_BALANCE_FAILED:
      console.log('error in balance reduser ', action.data);
      return {...state, loading: false, balanceError: true};
  }
  return state;

}
