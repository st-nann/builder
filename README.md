# Template Builder

### How to use plugin

**Solution 1:** *Build Package (Style Not Effect and Include Store)*
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
npm run dev
```

3. Setup nuxt.config.js file (only nuxt.js)
```json
    "plugins": [
        { "src": "~/plugins/<filename>", "ssr": false }
    ]
```

4. Import Package to main.ts or main.js file
```javascript
    import Builder from 'vue-template-builder/src/main'

    Builder // declare create
```

5. Use Component
```html
    <div
        id="builder"
        ref="builder"
        data-id="builder"
        :data-prop-template="JSON.stringify(propTemplateJson)"
        @click="onUpdateTemplate"
    />
```

| attribute                              |value    |type      |description                                                                             |
|----------------------------------------|:-------:|:--------:| -------------------------------------------------------------------------------------- |
|id                                      |bilder   |`string`  |*for access element*                                                                    |
|ref                                     |up to you|`string`  |*for access result template*                                                            |
|data-id                                 |up to you|`string`  |*for create element (default: builder). Mutiple element should be setup difference name*|
|:data-prop-template (optional)          |up to you|`string`  |*for setup default prop your template json*                                             |
|@click="<YOUR_FUNCTION_NAME>" (optional)|up to you|`function`|*for get result on function*                                                            |
<br>

6. Access Result Template
```javascript
    JSON.parse(this.$refs.<REF_NAME>.dataset.resultTemplate)
```
<br>

**Solution 2:** *Git Repo (Style Effect and Exclude Store)*
1. Add Dependencies in package.json
```json
    "vue-template-builder": "git+ssh://git@bitbucket.org:3dsinteractive/pam-builder.git"
```

2. Run Command
```
yarn add vue-template-builder
```
or
```
npm install vue-template-builder --save
```

3. Create .env file
```
NODE_ENV=development
VUE_APP_TITLE=Builder
VUE_APP_ECOM_CMS_API=<Base URL API image storage>
VUE_APP_ADMIN_USERNAME=<Username for access to image storage>
VUE_APP_ADMIN_PASSWORD=<Password for access to image storage>

[optionnal]
VUE_APP_BASE_URL=<Base URL API image storage>
VUE_APP_TOKEN_IMAGE_STORAGE=<Token for access to image storage>
```

4. Import Component in main.ts or main.js
```javascript
    import Components from 'vue-template-builder/src/plugins/Index.ts'

    Vue.use(Components)
```
5. Use Component
```html
    <BuilderTemplate></BuilderTemplate>
```

### How to Build and Publish Package (Self Reminder)
1. Setup package.json (Change version)
2. Setup tsconfig.json
3. Run Command
```
yarn build:ts
```
or
```
npm run build:ts
```
4. Register [NPM](https://www.npmjs.com)
5. [In Your Project Plugin] npm login and type username, password, email
6. Run Command (Every publish must be change version in package.json)
```
npm publish
```
* remark: [Unpublish version] Run `npm unpublish <PACKAGE_NAME>@<VERSION>` such as `vue-template-builder@0.0.1`
<br>

### Project setup
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn dev
```

#### Compiles and minifies for production
```
yarn build
```

#### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
