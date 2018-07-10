/* global window,fetch */
import 'whatwg-fetch';
import Vue from 'vue';
import VueSmoothScroll from 'vue-smoothscroll';
import atrament from './atrament';
import AtramentUI from './ui/atrament.vue';


Vue.use(VueSmoothScroll);

const gameConfig = {
    episodes: [
        'capsule.ink.json'
    ]
};

atrament.init(gameConfig);
atrament.on('loadStory', (f) => fetch(f).then((content) => content.text()));
atrament.on('error', (e) => console.error(e));
atrament.registerCommand('IMG', (src) => `<img src="${src}">`, []);
atrament.registerCommand('CLEAR', (p, episode) => { episode.reset(); }, ['episode']);

window.Atrament = atrament; // FIXME: global Atrament object for debugging purposes

Vue.prototype.$atrament = atrament;
const app = new Vue(AtramentUI).$mount('#atrament-app');

atrament.startGame().then(
    () => {
        const scene = atrament.renderScene();
        console.log(scene);
        app.story = atrament.getCurrentEpisode();
        console.log(app.story);
    }
);
