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
		prestamoById: async (_, { token, id }) => {
			var response = await authToken(token) //Esperar por la respueseta
			if (response.id)
				return generalRequest(`${URL}/${id}`, 'GET');
			else
				throw "Autenticacion invalida"
		},
		/* prestamoById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'), */
	},
	Mutation: {
		createPrestamo: async (_, { token, prestamo }) => {
			var response = await authToken(token) //Esperar por la respueseta
			if (response.id)
				return generalRequest(`${URL}`, 'POST', prestamo);
			else
				throw "Autenticacion invalida"
		},
		updatePrestamo: async (_, { token, id, prestamo }) => {
			var response = await authToken(token) //Esperar por la respueseta
			if (response.id)
				return generalRequest(`${URL}/${id}`, 'PATCH', prestamo);
			else
				throw "Autenticacion invalida"
		},
		deletePrestamo: async (_, { token, id }) => {
			var response = await authToken(token) //Esperar por la respueseta
			if (response.id)
				return generalRequest(`${URL}/${id}`, 'DELETE');
			else
				throw "Autenticacion invalida"
		}
		/* deletePrestamo: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE') */
	}
};

export default resolvers;