require('dotenv').config();

const config = {
  mongodb: {
    url: process.env.DB_URL,
    databaseName: process.env.DB_NAME,
  },

  migrationsDir: 'src/database/migrations',
  changelogCollectionName: 'changelog',
  lockCollectionName: 'changelog_lock',
  lockTtl: 0,
  migrationFileExtension: '.ts',
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
