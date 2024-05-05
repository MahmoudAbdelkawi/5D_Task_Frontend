export interface User {
  id?: number;
  photo?: "";
  name: string;
  weight: string;
  dateOfBirth: string;
}

export interface UserResponse{
    data: User[];
}
