export const throwNotFound = (message?: string) => {
  throw new Error(message || 'Not Found')
}
