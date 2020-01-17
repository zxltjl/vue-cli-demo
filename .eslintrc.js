module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/strongly-recommended',
        'eslint:recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        // vue 组件
        'vue/html-indent': [
            'error', 4, {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        // 标签属性一行超过 4 个，必须换行对齐
        'vue/max-attributes-per-line': ['error', {
            singleline: 4,
            multiline: {
                max: 1,
                allowFirstLine: false
            }
        }],
        'vue/script-indent': ['error', 4, {
            baseIndent: 1,
            switchCase: 1,
            ignores: []
        }],
        // 自定义组件、svg、MathML 没内容时自我闭合
        'vue/html-self-closing': ['error', {
            'html': {
                'void': 'never',
                'normal': 'any',
                'component': 'always'
            },
            'svg': 'always',
            'math': 'always'
        }],
        // 组件 prop 必须有默认值，没必要限制
        'vue/require-default-prop': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        // 组件必须使用大驼峰命名
        'vue/component-name-in-template-casing': ['error', 'PascalCase', {
            'ignores': ['compontent', 'transition']
        }],
        'vue/html-end-tags': 'off',
        // 组件的 data 属性的值必须是一个函数, 没必要限制
        'vue/no-shared-component-data': 'off',
        // 组件的属性必须为一定的顺序，方便阅读
        'vue/order-in-components': 'error',
        // 组件的标签属性按照一定的顺序
        'vue/attributes-order': 'warning',
        'vue/eqeqeq': ['error', 'always', { 'null': 'ignore' }],
        'vue/arrow-spacing': 'warning',
        'vue/block-spacing': 'warning',
        'vue/brace-style': 'error',
        'vue/key-spacing': 'warning',
        'vue/object-curly-spacing': 'warning',
        'vue/space-infix-ops': 'warning',
        'vue/space-unary-ops': 'warning',
        //关闭定义变量未使用提示/报错
        'no-unused-vars':0
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off'
            }
        }
    ],
    parserOptions: {
        parser: 'babel-eslint'
    }
};
