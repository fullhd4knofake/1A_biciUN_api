import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allBicicletas: (_) => 
			getRequest(URL,""),
		bicicletaById: (_, { serial }) =>
			generalRequest(`${URL}/${serial}`, 'GET'),
	},
	Mutation: {
		createBicicleta: (_, { bicicleta }) =>
			generalRequest(`${URL}/create`, 'POST', bicicleta),
		updateBicicleta: (_, { serial, bicicleta }) => 
			generalRequest(`${URL}/edit/${serial}`, 'PATCH', bicicleta),
		deleteBicicleta: (_, { serial }) =>
			generalRequest(`${URL}/delete/${serial}`, 'DELETE')
	}
};

export default resolvers;