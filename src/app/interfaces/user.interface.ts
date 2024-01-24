export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  gtoken: string;
}

export interface IUserAuth {
  email: string;
  password: string;
}
export interface IUserCreateRequest extends Express.Request {
  body: {
    name: string;
    email: string;
    password: string;
    gtoken: string;
  };
}
