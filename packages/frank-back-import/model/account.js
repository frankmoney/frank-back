import Sequelize from 'sequelize'
import sequelize from './sequelize'

export default sequelize.define('t_account', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    field: 'c_id',
  },
  name: {
    type: Sequelize.STRING,
    field: 'c_name',
  },
  data: {
    type: Sequelize.JSONB,
    field: 'c_data'
  }
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
})
