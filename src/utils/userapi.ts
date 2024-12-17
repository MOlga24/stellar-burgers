/* eslint-disable */
import { UserLoginBodyDto, UserRegisterBodyDto, UserResponse, UserResponseToken } from '@utils-types';
import { getCookie, setCookie } from './cookie';
import { TRegisterData } from './burger-api';

interface ErrorBurger extends Error {
	statusCode: number;
}

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';
export class BurgerApi {
	protected _baseUrl: null | string = null;

	constructor(baseUrl: string) {
		this._baseUrl = baseUrl;
	}

	checkResponse<T>(res: Response): Promise<T> {
		return res.ok
			? res.json()
			: res
					.json()
					.then(err => Promise.reject({ ...err, statusCode: res.status }));
	}

	protected requestWithRefresh = async <T>(
		endpoint: string,
		options: RequestInit
	) => {
		try {
			return await this.request<T>(endpoint, options);
		} catch (error) {
			console.log('requestWithRefresh');
			if (
				(error as ErrorBurger).statusCode === 401 ||
				(error as ErrorBurger).statusCode === 403
			) {
				const refreshData = await this.refreshToken();
				console.log('refreshData', refreshData);
				if (!refreshData.success) {
					Promise.reject(refreshData);
				}

				setCookie('accessToken', refreshData.accessToken);
				setCookie('refreshToken', refreshData.refreshToken);

				return await this.request<T>(endpoint, {
					...options,
					headers: {
						...options.headers,
						authorization: getCookie('accessToken') as string,
					},
				});
			}
		}
	};

	protected async request<T>(endpoint: string, options: RequestInit) {
		try {
			const res = await fetch(`${this._baseUrl}/${endpoint}`, {
				headers: {
					'content-type': 'application/json',
				} as HeadersInit,
				...options,
			});
			return await this.checkResponse<T>(res);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	refreshToken = () => {
		return this.request<UserResponseToken>('auth/token', {
			method: 'POST',
			body: JSON.stringify({ token: getCookie('refreshToken') }),
		});
	};

	async loginUser(data: UserLoginBodyDto) {
		const dataUser = await this.request<UserResponseToken>('auth/login', {
			method: 'POST',
			body: JSON.stringify(data),
		});

		if (dataUser?.success) {console.log(dataUser); return dataUser; }
		return Promise.reject(dataUser);
	}

	async registerUser(data: TRegisterData) {
		const dataUser = await this.request<UserResponseToken>('auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			  },
			body: JSON.stringify(data),
		});

		if (dataUser?.success) {console.log(dataUser); return dataUser; };
		return Promise.reject(dataUser);
	}

	async getUser() {
		const dataUser = await this.requestWithRefresh<UserResponse>('auth/user', {
			headers: {
				authorization: getCookie('accessToken'),
			} as HeadersInit,
		});
		if (dataUser?.success) return dataUser;
		return Promise.reject(dataUser);
	}
	async  logoutApi  () {
		const dataUser = await this.request<UserResponseToken>('auth/logout', {
	method: 'POST',
	headers: {
	  'Content-Type': 'application/json;charset=utf-8'
	},
	body: JSON.stringify({
	  token: localStorage.getItem('refreshToken')
	})
  });
  if (dataUser?.success) {console.log(dataUser); return dataUser; }
  return Promise.reject(dataUser);
}}

export default new BurgerApi(BURGER_API_URL);
