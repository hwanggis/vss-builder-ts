/*
 * @Author: WH
 * @Date: 2024-03-24 10:58:35
 * @Description: 
 * @LastEditTime: 2024-03-24 19:22:02
 * @LastEditors:  
 */
import '@/config'
import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/styles/index.scss';
import '@/assets/iconfont/iconfont.css'

import ElementPlus from 'element-plus';
import * as ElIcons from '@element-plus/icons'
import 'element-plus/dist/index.css';
import router from './router';
import { store } from './store';


const app = createApp(App);
app.use(router).use(store);

for(const icon in ElIcons) {
    app.component(icon, ElIcons[icon])
}
app.use(ElementPlus)

app.mount('#app');
