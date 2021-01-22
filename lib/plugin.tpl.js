import Vue from 'vue';
import qs from 'qs';
import Router from 'vue-router';

import routes from '<%- options.path %>/<%- options.fileName %>';

Vue.use(Router);

export function createRouter(ssrContext) {
  return new Router({
    routes,
    fallback: false,
    parseQuery: qs.parse,
    stringifyQuery(query) {
      const queryStr = qs.stringify(query);
      return queryStr ? '?' + queryStr : '';
    },

    // extend `nuxt.config.js` router configs
    ...JSON.parse(`<%= JSON.stringify(options.routerOptions, null, 2) %>`),
  });
}
