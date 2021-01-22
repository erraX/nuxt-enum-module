const { resolve } = require('path');

module.exports = function (moduleOptions) {
  const options = {
    ...this.options['router-module'],
    ...this.options.routerModule,
    ...moduleOptions,
  };

  // Add plugin to import router file path as the main template for routing
  this.addPlugin({
    src: resolve(__dirname, 'plugin.tpl.js'),
    fileName: 'router.js',
    options: {
      path: options.path || '~',
      fileName: options.fileName || 'index.js',
      routerOptions: options.routerOptions || {},
    },
  });

  // Disable parsing `pages/`
  this.nuxt.hook('build:before', () => {
    this.nuxt.options.build.createRoutes = () => [];
  });
};
