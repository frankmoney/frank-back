import createResolver from '../utils/createResolver'

const createTeamResolver = (name: string) =>
  createResolver(name, async ({ scope }) => {})
