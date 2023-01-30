import Footer from '@/components/Footer';
import {currentUser as queryCurrentUser, login} from '@/services/login/api';
import { message } from 'antd';
import {history, SelectLang, useIntl, useModel } from 'umi';
import styles from './index.less';
import defaultSettings from "../../../../config/defaultSettings";
import cookie from 'react-cookies'
const loginPath = '/user/login';

// 正文信息
let Message: string = "Loading";
// 正文实体
const Content: React.FC = () => {
  return(
    <div className={styles.content}><h2>{Message}</h2></div>
  )
}
// 跳转到登录页面
function toLoginPage(){
  setTimeout(()=>{
    window.location.href="https://rootjam.pamalee.cn?appid=694873c0726514c1"
  },3000)
}

// 页面实体
const Login: React.FC = () => {

  const {setInitialState,initialState } = useModel('@@initialState');
  const intl = useIntl();


  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const body: API.LoginParams = {};
      body.token = cookie.load("Ribo_token");
      if (!body?.token){
        history.push(loginPath);
        return undefined;
      }
      const msg = await queryCurrentUser(body);
      // alert(msg.data.email)
      return msg.data;
    } catch (error) {
      history.push(loginPath);
      return undefined;
    }
  };
  // 验证登录操作
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values});
      // @ts-ignore
      if (msg.code === 200) {

        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        // @ts-ignore
        cookie.save("Ribo_token",msg.token,{path:'/'});
        const data = await fetchUserInfo();
        // @ts-ignore
        const menudata: []  = initialState.menuData;
        await setInitialState(()=>({
          isLogin: true,
          currentUser: data,
          settings: defaultSettings,
          menuData: menudata,
        }));

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }else {
        message.error(msg.message);
        console.log(msg.code)
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  /**
   * 跳转登录
   * 获取登录状态
   */
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get("token")
  if (token != null){
    const res: API.LoginParams = {
      token: token
    }
    handleSubmit(res);
  }else {
    const token_ribo = cookie.load("Ribo_token")
    if (token_ribo != undefined){
      const ress: API.LoginParams = {
        token: token_ribo
      }
      handleSubmit(ress);
    }else {
      // 重载Content
      Message = "三秒后跳转登录";
      toLoginPage();
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <Content />
      <Footer />
    </div>
  );
};

export default Login;
