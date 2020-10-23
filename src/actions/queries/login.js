import gql from "graphql-tag";

function loginQuery(userName, userPassword){
  return {
    mutation: gql `
    mutation Login($userName:String, $userPassword:String) {
      Login (name: $userName, password: $userPassword){
        id
        name 
        email        
        randomKey 
        userToken  
        lotteryAccount
      }
    }
  `, variables: {userName, userPassword}
  };
}

function registerQuery(userName, userEmail, userPassword){
  return {
    mutation: gql `
    mutation register($userName:String, $userEmail:String, $userPassword:String) {
      register (name: $userName, email: $userEmail, password: $userPassword){
        id
        name 
        email        
        randomKey 
        userToken  
        lotteryAccount
      }
    }
  `, variables: {userName, userEmail, userPassword}
  };
}

export default {loginQuery, registerQuery}

