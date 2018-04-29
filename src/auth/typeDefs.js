export const authTypeDef = `
    type Auth {
        id: String!
        password: String!
        answer: String!
    }
    input AuthInput {
        id: String!
        password: String!
    }
`;

export const authMutations = `
    auth(auth: AuthInput!): Auth!
`;