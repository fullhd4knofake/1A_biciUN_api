import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	usersMutations,
	usersQueries,
	usersTypeDef
} from './users/typeDefs';

import {
	prestamosMutations,
	prestamosQueries,
	prestamosTypeDef
} from './historial/typeDefs';

import {
	loginMutations,
	loginQueries,
	loginTypeDef
} from './login/typeDefs';
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

import usersResolvers from './users/resolvers';
import prestamosResolvers from './historial/resolvers';
import loginResolvers from './login/resolvers';
// import coursesResolvers from './courses/resolvers';
// import gradesResolvers from './grades/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		usersTypeDef,
		prestamosTypeDef,
		loginTypeDef
		// usersTypeDef,
		// coursesTypeDef,
		// gradesTypeDef
	],
	[
		usersQueries,
		prestamosQueries,
		loginQueries
		// usersQueries,
		// coursesQueries,
		// gradesQueries
	],
	[
		usersMutations,
		prestamosMutations,
		loginMutations
		// usersMutations,
		// coursesMutations,
		// gradesMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		usersResolvers,
		prestamosResolvers,
		loginxResolvers
	)
});
