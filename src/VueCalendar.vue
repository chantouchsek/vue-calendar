<script>
import Calendar from 'tui-calendar';

const scheduleNeedProp = ['start', 'category'];
const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/\s+/g, '-')
  .toLowerCase();

export default {
  name: 'VueCalendar',
  props: {
    calendars: {
      type: Array,
      default() {
        return [];
      }
    },
    events: {
      type: Array,
      default() {
        return [];
      },
      validator(value) {
        let notHave = false;
        value.forEach(schedule => {
          notHave = scheduleNeedProp.some(prop => !schedule.hasOwnProperty(prop));
        });

        return !notHave;
      }
    },
    view: {
      type: String,
      default: 'week'
    },
    taskView: {
      type: [Boolean, Array],
      default: true
    },
    scheduleView: {
      type: [Boolean, Array],
      default: true
    },
    theme: {
      type: Object,
      default() {
        return {};
      }
    },
    template: {
      type: Object,
      default() {
        return {};
      }
    },
    week: {
      type: Object,
      default() {
        return {};
      }
    },
    month: {
      type: Object,
      default() {
        return {};
      }
    },
    useCreationPopup: {
      type: Boolean,
      default: true
    },
    useDetailPopup: {
      type: Boolean,
      default: true
    },
    timezones: {
      type: Array,
      default() {
        return [];
      }
    },
    disableDblClick: {
      type: Boolean,
      default: false
    },
    disableClick: {
      type: Boolean,
      default: false
    },
    isReadOnly: {
      type: Boolean,
      default: false
    },
    usageStatistics: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default() {
        return '800px';
      }
    },
    tag: {
      type: String,
      default() {
        return 'div';
      }
    }
  },
  watch: {
    calendars(newValue) {
      this.calendar.setCalendars(newValue);
    },
    events() {
      this.calendar.clear();
      this.reflectSchedules();
    },
    view(newValue) {
      this.calendar.changeView(newValue, true);
    },
    taskView(taskView) {
      this.calendar.setOptions({taskView});
    },
    scheduleView(scheduleView) {
      this.calendar.setOptions({scheduleView});
    },
    theme: {
      handler(newValue) {
        this.calendar.setTheme(this.cloneData(newValue));
      },
      deep: true
    },
    week: {
      handler(newValue) {
        const silent = this.view !== 'week' && this.view !== 'day';
        this.calendar.setOptions({week: this.cloneData(newValue)}, silent);
      },
      deep: true
    },
    month: {
      handler(newValue) {
        const silent = this.view !== 'month';
        this.calendar.setOptions({month: this.cloneData(newValue)}, silent);
      },
      deep: true
    },
    timezones(timezones) {
      this.calendar.setOptions({timezones});
    },
    disableDblClick(disableDblClick) {
      this.calendar.setOptions({disableDblClick});
    },
    disableClick(disableClick) {
      this.calendar.setOptions({disableClick});
    },
    isReadOnly(isReadOnly) {
      this.calendar.setOptions({isReadOnly});
    }
  },
  mounted() {
    this.calendar = new Calendar(this.$el, {
      defaultView: this.view,
      taskView: this.taskView,
      scheduleView: this.scheduleView,
      theme: this.theme,
      template: this.template,
      week: this.week,
      month: this.month,
      calendars: this.calendars,
      useCreationPopup: this.useCreationPopup,
      useDetailPopup: this.useDetailPopup,
      timezones: this.timezones,
      disableDblClick: this.disableDblClick,
      disableClick: this.disableClick,
      isReadOnly: this.isReadOnly,
      usageStatistics: this.usageStatistics
    });
    this.addEventListeners();
    this.reflectSchedules();
  },
  beforeDestroy() {
    this.calendar.off();
    this.calendar.destroy();
  },
  methods: {
    cloneData(data) {
      return JSON.parse(JSON.stringify(data));
    },
    addEventListeners() {
      for (const event of Object.keys(this.$listeners)) {
        this.calendar.on(event, (...args) => this.$emit(event, ...args));
        this.calendar.on(kebabCase(event), (...args) => this.$emit(event, ...args));
      }
    },
    reflectSchedules() {
      if (this.events.length > 0) {
        this.invoke('createSchedules', this.events);
      }
    },
    getRootElement() {
      return this.$el;
    },
    invoke(methodName, ...args) {
      let result;

      if (this.calendar[methodName]) {
        result = this.calendar[methodName](...args);
      }

      return result;
    }
  },
  render(createElement) {
    let {height} = this;
    if (!this.height.includes('px')) {
      height = `${this.height}px`;
    }

    return createElement(this.tag, {
      style: {
        height
      },
      attrs: {
        id: 'vue-calendar',
        class: 'vue-calendar'
      }
    });
  }
};
</script>
