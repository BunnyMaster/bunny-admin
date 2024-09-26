import { http } from '@/api/service';
import type { BaseResult } from '@/types/common/BaseResult';

export interface UserResult {
	/** 头像 */
	avatar: string;
	/** 用户名 */
	username: string;
	/** 昵称 */
	nickname: string;
	/** 当前登录用户的角色 */
	roles: Array<string>;
	/** 按钮级别权限 */
	permissions: Array<string>;
	/** `token` */
	accessToken: string;
	/** 用于调用刷新`accessToken`的接口时所需的`token` */
	refreshToken: string;
	/** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
	expires: Date;
}

export interface RefreshTokenResult {
	/** `token` */
	accessToken: string;
	/** 用于调用刷新`accessToken`的接口时所需的`token` */
	refreshToken: string;
	/** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
	expires: Date;
}

/**
 * 登录
 */
export const fetchLogin = (data?: object) => {
	return http.request<BaseResult<UserResult>>('post', '/login', { data });
};

/**
 * * 发送邮件
 * @param data
 */
export const fetchPostEmailCode = (data: any) => {
	return http.request<BaseResult<any>>('post', '/user/noAuth/sendLoginEmail', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
	return http.request<BaseResult<RefreshTokenResult>>('post', 'user/noAuth/refreshToken', { data });
};
