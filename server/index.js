const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express');

const database = require('./database')

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || 'localhost'

const typeDefs = gql`
  type Pin { title: String!, link: String!, image: String!, id: Int! }
  type Query { pins: [Pin] }
`

const resolvers = {
  Query: {
    pins: async () => {
      const pins = await database('pins').select()
      return pins
    },
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

const app = express()

server.applyMiddleware({app});


app.listen(PORT, () => {
  console.log(`Go to http://${HOST}:${PORT}${server.graphqlPath} to run queries!`)
})