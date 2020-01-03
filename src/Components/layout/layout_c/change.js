import { message } from 'ant-design-vue/es';

import updateTheme from './updateTheme.js';


const updateThemes = newPrimaryColor => {
    const hideMessage = message.loading('正在切换主题！', 0);
    updateTheme.changeColor(newPrimaryColor).finally(() => {
        setTimeout(() => {
            hideMessage();
        });
    });
};


export { updateThemes };
