import anime from 'animejs';

const VueAnime = {
  install(Vue) {
    Vue.prototype.$anime = anime;
  }
};

export default VueAnime;
