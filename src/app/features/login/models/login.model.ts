export interface LoginModel{
    email:string;
    password:string;
}
export interface LoginResponse {
  data: {
    token: string;
    refresh_token?: string;
  };
}

