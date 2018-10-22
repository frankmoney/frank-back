import Bool from '../Bool'
import Date from '../Date'
import DateTime from '../DateTime'
import Float from '../Float'
import Id from '../ID'
import Int from '../Int'
import Json from '../Json'
import ListOf from '../ListOf'
import ListOfNullable from '../ListOfNullable'
import String from '../String'
import Time from '../Time'
import InputTypeFieldBuilderType from './InputTypeFieldBuilderType'
import InputTypeFieldType from './InputTypeFieldType'

export default class InputTypeFieldBuilder {
  public ofType(type: InputTypeFieldType): InputTypeFieldBuilderType {
    return new InputTypeFieldBuilderType({ type, nullable: false })
  }

  public listOf(itemType: InputTypeFieldType): InputTypeFieldBuilderType {
    return this.ofType(ListOf(itemType))
  }

  public listOfNullable(
    itemType: InputTypeFieldType
  ): InputTypeFieldBuilderType {
    return this.ofType(ListOfNullable(itemType))
  }

  public ofBool(): InputTypeFieldBuilderType {
    return this.ofType(Bool)
  }

  public ofDate(): InputTypeFieldBuilderType {
    return this.ofType(Date)
  }

  public ofDateTime(): InputTypeFieldBuilderType {
    return this.ofType(DateTime)
  }

  public ofFloat(): InputTypeFieldBuilderType {
    return this.ofType(Float)
  }

  public ofId(): InputTypeFieldBuilderType {
    return this.ofType(Id)
  }

  public ofInt(): InputTypeFieldBuilderType {
    return this.ofType(Int)
  }

  public ofJson(): InputTypeFieldBuilderType {
    return this.ofType(Json)
  }

  public ofString(): InputTypeFieldBuilderType {
    return this.ofType(String)
  }

  public ofTime(): InputTypeFieldBuilderType {
    return this.ofType(Time)
  }
}
