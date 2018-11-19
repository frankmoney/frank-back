export const throwForbidden = () => {
  throw new Error('Forbidden')
}

export const forbiddenError = () => new Error('Forbidden')
