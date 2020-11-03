const withPlugins = require('next-compose-plugins');

const env = require('next-env');
const images = require('next-images');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([env, images, optimizedImages]);
