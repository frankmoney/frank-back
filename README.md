#### Scripts
- `yarn start` - starts the server
- `yarn deploy prisma` - deploys data model to prisma server (::= `prisma deploy` with proper env)
- `yarn gen prisma` - generates schema and types for prisma server
- `yarn gen schema` - generates schema file from source tree
- `yarn lint` - runs linters
- `yarn lint-fix` - runs linters in write mode

#### Dev flow
- pull latest
- make changes to `prisma/datamodel.graphql`
- run `prisma deploy` to update shared prisma instance
- run `yarn gen prisma` to update `app/generated/prisma.*` files
- make changes in `app/graphql` schema and/or resolvers
- run `yarn gen schema` to update `app/generated/schema.graphql`
- run/commit/push changes to repo
