export interface User {
  forename: string;
  surname: string;
  email: string;
  pwd: {
    password: string;
    confirm_password: string;
  };
}
