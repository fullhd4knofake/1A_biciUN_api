export const loginTypeDef = `
type Login {
    token: String!
    id:String!
    date: date!
    // id: Int!
    // name: String!
    // email: String!
    // pass: String!
}

input LoginInput {
    id: String!
    // name: String
    // email: String!
    // pass: String!
}
`;

export const loginQueries = `
    allLogin: [Login]!
    loginById(token: String!): Login!
`;

export const loginMutations = `
    createLogin(login: LoginInput!): Login!
    deleteLogin(id: String!): Login!
    updateLogin(id: String!, login: LoginInput!): Login!
`;
