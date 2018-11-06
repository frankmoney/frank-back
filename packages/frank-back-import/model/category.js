import Sequelize from 'sequelize'
import sequelize from './sequelize'

export default sequelize.define('t_category', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    field: 'c_id',
  },
  name: {
    type: Sequelize.STRING,
    field: 'c_name',
  },
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
})
