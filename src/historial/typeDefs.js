export const prestamosTypeDef = `
type Prestamo {
    id: Int!
    user_id: Int!
    bici_id: Int!
    solicitud: String
}

input PrestamoInput {
    user_id: Int!
    bici_id: Int!
    solicitud: String
}
`;

export const prestamosQueries = `
    allPrestamos: [Prestamo]!
    prestamoById(id: Int!): Prestamo!
`;

export const prestamosMutations = `
    createPrestamo(prestamo: PrestamoInput!): Prestamo!
    deletePrestamo(id: Int!): Prestamo!
    updatePrestamo(id: Int!, Prestamo: PrestamoInput!): Prestamo!
`;
