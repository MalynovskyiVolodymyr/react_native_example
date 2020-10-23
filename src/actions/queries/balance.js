import gql from "graphql-tag";

function getUserBalance(token){
  console.log('in query', token);
  return {
    mutation: gql `
    mutation Balance($token:String){
      balance(token: $token){
        address
        available
        effective       
      }
    }
  `, variables: {token}
  };
}

export default {getUserBalance}