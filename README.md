# Template Builder

### How to use plugin
```
** Solution 1: Build Package (Style Not Effect) **
1. Run Command
    ```
    yarn add vue-template-builder
    ```
2. Run Command
    ```
    yarn dev
    ```
    or
    ```
    npm install
    ```
3. Setup nuxt.config.js file
    ```
    plugins: [
        { src: '~/plugins/<filename>', ssr: false }
    ]
    ```
4. Import Package to plugin file
    ```
    import Builder from 'vue-template-builder/src/main'

    Builder
    ```
5. Use Component
    ```
    <div id="builder" />
    ```


** Solution 2: Git Repo (Style Effect) **
1. Add Dependencies in package.json
    ```
    "vue-template-builder": "git+ssh://git@bitbucket.org:3dsinteractive/pam-builder.git"
    ```
2. Run Command
    ```
    $ npm install vue-template-builder --save
    ```
3. Crate .env file
    ```
    NODE_ENV=development
    VUE_APP_TITLE=Builder
    VUE_APP_ECOM_CMS_API=<Base URL API image storage>
    VUE_APP_ADMIN_USERNAME=<Username for access to image storage>
    VUE_APP_ADMIN_PASSWORD=<Password for access to image storage>

    optionnal
    VUE_APP_BASE_URL=<Base URL API image storage>
    VUE_APP_TOKEN_IMAGE_STORAGE=<Token for access to image storage>
    ```
4. Import Component in main.ts or main.js
    ```
    import 'vue-template-builder/src/plugins/Index.ts'
    ```
5. Use Component
    ```
    <BuilderTemplate>....</BuilderTemplate>
    ```

* remark: If you update code, You must run command `yarn build:lib` and then push your code to git.
```

## How to Build Package (Self Reminder)
```
1. Setup package.json
2. Setup tsconfig.json
3. Run Command
    ```
    yarn build:ts
    ```
4. Register https://www.npmjs.com/
5. [Your Project Plugin] npm login and type username, password, email
6. Run Command (Every publish must be change version)
    ```
    npm publish
    ```
* remark: [Unpublish version] Run npm unpublish <package>@<version>
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
