import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}`;

const resolvers = {
	Query: {
		allLogin: (_) => 
			getRequest(URL,"GetUsers"),
		loginById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createLogin: (_, { login }) =>
			generalRequest(`${URL}/CreateUser`, 'POST', login),
		updateLogin: (_, { id, login }) =>
			generalRequest(`${URL}/${id}`, 'PATCH', login),
		deleteLogin: (_, { id }) =>
			generalRequest(`${URL}/DeleteUser/${id}`, 'DELETE')
	}
};

export default resolvers;