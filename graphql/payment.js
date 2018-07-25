const definition = `
    type Payment {
        id: ID,
        accountId: ID,
        account: [Account]
    }
    `;

const resolvers = {};

module.exports = {
    definition,
    resolvers
};