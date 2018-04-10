'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	
	const PATH = "";
	if(path && path.length > 0)
		PATH = `/${path}`;

	const queryUrl = addParams(`${url}${PATH}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const usersTypeDef = `
type User {
    id: Int!
    name: String!
    lastname: String!
    id_code: Int!
    email: String!
    id_type: String!
}

input UserInput {
    name: String!
    lastname: String!
    id_code: Int!
    email: String!
    id_type: String!
}
`;

const usersQueries = `
    allUsers: [User]!
    userById(id: Int!): User!
`;

const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(id: Int!): User!
    updateUser(id: Int!, user: UserInput!): User!
`;

const prestamosTypeDef = `
type Prestamo {
    id: Int!
    student_id: Int!
    bici_id: Int!
    solicitud: String
}

input PrestamoInput {
    student_id: Int!
    bici_id: Int!
    solicitud: String
}

input PrestamoInputEdit {
    student_id: Int
    bici_id: Int
    solicitud: String
}
`;

const prestamosQueries = `
    allPrestamos: [Prestamo]!
    prestamoById(id: Int!): Prestamo!
`;

const prestamosMutations = `
    createPrestamo(prestamo: PrestamoInput!): Prestamo!
    deletePrestamo(id: Int!): Prestamo!
    updatePrestamo(id: Int!, prestamo: PrestamoInputEdit!): Prestamo!
`;

const profilePicturesTypeDef = `
type ProfilePicture {
    id: Int!
    Student: Int!
    Url: String
}
`;

const profilePicturesQueries = `
    allProfilePictures: [ProfilePicture]!
    profilePictureById(id: Int!): ProfilePicture!
`;

const url = process.env.USERS_URL || 'users-ms';
const port = process.env.USERS_PORT || '3001';
const entryPoint = process.env.USERS_ENTRY || 'users';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allUsers: (_) =>
			getRequest(URL, ''),
		userById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL}`, 'POST', user),
		updateUser: (_, { id, user }) =>
			generalRequest(`${URL}/${id}`, 'PUT', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

var _url = process.env.PRESTAMOS_URL;
var _port = process.env.PRESTAMOS_PORT;
var _entryPoint = process.env.PRESTAMOS_ENTRY;

console.log(`http://${_url}:${_port}/${_entryPoint}`);

const url$1 = _url ? _url : 'localhost';
const port$1 = _port ? _port : '3002';
const entryPoint$1 = _entryPoint ? _entryPoint : "prestamos";

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$1 = {
	Query: {
		allPrestamos: (_) => 
			getRequest(URL$1,""),
		prestamoById: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'GET'),
	},
	Mutation: {
		createPrestamo: (_, { prestamo }) => {
			console.log(prestamo);
			return generalRequest(`${URL$1}`, 'POST', prestamo);
		},
		updatePrestamo: (_, { id, prestamo }) =>{
			console.log(prestamo);
			return generalRequest(`${URL$1}/${id}`, 'PATCH', prestamo);
		},
		deletePrestamo: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'DELETE')
	}
};

// export const url = process.env.PRESTAMOS_URL || 'localhost';
// export const port = process.env.PRESTAMOS_PORT || '3002';
// export const entryPoint = process.env.PRESTAMOS_ENTRY || 'prestamos';
const url$2 = 'localhost';
const port$2 = '3003';
const entryPoint$2 = "profilepictures";

const URL$2 = `http://${url$2}:${port$2}/${entryPoint$2}`;

const resolvers$2 = {
	Query: {
		allProfilePictures: (_) => 
			getRequest(URL$2,""),
		profilePictureById: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'GET'),
	}
};

/* import {
	coursesMutations,
	coursesQueries,
	coursesTypeDef
} from './courses/typeDefs';

import {
	gradesMutations,
	gradesQueries,
	gradesTypeDef
} from './grades/typeDefs'; */

// import coursesResolvers from './courses/resolvers';
// import gradesResolvers from './grades/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		usersTypeDef,
		prestamosTypeDef,
		profilePicturesTypeDef
		// usersTypeDef,
		// coursesTypeDef,
		// gradesTypeDef
	],
	[
		usersQueries,
		prestamosQueries,
		profilePicturesQueries
		// usersQueries,
		// coursesQueries,
		// gradesQueries
	],
	[
		usersMutations,
		prestamosMutations
		// usersMutations,
		// coursesMutations,
		// gradesMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$2
	)
});

const app = new Koa();
const router = new KoaRouter();
// Aqui se coloca el puerto en el que aparecera GraphiQL
const PORT = process.env.PORT || 4500;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
