import createResolver from 'utils/createResolver'

export default createResolver(({ args, prisma, info }) => prisma.query.teams(args, info))
