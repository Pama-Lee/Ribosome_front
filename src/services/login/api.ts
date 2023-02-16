// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import cookie from "react-cookies";

// @ts-ignore
const BASE_API = "https://api.pamalee.cn";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.CurrentUser;
  }>('http://localhost:8080/App/ribo/getUserInfo', {
    data: body,
    requestType: 'json',
    method: 'POST',
    ...(options || {}),
  });
}

/**
 * 更新用户信息
 */
export async function updateUserInfo(body: API.UpdateParam, options?: { [key: string]: any }) {
  return request<any>('http://localhost:8080/App/ribo/updateUserInfo', {
    data: body,
    requestType: 'json',
    method: 'POST',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function getRoutes(body: string){
  return request<any>('http://localhost:8080/App/ribo/getRoutes',{
    data: {"token":body},
    method: 'POST',
  });
}

export async function getClubInfo(cid: string,option?:{[key: string]: any}){
  return request<API.ClubInfo>('http://localhost:8080/App/ribo/getClub',{
    method: 'POST',
    data: {"cid":cid},
    requestType: 'json',
    ...option
  });
}

// 获取社团用户
export async function getClubUser(data: {
    cid: string;
    token: string;
}){
  return request<API.ClubUser>('http://localhost:8080/App/ribo/getClubUser',{
    method: 'POST',
    data: data,
    requestType: 'json',
  });
}

// 获取社团活动
export async function getClubActivity(cid: string,option?:{[key: string]: any}){
  return request<API.ClubActivity>('http://localhost:8080/App/ribo/getClubActivity',{
    method: 'POST',
    data: {"cid":cid},
    requestType: 'json',
    ...option
  });
}

export async function getClubList(option?:{[key: string]: any}){
  return request<any>('http://localhost:8080/App/ribo/getClubList',{
    method: 'GET',
    ...option
  });
}

export async function newClub(body:{clubName: any,token: any}){
  return request<any>('http://localhost:8080/App/ribo/admin/newClub',{
    method: 'POST',
    data: body,
    requestType: 'json',
  });
}
export async function selectPresident(query: any){
  return request<{code: any, data: any}>('http://localhost:8080/App/ribo/selectPresident',{
    method: 'POST',
    data: {token: cookie.load("Ribo_token"), query: query},
    requestType: 'json',
  });
}

export async function updateClub(body: API.ClubInfo,option?:{[key: string]: any}){
  return request<any>('http://localhost:8080/App/ribo/updateClub',{
    method: 'POST',
    data: body,
    requestType: 'json',
    ...option
  });
}

/**
 * 获取用户消息列表
 * methode: POST
 * data: {uid,token}
 */
export async function getUserMessageList(params: {
  token: string;
}): Promise<{ data:API.UserMessage[]}> {
  return request('http://localhost:8080/App/ribo/user/getUserMessageList', {
    method: 'POST',
    data: params,
    requestType: 'json',
  });
}


export async function newClubApplication(body: API.ClubApplication, option?:{[key: string]: any}){
  return request<any>('http://localhost:8080/App/ribo/newApplication',{
    method: 'POST',
    data: body,
    requestType: 'json',
    ...option
  });
}



/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('http://localhost:8080/App/ribo/auth/loginToken', {
    method: 'POST',
    data: body,
    requestType: 'json',
    ...(options || {}),
  });
}

/**
 * 获取社团申请信息
 * @param cid
 */
export async function getClubApplicationInfo(cid: any){
  return request<any>('http://localhost:8080/App/ribo/getClubApplicationInfo',{
    method: 'POST',
    data: {cid: cid},
    requestType: 'json',
  });
  }

/**
 * 获取社团申请列表
 */
export async function getClubApplicationList(token: any){
    return request<{
      code: number;
      data?: API.ClubApplication[];
      msg?: string;
    }>('http://localhost:8080/App/ribo/user/getClubApplicationList',{
      method: 'POST',
      data: {token: token},
      requestType: 'json',
    });
  }

  export async function getClubApplicationListAdmin(cid: any){
    return request<{
      code: number;
      data?: API.ClubApplication[];
      msg?: string;
    }>('http://localhost:8080/App/ribo/getClubApplicationList',{
      method: 'POST',
      data: {cid: cid, token: cookie.load("Ribo_token")},
      requestType: 'json',
    });
  }

  export async function getClubAllAction(){
    return request<any>('http://localhost:8080/App/ribo/getAllAction',{
      method: 'GET',
    });
  }

  export async function newClubRole(data: {
    cid: string;
    token: string;
    role: string;
    action: string;
  }){
    return request<any>('http://localhost:8080/App/ribo/newClubRole',{
      method: 'POST',
      data: data,
      requestType: 'json',
    });
  }

  export async function getClubRole(data: {
    cid: string;
    token: string;
  }){
    return request<any>('http://localhost:8080/App/ribo/getClubRole',{
      method: 'POST',
      data: data,
      requestType: 'json',
    });
  }

  export async function getClubAnnouncement(data: {
    cid: string;
    token: string;
  }){
    return request<any>('http://localhost:8080/App/ribo/getClubAnnouncement',{
      method: 'POST',
      data: data,
      requestType: 'json',
    });
  }

  export async function newClubAnnouncement(data: {
    cid: string;
    token: string;
    title: string;
    content: string;
  }){
    return request<any>('http://localhost:8080/App/ribo/newClubAnnouncement',{
      method: 'POST',
      data: data,
      requestType: 'json',
    });
  }

  export async function handleApplication(data: {
    cid: string;
    token: string;
    aid: string;
    status: string;
  }){
    return request<any>('http://localhost:8080/App/ribo/handleApplication',{
      method: 'POST',
      data: data,
      requestType: 'json',
    });
  }

  export async function updateClubUserRole(data: {
    cid: string;
    token: string;
    uid: string;
    rid: string;
  }){
    return request<any>('http://localhost:8080/App/ribo/updateClubUserRole',{
      method: 'POST',
      data: data,
      requestType: 'json',
    });
  }

  export async function getClassroomAvailable(data: {
    token: string;
    cid: string;
  }){
    return request<any>('http://localhost:8080/App/ribo/material/getClassroomAvailable',{
      method: 'POST',
      data: data,
      requestType: 'json',
    });
  }

  export async function newClassroomApplication(data: {
    token: string;
    cid: string;
    data: string;
    reason: string;
  }){
    return request<any>('http://localhost:8080/App/ribo/material/newClassroom',{
      method: 'POST',
      data: data,
      requestType: 'json',
    });
  }
export async function getClassroomArrangement(data: {
  token: string;
  cid: string;
}){
  return request<any>('http://localhost:8080/App/ribo/material/classroom/arrangement',{
    method: 'POST',
    data: data,
    requestType: 'json',
  });
}
