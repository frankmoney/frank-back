#### Scripts
- `yarn start` - starts the server (runs `gen schema` first)
- `yarn deploy prisma` - deploys data model to prisma server (::= `prisma deploy` with proper env)
- `yarn gen prisma` - generates schema and types for prisma server
- `yarn gen schema` - generates schema file from source tree
- `yarn lint` - runs linters
- `yarn lint-fix` - runs linters in write mode
- `yarn prettier` - runs prettier with `--list-different` flag
- `yarn prettier-fix` - runs prettier with `--write` flag

#### Git hooks
- `pre-commit` - via `lint-staged` 1) runs prettier with `--write-flag` 2) runs `tslint` 3) runs `gen schema` 4) runs `git add` (to add prettier-formatted files)

#### Dev flow
- pull latest
- make changes to `prisma/datamodel.graphql`
- run `prisma deploy` to update shared prisma instance
- run `yarn gen prisma` to update `app/generated/prisma.*` files
- make changes in `app/graphql` schema and/or resolvers
- run `yarn gen schema` to update `app/generated/schema.graphql`
- run/commit/push changes to repo
