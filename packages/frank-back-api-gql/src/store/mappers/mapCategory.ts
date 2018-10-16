import { category } from '../names'
import Category from '../types/Category'
import Mapper from './Mapper'
import map from './map'

const mapCategory: Mapper<Category> = map<Category>()
  .from(category)
  .extend()
  .for('name', x => x.name)
  .for('color', x => x.color)
  .for('accountId', x => x.accountId)
  .build()

export default mapCategory
