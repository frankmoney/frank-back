const definition = `
    type Account {
        id: ID,
        name: String,
        teamId: ID,
        payments: [Payment]
    }
    
    extend type Query {
        accounts: [Account]
    }
    `;

const resolvers = {
    Query: {
        accounts: () => [{id: 13}]
    },
    Account: {
        name: () => 'TEST FAKE NAME',
        payments: () => [{id: 1}]
    }
};

module.exports = {
    definition,
    resolvers
};