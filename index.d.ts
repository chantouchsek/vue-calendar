import TuiCalendar from 'tui-calendar';
import Vue, { PluginFunction } from 'vue';

type FunctionKeys<T extends object> = {[K in keyof T]: T[K] extends Function ? K : never}[keyof T];

type CalendarFnKeys = FunctionKeys<TuiCalendar>;

export default class VueCalendar extends Vue {
  public invoke<T extends CalendarFnKeys>(fname: T, ...args: Parameters<TuiCalendar[T]>): ReturnType<TuiCalendar[T]>;
  public getRootElement(): HTMLElement;

  static install(): PluginFunction<any>;
}
