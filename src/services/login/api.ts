// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import {MenuDataItem} from "@umijs/route-utils";

const BASE_API = "https://api.pamalee.cn";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.CurrentUser;
  }>(BASE_API+'/User/UserInfo', {
    data: body,
    requestType: 'form',
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

export async function getRoutes(option?:{[key: string]: any}){
  return request<any>('http://localhost:8080/App/ribo/getRoutes',{
    method: 'GET',
    ...option
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
export async function getClubUser(cid: string,option?:{[key: string]: any}){
  return request<API.ClubUser>('http://localhost:8080/App/ribo/getClubUser',{
    method: 'POST',
    data: {"cid":cid},
    requestType: 'json',
    ...option
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



/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(BASE_API+'/Login/LoginToken', {
    method: 'POST',
    data: body,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
