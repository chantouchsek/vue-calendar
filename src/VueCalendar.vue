<script>
import Calendar from 'tui-calendar';

const scheduleNeedProp = ['start', 'category'];

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
      this.calendarInstance.setCalendars(newValue);
    },
    events() {
      this.calendarInstance.clear();
      this.reflectSchedules();
    },
    view(newValue) {
      this.calendarInstance.changeView(newValue, true);
    },
    taskView(taskView) {
      this.calendarInstance.setOptions({taskView});
    },
    scheduleView(scheduleView) {
      this.calendarInstance.setOptions({scheduleView});
    },
    theme: {
      handler(newValue) {
        this.calendarInstance.setTheme(this.cloneData(newValue));
      },
      deep: true
    },
    week: {
      handler(newValue) {
        const silent = this.view !== 'week' && this.view !== 'day';
        this.calendarInstance.setOptions({week: this.cloneData(newValue)}, silent);
      },
      deep: true
    },
    month: {
      handler(newValue) {
        const silent = this.view !== 'month';
        this.calendarInstance.setOptions({month: this.cloneData(newValue)}, silent);
      },
      deep: true
    },
    timezones(timezones) {
      this.calendarInstance.setOptions({timezones});
    },
    disableDblClick(disableDblClick) {
      this.calendarInstance.setOptions({disableDblClick});
    },
    disableClick(disableClick) {
      this.calendarInstance.setOptions({disableClick});
    },
    isReadOnly(isReadOnly) {
      this.calendarInstance.setOptions({isReadOnly});
    }
  },
  mounted() {
    this.calendarInstance = new Calendar(this.$el, {
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
    this.calendarInstance.off();
    this.calendarInstance.destroy();
  },
  methods: {
    cloneData(data) {
      return JSON.parse(JSON.stringify(data));
    },
    addEventListeners() {
      for (const eventName of Object.keys(this.$listeners)) {
        this.calendarInstance.on(eventName, (...args) => this.$emit(eventName, ...args));
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

      if (this.calendarInstance[methodName]) {
        result = this.calendarInstance[methodName](...args);
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
