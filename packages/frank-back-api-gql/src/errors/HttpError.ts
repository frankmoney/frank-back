export const httpError = (response: Response) => {
  return new Error(`${response.status} ${response.statusText}`)
}
