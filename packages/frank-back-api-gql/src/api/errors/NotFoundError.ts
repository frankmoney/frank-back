export const throwNotFound = (message?: string) => {
  throw new Error(message || 'Not Found')
}

export const notFoundError = () => new Error('Not Found')
