import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    iconfont: 'mdis',
    theme: {
        primary: '#9652ff',
        sucess: '#3cd1c2',
        info: '#ffaa2c',
        error: '#f83e70',
        cerbee: '#ED1D32'
    }
});
