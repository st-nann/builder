# Template Builder

### How to use plugin

**Solution 1:** *Build Package (Style Not Effect and Include Store)*
1. Run Command
```
yarn add vue-builder-plugin
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
    import Builder from 'vue-builder-plugin/src/main'

    Builder // declare create
```

5. Use Component
```html
    <div
        id="builder"
        ref="builder"
        data-id="builder"
        :data-personalize-baseurl="https://stg-cms.pams.ai/api"
        :data-personalize-token="personalizetoken"
        :data-storage-baseurl="https://stg-ecom.pams.ai/api/backend"
        :data-storage-token="storagetoken"
        :data-prop-template="JSON.stringify(propTemplateJson)"
        @click="onUpdateTemplate"
    />
```

| attribute                              |value    |type      |description                                                                                    |
|----------------------------------------|:-------:|:--------:| --------------------------------------------------------------------------------------------- |
|id                                      |bilder   |`string`  |*for access element*                                                                           |
|ref                                     |up to you|`string`  |*for access result template*                                                                   |
|data-id                                 |up to you|`string`  |*for create element (default: builder). Mutiple element should be setup difference name*       |
|:data-personalize-baseurl (optional)    |up to you|`string`  |*for get personalize* (ex. [GET] `<BASEURL>/customers/attributes`)*                            |
|:data-personalize-token (optional)      |up to you|`string`  |*for access api get personalize*                                                               |
|:data-storage-baseurl                   |up to you|`string`  |*for get or upload image* (ex. [GET] `<BASEURL>/galleries`, [POST] `<BASEURL>/uploader/public`)|
|:data-storage-token                     |up to you|`string`  |*for access api get or upload image*                                                           |
|:data-prop-template (optional)          |up to you|`string`  |*for setup default prop your template json*                                                    |
|@click="<YOUR_FUNCTION_NAME>" (optional)|up to you|`function`|*for get result on function*                                                                   |
<br>

6. Access Result Template
```javascript
    JSON.parse(this.$refs.<REF_NAME>.dataset.resultTemplate)
```
<br>

**Solution 2:** *Git Repo (Style Effect and Exclude Store)*
1. Add Dependencies in package.json
```json
    "vue-builder-plugin": "git+ssh://git@bitbucket.org:3dsinteractive/pam-builder.git"
```

2. Run Command
```
yarn add vue-builder-plugin
```
or
```
npm install vue-builder-plugin --save
```

3. Create .env file
```
NODE_ENV=development
VUE_APP_TITLE=Builder
VUE_APP_BASE_URL_PERSONALIZE=<Base URL API text personalize>
VUE_APP_BASE_URL_STORAGE=<Base URL API image storage>
VUE_APP_ADMIN_USERNAME=<Username for access to image storage>
VUE_APP_ADMIN_PASSWORD=<Password for access to image storage>
```

4. Import Component in main.ts or main.js
```javascript
    import Components from 'vue-builder-plugin/src/plugins/Index.ts'

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
* remark: [Unpublish version] Run `npm unpublish <PACKAGE_NAME>@<VERSION>` such as `npm unpublish vue-builder-plugin@0.0.1`
* remark: [Deprecate version] Run `npm deprecate -f <PACKAGE_NAME>@<VERSION> '<REASON>'` such as `npm deprecate -f vue-builder-plugin@0.0.1 'Have New Version'`
* remark: [Add User NPM for Delete Package] Run `npm owner add npm <PACKAGE_NAME>` such as `npm owner add npm vue-builder-plugin`
* remark: [Delete Your User of Package] Run `npm owner rm <USER> <PACKAGE_NAME>` such as `npm owner rm username vue-builder-plugin`
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
