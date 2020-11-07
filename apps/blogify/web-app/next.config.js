const withPlugins = require('next-compose-plugins');

const dotenvLoad = require('dotenv-load');
const env = require('next-env');
const images = require('next-images');
const optimizedImages = require('next-optimized-images');

dotenvLoad();

module.exports = withPlugins([
  env({ publicPrefix: 'NX_PUBLIC_', serverPrefix: 'NX_SERVER_' }),
  images,
  optimizedImages,
]);
