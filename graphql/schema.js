import {makeExecutableSchema} from 'graphql-tools'

import {definition as AccountDefinition, resolvers as AccountResolvers} from './account'
import {definition as PaymentDefinition, resolvers as PaymentResolvers} from './payment'

const SchemaDefinition = `type Query`;

module.exports = makeExecutableSchema({
    typeDefs: [SchemaDefinition, AccountDefinition, PaymentDefinition],
    resolvers: [AccountResolvers, PaymentResolvers],
});