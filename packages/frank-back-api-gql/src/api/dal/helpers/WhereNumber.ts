import WhereNumberBase from './WhereNumberBase'

export default interface WhereNumber extends WhereNumberBase {
  or?: WhereNumber | WhereNumber[]
  and?: WhereNumber | WhereNumber[]
}
