# nuxt-router-enum

## Features

Using enums anywhere which is more advanced than typescript enum

## Installation

```bash
$ npm install nuxt-router-enum
```

## Setup

1. module configuration

```javascript
// nuxt.config.js
export default {
  modules: [
    [
      'nuxt-router-enum',
      {
        /* module options */
      },
    ],
  ],

  // or
  enum: {
    /* module options */
    path: '~/enums',
    fileName: 'index.js',
  },
};
```

2. enums configuration

```javascript
// ~/enums/index.js

export default {
  FOO: [
    {
      key: 'FOO_KEY_1',
      text: 'foo text 1',
      value: 1,
    },
    {
      key: 'FOO_KEY_2',
      text: 'foo text 2',
      value: 2,
    },
  ],
};
```

## Usage

## Options

- `path`
  > Location of your route file
  - Type: `string`
  - Default: `~`
- `fileName`

  > File name of your routes configuration in `path`
  > Must export valid Vue routes

  - Type: `string`
  - Default: `index.js`

- `routerOptions`
  > Same as `vue-router` router options
