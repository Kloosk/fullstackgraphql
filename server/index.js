const express = require('express');
const app = express();
const PORT = 5555;
const cors = require('cors');
const userData = require("../data/user.json");
const {graphqlHTTP} = require('express-graphql');
const graphql = require('graphql');
const {GraphQLObjectType , GraphQLSchema ,GraphQLString ,GraphQLID, GraphQLInt ,GraphQLList , GraphQLNonNull} =graphql;


app.use(cors());

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        user:{
            type: UserType,
            args:{id:{type: GraphQLID}},
            resolve (parent,args){
                return userData.find(user => user.id == args.id);
            }
        },
        users:{
            type: new GraphQLList(UserType),
            resolve (parent,args){
                return userData
            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser: {
            type: UserType,
            args: {
                firstName: {type :GraphQLString},
                age: {type : GraphQLInt},
            },
            resolve(parent , args){
                userData.push({id: 44, firstName: args.firstName, age: args.age});
                return {firstName: args.firstName, age: args.age};
            }
        }
    }
});

const schema = new GraphQLSchema({query: RootQuery,mutation: Mutation});

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen(PORT,() => {
   console.log("Server running on PORT: " + PORT);
});
