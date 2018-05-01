export const usersTypeDef = `
type User {
    id: Int!
    name: String!
    lastname: String!
    id_code: Int!
    email: String!
    id_type: String!
}

input UserInput {
    name: String!
    lastname: String!
    id_code: Int!
    email: String!
    id_type: String!
}
`;

export const usersQueries = `
    allUsers(token: String!): [User]!
    userById(id: Int!): User!
`;

export const usersMutations = `
    createUser(token: String!, user: UserInput!): User!
    deleteUser(id: Int!): User!
    updateUser(id: Int!, user: UserInput!): User!
`;
