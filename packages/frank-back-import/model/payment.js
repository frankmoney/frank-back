import Sequelize from 'sequelize'
import sequelize from './sequelize'

export default sequelize.define('t_payment', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: 'c_id',
  },
  accountId: {
    type: Sequelize.BIGINT,
    field: 'c_account_id',
  },
  sourceId: {
    type: Sequelize.BIGINT,
    field: 'c_source_id',
  },
  categoryId: {
    type: Sequelize.BIGINT,
    field: 'c_category_id',
  },
  peerId: {
    type: Sequelize.BIGINT,
    field: 'c_peer_id',
  },
  amount: {
    type: Sequelize.NUMERIC,
    field: 'c_amount',
  },
  postedOn: {
    type: Sequelize.DATEONLY,
    field: 'c_posted_on',
  },
  peerName: {
    type: Sequelize.STRING,
    field: 'c_peer_name',
  },
  description: {
    type: Sequelize.TEXT,
    field: 'c_description',
  },
  verified: {
    type: Sequelize.BOOLEAN,
    field: 'c_verified',
  },
  pending: {
    type: Sequelize.BOOLEAN,
    field: 'c_pending',
  },
  data: {
    type: Sequelize.JSONB,
    field: 'c_data',
  },
  descriptionUpdaterId: {
    type: Sequelize.BIGINT,
    field: 'c_description_updater_id',
  },
  peerUpdaterId: {
    type: Sequelize.BIGINT,
    field: 'c_peer_updater_id',
  },
  categoryUpdaterId: {
    type: Sequelize.BIGINT,
    field: 'c_category_updater_id',
  },
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
})
