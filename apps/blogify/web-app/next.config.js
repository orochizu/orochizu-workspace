const withPlugins = require('next-compose-plugins')

const env = require('next-env')
const images = require('next-images')
const optimizedImages = require('next-optimized-images')

module.exports = (phase, {defaultConfig}) => {
  return withPlugins([
    env,
    images,
    optimizedImages
  ])
};
