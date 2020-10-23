import ApolloClient from 'apollo-boost';
var client = null;
try {
   client = new ApolloClient({
    uri: 'your uri go here'
  });
}catch (e) {
  alert('no internet connection');
}

function request(query, type){
  switch(type){
    case 'query':
      return client.query(query);
    case 'mutation':
      return client.mutate(query);
  }

}

export default {request};
