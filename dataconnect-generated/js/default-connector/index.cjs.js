const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'RPG-Game',
  location: 'southamerica-east1'
};

exports.connectorConfig = connectorConfig;
