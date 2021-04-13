# TOAST UI Calendar for Vue

> This is Vue component wrapping [TOAST UI Calendar](https://github.com/nhn/tui.calendar).

[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![github version](https://img.shields.io/github/release/chantouchsek/vue-tuicalendar.svg)](https://github.com/chantouchsek/vue-tuicalendar/releases/latest)
[![npm version](https://img.shields.io/npm/v/@chantouchsek/vue-calendar.svg)](https://www.npmjs.com/package/@chantouchsek/vue-calendar)
[![license](https://img.shields.io/github/license/chantouchsek/vue-tuicalendar.svg)](https://github.com/chantouchsek/vue-tuicalendar/blob/main/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/chantouchsek/vue-tuicalendar/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)

## 🚩 Table of Contents

* [Install](#-install)
    * [Using npm](#using-npm)
* [Usage](#-usage)
    * [Load](#load)
    * [Implement](#implement)
    * [Props](#props)
    * [Event](#event)
    * [Method](#method)
* [Pull Request Steps](#-pull-request-steps)
* [Contributing](#-contributing)
* [License](#-license)

## 💾 Install

### Using npm

```sh
npm install --save @chantouchsek/vue-calendar
```

### Using yarn

```sh
yarn add @chantouchsek/vue-calendar
```

## ♻️ Usage with Nuxt.js

Create `vue-calendar.client.[js,ts]`

```js
import VueCalendar from '@chantouchsek/vue-calendar'
import Vue from 'vue'
import 'tui-calendar/dist/tui-calendar.css'

Vue.use(VueCalendar)

```

Add `vue-calendar.client` to plugins section of `nuxt.config.js`

```js
export default {
    plugins: ['~plugins/vue-calendar.client'],
}
```

## 📅 Usage

### Load

You can use Toast UI Calendar for Vue as moudule format or namespace. Also you can use Single File Component (SFC of
Vue). When using module format and SFC, you should load `tui-calendar.css` in the script.

* Using Ecmascript module

   ```js
   import { VueCalendar } from '@chantouchsek/vue-calendar';
   import 'tui-calendar/dist/tui-calendar.css';

   // If you use the default popups, use this.
   import 'tui-date-picker/dist/tui-date-picker.css';
   import 'tui-time-picker/dist/tui-time-picker.css';
   ```

* Using Commonjs module

   ```js
   require('tui-calendar/dist/tui-calendar.css');

   // If you use the default popups, use this.
   require('tui-date-picker/dist/tui-date-picker.css');
   require('tui-time-picker/dist/tui-time-picker.css');

   var tuicalendar = require('@chantouchsek/vue-calendar');
   var VueCalendar = tuicalendar.VueCalendar;
   ```

* Using Single File Component

   ```js
   import 'tui-calendar/dist/tui-calendar.css'
   import VueCalendar from '@chantouchsek/vue-calendar/src/VueCalendar.vue'

   // If you use the default popups, use this.
   import 'tui-date-picker/dist/tui-date-picker.css';
   import 'tui-time-picker/dist/tui-time-picker.css';
   ```

* Using namespace

    ```js
    var VueCalendar = tuicalendar.VueCalendar;
    ```

### Implement

* Load calendar component and then add it to the `components` in your component or Vue instance.

    ```js
    import 'tui-calendar/dist/tui-calendar.css'
    import { VueCalendar } from '@chantouchsek/vue-calendar'

    export default {
        name: 'YourComponent',
        components: {
            'calendar': VueCalendar
        }
    }
    ```
  or
    ```js
    import 'tui-calendar/dist/tui-calendar.css'
    import { VueCalendar } from '@chantouchsek/vue-calendar'

    new Vue({
        el: '#app',
        components: {
            'calendar': VueCalendar
        }
    });
    ```

* Insert `<calendar>` in the template or html. `<calendar>` element should have own height.

    ```html
    <calendar style="height: 800px;"/>
    ```

### Props

We provide props for [Options of Toast UI Calendar](https://nhn.github.io/tui.calendar/latest/Options). Each name of
props is same options of Toast UI Calendar except `view` is for `defaultView` of option. Additionally you can set
schedules using `schedules` of prop.

| Name | Type | Default | Reactive | Description |
| --- | --- | --- | --- | --- |
| schedules | Array | [] | O | Schedule list of calendar. If this prop is changed, Calendar is rendering. |
| calendars | Array | [] | O | Type list of calendars |
| view | String | 'week' | O | View of calendar. There are three views, `day`, `week` and `month`. |
| taskView | Boolean, Array | true | O | Show the milestone and task in weekly, daily view. If set `true`, the milestone and task show. If you want to show only the milestone or task, set array like this: `['mileston']` or `['task']`. |
| scheduleView | Boolean, Array | true | O | Show the all day and time grid in weekly, daily view. If set `true`, the all day and time show. If you want to show only the all day or time, set array like this: `['allday']` or `['time']`.|
| theme | Object | {} | O | Customize theme. For more infomation about theme, see [ThemeConfig of Toast UI Calendar](https://nhn.github.io/tui.calendar/latest/themeConfig). |
| week | Object | {} | O | Set more for the `week` and `day` view. For more infomation about week, see [WeekOptions of Toast UI Calendar](https://nhn.github.io/tui.calendar/latest/WeekOptions). |
| month | Object | {} | O | Set more for the `month` view. For more infomation about month, see [MonthOptions of Toast UI Calendar](https://nhn.github.io/tui.calendar/latest/MonthOptions). |
| timezones | Array | [] | O | Set multiple time zones. For more information about timezones, see [Timezone of Toast UI Calendar](https://nhn.github.io/tui.calendar/latest/Timezone). |
| disableDblClick | Boolean | false | O | Disable double click to create a schedule. |
| disableClick | Boolean | false | O | Whether to use mouse click events as defaults to create schedules. |
| isReadOnly | Boolean | false | O | Set read only mode. If `true`, a user can't create and modify any schedule. |
| template | Object | {} | X | Customize renderer. For more information about template, see [Template of Toast UI Calendar](https://nhn.github.io/tui.calendar/latest/Template). |
| useCreationPopup | Boolean | true | X | Whether use default creation popup or not. |
| useDetailPopup | Boolean | true | X | Whether use default detail popup or not. |
| usageStatistics | Boolean | true | X | Whether send hostnames to Google Analytics or not. |

#### Example

```vue

<template>
  <calendar style="height: 800px;"
            :calendars="calendarList"
            :schedules="scheduleList"
            :view="view"
            :taskView="taskView"
            :scheduleView="scheduleView"
            :theme="theme"
            :week="week"
            :month="month"
            :timezones="timezones"
            :disableDblClick="disableDblClick"
            :isReadOnly="isReadOnly"
            :template="template"
            :useCreationPopup="useCreationPopup"
            :useDetailPopup="useDetailPopup"
  />
</template>
<script>
import 'tui-calendar/dist/tui-calendar.css'
import {VueCalendar} from '@chantouchsek/vue-calendar';

export default {
  name: 'myCalendar',
  components: {
    'calendar': VueCalendar
  },
  data() {
    return {
      calendarList: [
        {
          id: '0',
          name: 'home'
        },
        {
          id: '1',
          name: 'office'
        }
      ],
      scheduleList: [
        {
          id: '1',
          calendarId: '1',
          title: 'my schedule',
          category: 'time',
          dueDateClass: '',
          start: '2018-10-18T22:30:00+09:00',
          end: '2018-10-19T02:30:00+09:00'
        },
        {
          id: '2',
          calendarId: '1',
          title: 'second schedule',
          category: 'time',
          dueDateClass: '',
          start: '2018-10-18T17:30:00+09:00',
          end: '2018-10-19T17:31:00+09:00'
        }
      ],
      view: 'day',
      taskView: false,
      scheduleView: ['time'],
      theme: {
        'month.dayname.height': '30px',
        'month.dayname.borderLeft': '1px solid #ff0000',
        'month.dayname.textAlign': 'center',
        'week.today.color': '#333',
        'week.daygridLeft.width': '100px',
        'week.timegridLeft.width': '100px'
      },
      week: {
        narrowWeekend: true,
        showTimezoneCollapseButton: true,
        timezonesCollapsed: false
      },
      month: {
        visibleWeeksCount: 6,
        startDayOfWeek: 1
      },
      timezones: [{
        timezoneOffset: 540,
        displayLabel: 'GMT+09:00',
        tooltip: 'Seoul'
      }, {
        timezoneOffset: -420,
        displayLabel: 'GMT-08:00',
        tooltip: 'Los Angeles'
      }],
      disableDblClick: true,
      isReadOnly: false,
      template: {
        milestone: function (schedule) {
          return `<span style="color:red;">${schedule.title}</span>`;
        },
        milestoneTitle: function () {
          return 'MILESTONE';
        },
      },
      useCreationPopup: true,
      useDetailPopup: false,
    }
  }
}
</script>
```

### Event

* afterRenderSchedule : Occurs when every single schedule after rendering whole calendar.
* beforeCreateSchedule : Occurs when select time period in daily, weekly, monthly.
* beforeDeleteSchedule : Occurs when delete a schedule.
* beforeUpdateSchedule : Occurs when drag a schedule to change time in daily, weekly, monthly.
* clickDayname : Occurs when click a day name in weekly.
* clickSchedule : Occurs when click a schedule.
* clickTimezonesCollapseBtn : Occurs when click timezones collapse button. This event works when `timezone` prop has
  multi timezones and `week` prop has `{ showTimezoneCollapseButton: true }`.

For more information such as the parameters of each event,
see [Event of Toast UI Calendar](https://nhn.github.io/tui.calendar/latest/Calendar#event-afterRenderSchedule).

#### Example

```vue

<template>
  <calendar style="height: 800px;"
            @afterRenderSchedule="onAfterRenderSchedule"
            @beforeCreateSchedule="onBeforeCreateSchedule"
            @beforeDeleteSchedule="onBeforeDeleteSchedule"
            @beforeUpdateSchedule="onBeforeUpdateSchedule"
            @clickDayname="onClickDayname"
            @clickSchedule="onClickSchedule"
            @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
  />
</template>
<script>
import 'tui-calendar/dist/tui-calendar.css'
import {VueCalendar} from '@chantouchsek/vue-calendar';

export default {
  name: 'myCalendar',
  components: {
    'calendar': VueCalendar
  },
  methods: {
    onAfterRenderSchedule(e) {
      // implement your code
    },
    onBeforeCreateSchedule(e) {
      // implement your code
    },
    onBeforeDeleteSchedule(e) {
      // implement your code
    },
    onBeforeUpdateSchedule(e) {
      // implement your code
    },
    onClickDayname(e) {
      // implement your code
    },
    onClickSchedule(e) {
      // implement your code
    },
    onClickTimezonesCollapseBtn(e) {
      // implement your code
    }
  }
}
</script>
```

### Method

For use method, first you need to assign `ref` attribute of element like this:

```html

<calendar ref="tuiCalendar"/>
```

After then you can use methods through `this.$refs`. We provide `getRootElement` and `invoke` methods.

* `getRootElement`

  You can get root element of calendar using this method.

    ```js
    this.$refs.tuiCalendar.getRootElement();
    ```

* `invoke`

  If you want to more manipulate the Calendar, you can use `invoke` method to call the method of Toast UI Calendar.
  First argument of `invoke` is name of the method and second argument is parameters of the method. To find out what
  kind of methods are available, see [method of Toast UI Calendar](https://nhn.github.io/tui.calendar/latest/).

    ```js
    this.$refs.tuiCalendar.invoke('today');
    ```

## 🔧 Pull Request Steps

TOAST UI products are open source, so you can create a pull request(PR) after you fix issues. Run npm scripts and
develop yourself with the following process.

### Setup

Fork `develop` branch into your personal repository. Clone it to local computer. Install node modules. Before starting
development, you should check to haveany errors.

``` sh
$ git clone https://github.com/{your-personal-repo}/[[repo name]].git
$ cd [[repo name]]
$ npm install
```

### Develop

Let's start development!

### Pull Request

Before PR, check to test lastly and then check any errors. If it has no error, commit and then push it!

For more information on PR's step, please see links of Contributing section.

## 💬 Contributing

* [Code of Conduct](https://github.com/chantouchsek/vue-tuicalendar/blob/main/CODE_OF_CONDUCT.md)
* [Contributing guideline](https://github.com/chantouchsek/vue-tuicalendar/blob/main/CONTRIBUTING.md)
* [Commit convention](https://github.com/chantouchsek/vue-tuicalendar/blob/main/docs/COMMIT_MESSAGE_CONVENTION.md)

## 📜 License

This software is licensed under the [MIT](./LICENSE) © [ChantouchSek](https://github.com/chantouchsek)
