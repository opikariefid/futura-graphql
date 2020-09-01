const express           = require('express');
const { graphqlHTTP }   = require('express-graphql');
const { buildSchema }   = require('graphql');

var app = express()

let userData = [
    { id: '1', title: 'Taufik', idPek:'1'},
    { id: '2', title: 'Galuh', idPek:'2'},
    { id: '3', title: 'Ilham', idPek:'3'},
    { id: '4', title: 'Fadli', idPek:'5'},
    { id: '5', title: 'Izzat', idPek:'4'},
    { id: '6', title: 'Rendy', idPek:'5'},
]

let jobData = [
    { id: '1', title: 'Backend Developers'},
    { id: '2', title: 'Project Manager'},
    { id: '3', title: 'Frontend Developers'},
    { id: '4', title: 'Deployment'},
    { id: '5', title: 'UI/UX'},
]

let schema = buildSchema(`
        type User {
            id: ID,
            title: String
            job: Job
        }
        type Job {
            id: ID,
            title: String
        }
        type Query{
            job(id: ID!): Job,
            jobs: [Job],
            user(id: ID!): User,
            users: [User]
        }
        type Mutation{
            addUser(id: ID, title: String) : User
        }
    `);

let resolver = {
    user: (args) => {
        let _user = userData.find(el => el.id == args.id)
        let _job = jobData.find(el => el.id == _user.idPek)
        _user['job'] = _job
        return _user
    },
    users: () => userData,
    job: (args) => {
        return jobData.find(el => el.id == args.id)
    },
    jobs: () => jobData,

    addUser: ({id, title}) => {
        let _newUser = { id: id, title: title}
        userData.push(_newUser)
        return _newUser
    }
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}))

app.listen(4000, ()=> console.log('Running a GraphQL API server at http://localhost:4000/graphql'))
