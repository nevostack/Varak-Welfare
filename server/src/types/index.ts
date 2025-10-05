export interface CreateUserInput {
  user_name: string;
  user_email: string;
  user_password: string;
  user_mobile: string;
}

export interface UpdateUserInput {
  user_name?: string
  user_email?: string
  user_mobile?: string
  user_password?: string
}

export interface LoginInput {
  user_email?: string
  user_password: string
  user_mobile?: string
}
