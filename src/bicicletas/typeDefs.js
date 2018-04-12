export const bicicletasTypeDef = `
type Bicicleta {
    serial: Int!
    marca: String
    color: String
    ubicacion: String
    estado: String
}

input BicicletaInput {
    serial: Int!
    marca: String!
    color: String!
    ubicacion: String!
    estado: String!
}

input BicicletaInputEdit {
    ubicacion: String!
    estado: String!
}
`;

export const bicicletasQueries = `
    allBicicletas: [Bicicleta]!
    bicicletaById(serial: Int!): Bicicleta!
`;

export const bicicletasMutations = `
    createBicicleta(bicicleta: BicicletaInput!): Bicicleta!
    deleteBicicleta(serial: Int!): Bicicleta!
    updateBicicleta(serial: Int!, bicicleta: BicicletaInputEdit!): Bicicleta!
`;
