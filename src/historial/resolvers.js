import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allPrestamos: (_) => 
			getRequest(URL, 'GET'),
		prestamoById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createPrestamo: (_, { prestamo }) =>
			generalRequest(`${URL}`, 'POST', prestamo),
		updatePrestamo: (_, { id, prestamo }) =>
			generalRequest(`${URL}/${id}`, 'PATCH', prestamo),
		deletePrestamo: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;