import gql from "graphql-tag";

function sendReciveQuery(recipientId, token, amount){

  return {
    mutation: gql `
    mutation SendToken($recipientId: ID, $token: String, $amount: Float){
      sendTokens(recipientId: $recipientId, token: $token, amount:$amount){
         type
         error
      }
    }
  `, variables: {recipientId, token, amount}
  };
}

export default {sendReciveQuery}