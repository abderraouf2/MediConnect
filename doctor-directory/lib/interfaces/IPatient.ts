export interface IPatient {
  first_name: string;
  last_name: string;
}

export interface ISignin {
  email: string;
  password: string;
}

export interface ISignup {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
