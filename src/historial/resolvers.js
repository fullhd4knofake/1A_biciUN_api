import { generalRequest, getRequest, authToken } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allPrestamos: async (_, { token }) => {
			var response = await authToken(token) //Esperar por la respueseta
			if (response.id)
				return getRequest(URL,"");
			else
				throw "Autenticacion invalida"
		},
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