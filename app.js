const express = require('express');
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');

const app = express();

app.use(express.json());

app.use('graphql',graphqlHttp({
   schema: buildSchema(`
      type RootQuery {
         
      }
      
      type RootMutation{
      
      }
      
      schema {
         query: RootQuery
         mutation: RootMutation
      }
   `),
   rootValue: {}
}));


app.listen(3000, () => {
   console.log("Server is running on PORT: 3000");
});

