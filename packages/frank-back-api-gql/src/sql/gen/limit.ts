import { fragment, literal, parameter } from '../ast'

const limit = ({ take, skip }: { take?: number; skip?: number }) => {
  if (take === undefined) {
    if (skip === undefined) {
      return fragment([])
    }
    return fragment([literal('limit all offset '), parameter(skip)])
  } else if (skip === undefined) {
    return fragment([literal('limit '), parameter(take)])
  } else {
    return fragment([
      literal('limit '),
      parameter(take),
      literal('offset '),
      parameter(skip),
    ])
  }
}

export default limit
