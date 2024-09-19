export interface Profile {
  nickname: string;
  profileImage: stirng;
}

export interface MyInfo {
  height: number;
  weight: number;
  district: string;
  siGunGu: string;
}

export interface changePw {
  curPassword: string;
  newPassword: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  nickname: string;
  phone: string;
  birth: string;
  profileImage: string;
  gender: number;
  height: number;
  weight: number;
  district: string;
  siGunGu: string;
}

export interface MainMyRoutine {
  id: number;
  title: string;
  dueDate: string;
  like: boolean;
}

//서버에 토큰 전달
export interface fcmToken {
  id: number;
  fcmToken?: string;
}
