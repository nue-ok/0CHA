import axios, { AxiosError, AxiosResponse } from 'axios';

interface Todo {
  id: string;
  title: string;
}

interface User {
  id: string;
  name: string;
}

axios.defaults.baseURL = '/proxy';

// axios.interceptors.request.use((config) => {
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

axios.interceptors.request.use(
  (config) => {
    console.log('인터셉트 리퀘스트');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    // Refresh 토큰을 보낼 경우 사용하고자 하는 커스텀 인증 헤더를 사용하면 된다.
    if (refreshToken) {
      config.headers['x-refresh-token'] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  async (response) => {
    console.log('인터셉트 리스폰');
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status, data },
    } = error;

    if (status === 401 && data.message === 'InvalidTokenException') {
      // logout()
    }
    if (status === 401 && data.message === 'TokenExpired') {
      try {
        const toeknRefreshResult = await axios.post(`/auth/login/refresh`);
        if (toeknRefreshResult.status === 200) {
          const { accessToekn } = toeknRefreshResult.data;
          localStorage.setItem('accessToken', accessToekn);
          return axios(config);
        } else {
          // logout();
        }
      } catch (e) {
        // logout();
      }
    }

    return Promise.reject(error);
  },
);

// axios.interceptors.response.use(
//   (res) => res,
//   (error: AxiosError) => {
//     const { data, status, config } = error.response!;
//     switch (status) {
//       case 400:
//         console.error(data);
//         break;

//       case 401:
//         console.error('unauthorised');
//         break;

//       case 404:
//         console.error('/not-found');
//         break;

//       case 500:
//         console.error('/server-error');
//         break;
//     }
//     return Promise.reject(error);
//   },
// );

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
};

// const todos = {
//   list: () => request.get<Todo[]>('/todos'),
//   details: (id: string) => request.get<Todo>(`/todos/${id}`),
//   create: (data: Todo) => request.post<void>('/todos', data),
// };

// const users = {
//   list: () => request.get<User[]>('/users'),
//   details: (id: string) => request.get<User>(`/users/${id}`),
//   create: (data: User) => request.post<User>('/users', data),
// };

// const api = {
//   todos,
//   users,
// };

// export default api;
