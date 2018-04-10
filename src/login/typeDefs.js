export const loginTypeDef = `
type Login {
    id: Int!
    name: String!
    email: String!
    pass: String!
}

input LoginInput {
    name: String!
    pass: String!
}
`;

export const loginQueries = `
    allLogin: [Login]!
    loginById(id: Int!): Login!
`;

export const loginMutations = `
    createLogin(login: LoginInput!): Login!
    deleteLogin(id: Int!): Login!
    updateLogin(id: Int!, Login: LoginInput!): Login!
`;
