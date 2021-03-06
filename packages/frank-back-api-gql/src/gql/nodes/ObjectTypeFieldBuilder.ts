import Bool from '../Bool'
import Date from '../Date'
import DateTime from '../DateTime'
import Float from '../Float'
import Id from '../Id'
import Int from '../Int'
import Json from '../Json'
import ListOf from '../ListOf'
import ListOfNullable from '../ListOfNullable'
import String from '../String'
import Time from '../Time'
import ObjectTypeFieldBuilderType from './ObjectTypeFieldBuilderType'
import ObjectTypeFieldType from './ObjectTypeFieldType'

export default class ObjectTypeFieldBuilder {
  public ofType(type: ObjectTypeFieldType): ObjectTypeFieldBuilderType {
    return new ObjectTypeFieldBuilderType({ type, nullable: false })
  }

  public listOf(itemType: ObjectTypeFieldType): ObjectTypeFieldBuilderType {
    return this.ofType(ListOf(itemType))
  }

  public listOfNullable(
    itemType: ObjectTypeFieldType
  ): ObjectTypeFieldBuilderType {
    return this.ofType(ListOfNullable(itemType))
  }

  public ofBool(): ObjectTypeFieldBuilderType {
    return this.ofType(Bool)
  }

  public ofDate(): ObjectTypeFieldBuilderType {
    return this.ofType(Date)
  }

  public ofDateTime(): ObjectTypeFieldBuilderType {
    return this.ofType(DateTime)
  }

  public ofFloat(): ObjectTypeFieldBuilderType {
    return this.ofType(Float)
  }

  public ofId(): ObjectTypeFieldBuilderType {
    return this.ofType(Id)
  }

  public ofInt(): ObjectTypeFieldBuilderType {
    return this.ofType(Int)
  }

  public ofJson(): ObjectTypeFieldBuilderType {
    return this.ofType(Json)
  }

  public ofString(): ObjectTypeFieldBuilderType {
    return this.ofType(String)
  }

  public ofTime(): ObjectTypeFieldBuilderType {
    return this.ofType(Time)
  }

  public listOfId(): ObjectTypeFieldBuilderType {
    return this.listOf(Id)
  }

  public listOfDateTime(): ObjectTypeFieldBuilderType {
    return this.listOf(DateTime)
  }

  public listOfDate(): ObjectTypeFieldBuilderType {
    return this.listOf(Date)
  }
}
