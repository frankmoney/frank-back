import WhereStringBase from './WhereStringBase'

export default interface WhereString extends WhereStringBase {
  or?: WhereString | WhereString[]
  and?: WhereString | WhereString[]
}
