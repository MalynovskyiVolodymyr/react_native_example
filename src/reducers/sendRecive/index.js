
const initialState = {
  loading: false,
  sendReciveError: false,
  sendReviceResult: null
};

const ACTION_SEND_TOKEN = 'ACTION_SEND_TOKEN';
const ACTION_SEND_TOKEN_SUCCESS = 'ACTION_SEND_TOKENE_SUCCESS';
const ACTION_SEND_TOKEN_FAILED = 'ACTION_SEND_TOKEN_FAILED';

// Reducer
export default function SendReviceReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_SEND_TOKEN:
      return {...state, loading: true, sendReciveError: false };
    case ACTION_SEND_TOKEN_SUCCESS:
      console.log('in sendReviceResult success reducer ', action.data);
      return {...state, loading: false, sendReviceResult: action.data, sendReciveError: false };
    case ACTION_SEND_TOKEN_FAILED:
      console.log('error in sendReviceResult reduser ', action.data);
      return {...state, loading: false, sendReciveError: true };
    default:
      return state;
  }
}
