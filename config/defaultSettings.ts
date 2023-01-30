import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Ribosome',
  pwa: false,
  logo: 'https://github.com/Pama-Lee/Ribosome/raw/main/img/Logo/Ribosome.png',
  iconfontUrl: '',
};

export default Settings;
