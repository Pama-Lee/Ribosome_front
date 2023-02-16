import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // 拂晓蓝
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Ribosome',
  pwa: false,
  logo: 'https://github.com/Pama-Lee/Ribosome/raw/main/img/Logo/Ribosome.png',
  iconfontUrl: '',

};

export default Settings;
