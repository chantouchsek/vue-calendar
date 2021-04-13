import VueCalendar from './VueCalendar.vue';
import TuiCalendar from 'tui-calendar';
import {version} from '../package.json';

export default {
  version,
  install(Vue, options = {}) {
    let installed = false;
    if (installed) {
      return;
    }
    Vue.component(options.componentName || 'vue-calendar', VueCalendar);
    installed = true;
  }
};

export {VueCalendar, TuiCalendar};
