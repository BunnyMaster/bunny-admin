import { useI18n } from "@/plugins/i18n";
import { setupStore } from "@/store";
import { MotionPlugin } from "@vueuse/motion";
import App from "./App.vue";
import { getPlatformConfig } from "./config";
import router from "./router";
// import { useEcharts } from "@/plugins/echarts";
import { useElementPlus } from "@/plugins/elementPlus";
import { injectResponsiveStorage } from "@/utils/responsive";
import { createApp, type Directive } from "vue";

import Table from "@pureadmin/table";
// import PureDescriptions from "@pureadmin/descriptions";
// 引入重置样式
import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "element-plus/dist/index.css";
import "./style/tailwind.css";
// 导入字体图标
import "./assets/iconfont/iconfont.css";
import "./assets/iconfont/iconfont.js";
// 自定义指令
import * as directives from "@/directives";
// 全局注册@iconify/vue图标库
import {
  FontIcon,
  IconifyIconOffline,
  IconifyIconOnline
} from "./components/CommonIcon";
// 全局注册按钮级别权限组件
import { Auth } from "@/components/Auth";
import { Perms } from "@/components/Perms";
// 全局注册vue-tippy
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import VueTippy from "vue-tippy";
import { useEcharts } from "@/plugins/echarts";

const app = createApp(App);

Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);
app.component("Auth", Auth);
app.component("Perms", Perms);

app.use(VueTippy);

getPlatformConfig(app).then(async config => {
  setupStore(app);
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config);
  app
    .use(MotionPlugin)
    .use(useI18n)
    .use(useElementPlus)
    .use(Table)
    // .use(PureDescriptions)
    .use(useEcharts);
  app.mount("#app");
});
