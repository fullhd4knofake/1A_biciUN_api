export const loginTypeDef = `
type Login {
    id: Int!
    email: String!
    password: String!
}

input LoginInput {
    email: String!
    password: String!
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
