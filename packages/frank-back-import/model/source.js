import Sequelize from 'sequelize'
import sequelize from './sequelize'

export default sequelize.define('t_source', {
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
  },
  accountId: {
    type: Sequelize.BIGINT,
    field: 'c_account_id',
  },
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
  getterMethods: {
    userGuid() {
      return this.data && this.data.userGuid;
    }
  },
})
