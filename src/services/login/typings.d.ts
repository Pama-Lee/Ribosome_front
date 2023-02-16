// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    token?: string;
    name?: string;
    phone?: string;
    avatar?: string;
    studentID?: string;
    uid?: string;
    email?: string;
  };

  type UpdateParam = {
name?: string;
phone?: [];
token?: string;
  }

  type LoginResult = {
    status?: string;
    code?: string;
    message?: string;
    token?: string;
  };

  type ClubInfo = {
cid?: string;
name?: string;
logo?: string;
description?: string;
type?: string;
president?: string;
  }

  type ClubApplication = {
    token?: string;
    cid?: string|null;
    reason?: string;
    fee?: number;
  }

  type ClubUser = {
    uid?: string;
    username?: string;
    email?: string;
    join_time?: string;
  }

  type ClubActivity = {
    aid?: string;
activity_name?: string;
activity_time?: string;
activity_place?: string;
activity_type?: string;
activity_status?: string;
activity_description?: string;
  }

  // 用户消息列表
type UserMessage = {
    mid?: string;
    title?: string;
    content?: string;
    time?: string;
    status?: string;
  }


  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    token?: string;
    time?: string;
    version?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
