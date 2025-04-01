export interface UserDto{
    name: string;
    email: string;
    birthDate: Date;
    nDni: number;
    username: string;
    password: string;
};

export interface UserLoginDto {
    username: string
    password: string
}

export interface UserTwoDto {
    id: number
    name: string
    email: string
    birthDate: Date
    nDni: number 
}

export interface UserLoginSuccesDTO{
    login: boolean,
    user: UserTwoDto
}











