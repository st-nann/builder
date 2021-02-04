# Template Builder

### How to use plugin

**Build Package (Include Store)**
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
                    props: {
                        propTemplateJson: this.propTemplateJson,
                        propMessageType: this.propMessageType
                    },
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
                        props: {
                            propTemplateJson: this.propTemplateJson,
                            propMessageType: this.propMessageType
                        },
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

| attribute                              |value                             |type      |description                                                                                   |
|----------------------------------------|:--------------------------------:|:--------:| -------------------------------------------------------------------------------------------- |
|id                                      |up to you                         |`string`  |*for create element (default: builder). Mutiple element should be setup difference name*      |
|store                                   |-                                 |-         |*for use store in builder component module*                                                   |
|router                                  |-                                 |-         |*for use router in builder component module*                                                  |
|propTemplateJson                        |up to you                         |`object`  |*for setup default prop your template json (pass to builder module)*                          |
|propMessageType                         |EMAIL, WEB_ATTENTION, FLEX_MESSAGE|`string`  |*for setup default prop your message type (EMAIL: result mjml, WEB_ATTENTION: result html, FLEX_MESSAGE: result line flex message)*               |
|this.builder                            |up to you                         |`any`     |*for save vue instance data (parameter in your component)*                                    |
|render                                  |-                                 |`function`|*for render component*                                                                        |
|change(templateJson: any)               |-                                 |`function`|*for pass updated data from child (module component) to parent (your component) component*    |
|.$mount(`#${this.id}`)                  |-                                 |-         |*for create instance vue*                                                                     |
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
        this.builder.$el.__vue__.onUpdateScreen({
            mobile: this.isMobileActive,
            desktop: this.isFullsceenActive,
            width: {
                type: this.propWidthScreenType,
                size: this.propWidthScreenSize
            }
        })
```

| attribute                              |value                          |type      |description                                                                                      |
|----------------------------------------|:-----------------------------:|:--------:| ----------------------------------------------------------------------------------------------- |
|isMobileActive                          |true, fasle                    |`boolean` |*for set up screen (if value is true you can view on mobile screen only)*                        |
|isFullsceenActive                       |true, fasle                    |`boolean` |*for set up screen (if value is true you can view on desktop screen only)*                       |
|width                                   |{ type: string, size: string } |`object`  |*for set up width and type screen (if you set value you still edit builder)*                     |
|propWidthScreenType                     |SM, MD, LG, FULL, CUSTOM       |`string`  |*for set up screen type (SM: 30%, MD: 70%, LG: 50%, FULL: 100%, CUSTOM: up to you, DEFAULT: 90%)*|
|propWidthScreenSize                     |number of percent (ex. 25%)    |`string`  |*for set up screen custom*                                                                       |
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
yarn build:ts
```

#### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
