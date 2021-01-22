import { RouterOptions } from 'vue-router';

export interface RouterModule {
  path?: string;
  fileName?: string;
  routerOptions?: RouterOptions;
}

declare module '@nuxt/types' {
  interface Configuration {
    routerModule?: RouterModule;
    'router-module'?: RouterModule;
  }
}
