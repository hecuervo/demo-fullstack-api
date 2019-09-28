/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('data_base', {
    id_data_base: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    policy_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statecode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    county: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eq_site_limit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hu_site_limit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fl_site_limit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fr_site_limit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tiv_2011: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tiv_2012: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eq_site_deductible: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hu_site_deductible: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fl_site_deductible: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fr_site_deductible: {
      type: DataTypes.STRING,
      allowNull: true
    },
    point_latitude: {
      type: DataTypes.STRING,
      allowNull: true
    },
    point_longitude: {
      type: DataTypes.STRING,
      allowNull: true
    },
    line: {
      type: DataTypes.STRING,
      allowNull: true
    },
    construction: {
      type: DataTypes.STRING,
      allowNull: true
    },
    point_granularity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'data_base',
    timestamps: false
  });
};
