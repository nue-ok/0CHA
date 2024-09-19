import axios, { Axios, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router';
import { getAccessToken, getRefreshToken, removeTokens, setAccessToken } from './tokenService';

export const localAxios = () => {
  const instance: Axios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
  });

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      // const token = getAccessToken(); // 스토리지에서 액세스 토큰 가져오기
      // if (token) {
      //     config.headers.Authorization = `${token}`; // 액세스 토큰을 Authorization 헤더에 추가
      // }
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken) {
        config.headers['Authorization'] = `${accessToken}`;
      }
      if (refreshToken) {
        config.headers['RefreshToken'] = refreshToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // 401 에러 (액세스 토큰 만료 등)
      if (error.response && error.response.status === 401) {
        const refresh = getRefreshToken(); // 스토리지에서 리프레시 토큰 가져오기

        if (refresh) {
          try {
            const toeknRefreshResult = await instance.post(`/auth/login/refresh`, refresh, {
              headers: {
                'Content-Type': 'application/text',
              },
            });
            const { accessToken, refreshToken } = toeknRefreshResult.data;
            // 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받음
            // const newAccessToken = await refreshAccessToken(refreshToken);

            // 새로운 액세스 토큰을 스토리지에 저장
            setAccessToken(accessToken);

            // 실패한 요청을 새 액세스 토큰과 함께 재전송
            originalRequest.headers.Authorization = `${accessToken}`;
            originalRequest.headers.RefreshToken = `${refreshToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            // 리프레시 토큰이 만료되었거나 오류가 발생한 경우 로그아웃 처리
            removeTokens(); // 토큰 제거
            window.location.href = '/login'; // 로그인 페이지로 리다이렉트
            return Promise.reject(refreshError);
          }
        } else {
          // 리프레시 토큰이 없으면 로그아웃 처리
          removeTokens();
          window.location.href = '/login'; // 로그인 페이지로 리다이렉트
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );

  // instance.interceptors.request.use(
  //   (config) => {
  //     console.log('인터셉트 리퀘스트');
  //     const accessToken = localStorage.getItem('accessToken');
  //     const refreshToken = localStorage.getItem('refreshToken');

  //     if (accessToken) {
  //       config.headers['Authorization'] = `${accessToken}`;
  //     }
  //     if (refreshToken) {
  //       config.headers['RefreshToken'] = refreshToken;
  //     }

  //     return config;
  //   },
  //   (error) => {
  //     console.log('리퀘스트 오류');
  //     return Promise.reject(error);
  //   },
  // );

  // instance.interceptors.response.use(
  //   async (response: AxiosResponse) => {
  //     console.log('인터셉트 리스폰');
  //     if (response.data === 'Refresh token is expired, logged out') {
  //       localStorage.removeItem('accessToken');
  //       localStorage.removeItem('refreshToken');
  //       window.location.reload();
  //     }
  //     return response;
  //   },
  //   async (error) => {
  //     const {
  //       config,
  //       response: { status, data },
  //     } = error;
  //     console.log('리스폰 오류');
  //     console.log(error);
  //     if (status === 401 && data === 'Refresh token is expired, logged out') {
  //       console.log('리프 파괴');
  //       // interceptioLogout();
  //       localStorage.removeItem('accessToken');
  //       localStorage.removeItem('refreshToken');
  //       window.location.reload(); // 페이지 재시작
  //     }
  //     if (status === 401 && data === 'Access token is expired') {
  //       try {
  //         console.log('액세 파괴');
  //         const jwt = localAxios();
  //         const refreshToken = localStorage.getItem('refreshToken');
  //         const toeknRefreshResult = await jwt.post(`/auth/login/refresh`, refreshToken, {
  //           headers: {
  //             'Content-Type': 'application/text',
  //           },
  //         });
  //         if (toeknRefreshResult.status === 200) {
  //           console.log('액세스 리프 교체');
  //           const { accessToken, refreshToken } = toeknRefreshResult.data;
  //           localStorage.removeItem('accessToken');
  //           localStorage.removeItem('refreshToken');
  //           localStorage.setItem('accessToken', accessToken);
  //           localStorage.setItem('refreshToken', refreshToken);
  //           console.log('교체완료');
  //           // window.location.reload(); // 동접일 때 여기서 무한루프,, 그러면 액세스토큰이 만료됐을때도?
  //           return Response;
  //           // return axios(config);
  //         } else {
  //           console.log('요청했지만 200이 아님');
  //           localStorage.removeItem('accessToken');
  //           localStorage.removeItem('refreshToken');
  //         }
  //       } catch (e) {
  //         console.log('요청실패');
  //         console.log(e);
  //         localStorage.removeItem('accessToken');
  //         localStorage.removeItem('refreshToken');
  //       }
  //     }

  //     return Promise.reject(error);
  //   },
  // );

  instance.defaults.headers.common['Authorization'] = '';
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  instance.defaults.headers.patch['Content-Type'] = 'application/json';
  instance.defaults.headers.put['Content-Type'] = 'application/json';
  return instance;
};

export const publicAxios = () => {
  const publicAxios: Axios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
  });

  publicAxios.defaults.headers.common['Authorization'] = '';
  publicAxios.defaults.headers.post['Content-Type'] = 'application/json';
  publicAxios.defaults.headers.patch['Content-Type'] = 'application/json';
  return publicAxios;
};

export const wsAxios = () => {
  const instance: Axios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken) {
        config.headers['Authorization'] = `${accessToken}`;
      }
      if (refreshToken) {
        config.headers['RefreshToken'] = refreshToken;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    async (response: AxiosResponse) => {
      if (response.headers.authorization) {
        const newAccessToken = response?.headers?.authorization;
        localStorage.removeItem('accessToken'); // 만료된 access토큰 삭제
        localStorage.setItem('accessToken', newAccessToken); // 새걸로 교체
      }
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status, data },
      } = error;
      if (status === 401 && data === 'Refresh token is expired, logged out') {
        // interceptioLogout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      if (status === 401 && data === 'Access token is expired') {
        try {
          const jwt = wsAxios();
          const refreshToken = localStorage.getItem('refreshToken');
          const toeknRefreshResult = await jwt.post(`/auth/login/refresh`, refreshToken, {
            headers: {
              'Content-Type': 'application/text',
            },
          });
          if (toeknRefreshResult.status === 200) {
            const { accessToken, refreshToken } = toeknRefreshResult.data;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            return axios(config);
          } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        } catch (e) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }

      return Promise.reject(error);
    },
  );

  instance.defaults.headers.common['Authorization'] = '';
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  instance.defaults.headers.patch['Content-Type'] = 'application/json';
  instance.defaults.headers.put['Content-Type'] = 'application/json';
  return instance;
};

export const socialAxios = () => {
  const socialAxios: Axios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
  });

  socialAxios.defaults.headers.common['Authorization'] = '';
  socialAxios.defaults.headers.post['Content-Type'] = 'application/json';
  socialAxios.defaults.headers.patch['Content-Type'] = 'application/json';
  return socialAxios;
};

export const inbodyAxios = () => {
  const inbodyAxios: Axios = axios.create({
    baseURL: '/inbody',
    withCredentials: true,
  });

  inbodyAxios.defaults.headers.common['X-OCR-SECRET'] = process.env.REACT_APP_NAVER_SECRET_KEY;
  inbodyAxios.defaults.headers.post['Content-Type'] = 'application/json';
  inbodyAxios.defaults.headers.patch['Content-Type'] = 'application/json';
  return inbodyAxios;
};
