import Bool from '../Bool'
import Date from '../Date'
import DateTime from '../DateTime'
import Float from '../Float'
import ID from '../ID'
import Int from '../Int'
import Json from '../Json'
import ListOf from '../ListOf'
import ListOfNullable from '../ListOfNullable'
import String from '../String'
import Time from '../Time'
import FieldArgumentBuilderType from './FieldArgumentBuilderType'
import FieldArgumentType from './FieldArgumentType'

export default class FieldArgumentBuilder {
  public ofType(type: FieldArgumentType): FieldArgumentBuilderType {
    return new FieldArgumentBuilderType({ type, nullable: false })
  }

  public listOf(itemType: FieldArgumentType): FieldArgumentBuilderType {
    return this.ofType(ListOf(itemType))
  }

  public listOfNullable(itemType: FieldArgumentType): FieldArgumentBuilderType {
    return this.ofType(ListOfNullable(itemType))
  }

  public ofBool(): FieldArgumentBuilderType {
    return this.ofType(Bool)
  }

  public ofDate(): FieldArgumentBuilderType {
    return this.ofType(Date)
  }

  public ofDateTime(): FieldArgumentBuilderType {
    return this.ofType(DateTime)
  }

  public ofFloat(): FieldArgumentBuilderType {
    return this.ofType(Float)
  }

  public ofID(): FieldArgumentBuilderType {
    return this.ofType(ID)
  }

  public ofInt(): FieldArgumentBuilderType {
    return this.ofType(Int)
  }

  public ofJson(): FieldArgumentBuilderType {
    return this.ofType(Json)
  }

  public ofString(): FieldArgumentBuilderType {
    return this.ofType(String)
  }

  public ofTime(): FieldArgumentBuilderType {
    return this.ofType(Time)
  }
}
