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
        //js语法
        'vue/script-indent': ['error', 4, {
            baseIndent: 1,
            switchCase: 1,
            ignores: []
        }],
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
