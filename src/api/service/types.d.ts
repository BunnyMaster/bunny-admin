import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

// 基础后端返回内容
export interface BaseResult<T> {
	code: number;
	data: T;
	message: string;
}

export type resultType = {
	accessToken?: string;
};

export type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>;

export interface PureHttpError extends AxiosError {
	isCancelRequest?: boolean;
}

export interface PureHttpResponse extends AxiosResponse {
	config: PureHttpRequestConfig;
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
	beforeRequestCallback?: (request: PureHttpRequestConfig) => void;
	beforeResponseCallback?: (response: PureHttpResponse) => void;
}

export default class PureHttp {
	request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig, axiosConfig?: PureHttpRequestConfig): Promise<T>;

	post<T, P>(url: string, params?: P, config?: PureHttpRequestConfig): Promise<T>;

	get<T, P>(url: string, params?: P, config?: PureHttpRequestConfig): Promise<T>;
}
