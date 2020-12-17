# Template Builder

### How to use plugin
```
1. Add Dependencies in package.json
    "vue-template-builder": "git+ssh://git@bitbucket.org:3dsinteractive/pam-builder.git"
2. Run Command
    $ npm install vue-template-builder --save
3. Crate .env file
    NODE_ENV=development
    VUE_APP_TITLE=Builder
    VUE_APP_ECOM_CMS_API=<Base URL API image storage>
    VUE_APP_ADMIN_USERNAME=<Username for access to image storage>
    VUE_APP_ADMIN_PASSWORD=<Password for access to image storage>

    optionnal
    VUE_APP_BASE_URL=<Base URL API image storage>
    VUE_APP_TOKEN_IMAGE_STORAGE=<Token for access to image storage>
4. Import Component in main.ts or main.js
    import 'vue-template-builder/src/plugins/Index.ts'
5. Use Component
    <Component>....</Component>

* remark: If you update code, You must run command `yarn build:lib` and then push your code to git.
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
