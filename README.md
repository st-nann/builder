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

3. Setup Data To Local Storage
```javascript

    get storageBaseUrl() {
        return <YOUR_STORAGE_BASEURL>
    }

    get storageToken() {
        return <YOUR_PERSONALIZE_TOKEN>
    }

    [Optional]
    get personalizeBaseUrl() {
        return <YOUR_PERSONALIZE_BASEURL>
    }

    get personalizeToken() {
        return <YOUR_PERSONALIZE_TOKEN>
    }

    created() {
        if (process.client) {
            localStorage['storage-baseurl'] = this.storageBaseUrl
            localStorage['storage-token'] = this.storageToken

            [Optional]
            localStorage['personalize-baseurl'] = this.personalizeBaseUrl
            localStorage['personalize-token'] = this.personalizeToken
        }
    }
```
<br>

| attribute                              |value                     |type      |description                                                                                   |
|----------------------------------------|:------------------------:|:--------:| -------------------------------------------------------------------------------------------- |
|storageBaseUrl                          |up to you                 |`string`  |*for get or upload image* (ex. [GET] `<BASEURL>/galleries`, [POST] `<BASEURL>/uploader/public`|
|storageToken                            |up to you                 |`string`  |*for access api get or upload image*                                                          |
|personalizeBaseUrl (optional)           |up to you                 |`string`  |*for get personalize* (ex. [GET] `<BASEURL>/customers/attributes`)*                           |
|personalizeToken (optional)             |up to you                 |`string`  |*for access api get personalize*                                                              |

4. Import Module And Create Instance Vue Component
```javascript
    [Vue]
    mounted() {
        const builder: any = require('~/node_modules/vue-builder-plugin/src/plugins/Module')
        const store =  builder.default.store
        const router = builder.default.router
        const self = this
        this.builder = new Vue({
            router,
            store,
            render: (h) =>
                h(builder.default.component, {
                    props: { propTemplateJson: this.propTemplateJson },
                    on: {
                        change(templateJson: any) {
                            self.$emit('change', (templateJson && !_.isEmpty(templateJson) ? templateJson : {}))
                        }
                    }
                })
        }).$mount(`#${this.id}`)
    }

    [Nuxt.js]
    mounted() {
        if (process.client) {
            const builder: any = require('~/node_modules/vue-builder-plugin/src/plugins/Module')
            const store =  builder.default.store
            const router = builder.default.router
            const self = this
            this.builder = new Vue({
                router,
                store,
                render: (h) =>
                    h(builder.default.component, {
                        props: { propTemplateJson: this.propTemplateJson },
                        on: {
                            change(templateJson: any) {
                                self.$emit('change', (templateJson && !_.isEmpty(templateJson) ? templateJson : {}))
                            }
                        }
                    })
            }).$mount(`#${this.id}`)
        }
    }
```

| attribute                              |value                     |type      |description                                                                                   |
|----------------------------------------|:------------------------:|:--------:| -------------------------------------------------------------------------------------------- |
|id                                      |up to you                 |`string`  |*for create element (default: builder). Mutiple element should be setup difference name*      |
|store                                   |-                         |-         |*for use store in builder component module*                                                   |
|router                                  |-                         |-         |*for use router in builder component module*                                                  |
|propTemplateJson                        |up to you                 |`object`  |*for setup default prop your template json (pass to builder module)*                          |
|this.builder                            |up to you                 |`any`     |*for save vue instance data (parameter in your component)*                                    |
|render                                  |-                         |`function`|*for render component*                                                                        |
|change(templateJson: any)               |-                         |`function`|*for pass updated data from child (module component) to parent (your component) component*    |
|.$mount(`#${this.id}`)                  |-                         |-         |*for create instance vue*                                                                     |
<br>

5. Use Component
```html
    <div id="builder" />
```

| attribute                              |value                     |type      |description                                                                                   |
|----------------------------------------|:------------------------:|:--------:| -------------------------------------------------------------------------------------------- |
|id                                      |up to you                 |`string`  |*for create element (default: builder). Mutiple element should be setup difference name*      |
<br>

6. Import Style To Component
```javascript
    <style lang="scss">
        @import '~/node_modules/vue-builder-plugin/src/assets/scss/Main.scss';
        @import '~/node_modules/vue-builder-plugin/src/assets/css/quill.core.css';
        @import '~/node_modules/vue-builder-plugin/src/assets/css/quill.snow.css';
    </style>
```

7. Access Builder Instance Directive From Outside
```javascript
    <YOUR_PARAMETER>.$el.__vue__.<YOUR_DIRECTIVE(DATA, PROPS, METHODS, ...)>

    such as
        this.builder.$el.__vue__.onUpdateScreen()
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
