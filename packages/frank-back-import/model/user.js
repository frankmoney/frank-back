import Sequelize from 'sequelize'
import sequelize from './sequelize'

export default sequelize.define('t_user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    field: 'c_id',
  },
  name: {
    type: Sequelize.STRING,
    field: 'c_name',
  },
  typeId: {
    type: Sequelize.BIGINT,
    field: 'c_type_id',
  },
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
})
