export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};
export interface UserParams {
  id: string;
}
export type TConstructorIngredient = TIngredient & {
  id: string;
};
export const enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed'
}
export type UserDto = {
  email: string;
  name: string;
};
export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TTabMode = 'bun' | 'sauce' | 'main';

export type UserLoginBodyDto = {
  email: string;
  password: string;
};

export type UserRegisterBodyDto = {
  password?: string;
} & UserDto;
export type UserResponseToken = ServerResponse<{
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}>;
type ServerResponse<T> = {
  success: boolean;
} & T;

export type UserResponse = ServerResponse<{
  user: UserDto;
}>;
