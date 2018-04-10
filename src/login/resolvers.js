import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allLogin: (_) => 
			getRequest(`${URL}show`,""),
		loginById: (_, { id }) =>
			generalRequest(`${URL}show/${id}`, 'GET'),
	},
	Mutation: {
		createLogin: (_, { login }) =>
			generalRequest(`${URL}login`, 'POST', login),
		updateLogin: (_, { id, login }) =>
			generalRequest(`${URL}update/${id}`, 'PATCH', login),
		deleteLogin: (_, { id }) =>
			generalRequest(`${URL}delete/${id}`, 'DELETE')
	}
};

export default resolvers;