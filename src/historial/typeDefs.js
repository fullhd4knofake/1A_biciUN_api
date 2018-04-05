export const historialTypeDef = `
type Prestamo {
    id: Int!
    student_id: Int!
    bici_id: Int!
    solicitud: String
}

input PrestamoInput {
    student_id: Int!
    bici_id: Int!
    solicitud: String!
}
`;

export const historialQueries = `
    allPrestamos: [Prestamo]!
    prestamoById(id: Int!): Prestamo!
`;

export const historialMutations = `
    createPrestamo(prestamo: PrestamoInput!): Prestamo!
    deletePrestamo(id: Int!): Prestamo!
    updatePrestamo(id: Int!, prestamo: PrestamoInput!): Prestamo!
`;
