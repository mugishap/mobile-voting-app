export interface ICreationTimeStamps {
    createdAt: string
    updatedAt: string
}

export interface IUser {
    id: string;
    names: string;
    email: string;
    telephone: string;
    profilePicture: string;
    role: string;
}

export interface ICandidate {
    id: string;
    user: IUser;
    userId: string;
    mission: string;
}

export interface IVote {
    id: string;
    voter: IUser;
    candidate: ICandidate;
    voterId: string;
    candidateId: string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IForgotPasswordData {
    email: string
}

export interface IResetPasswordData {
    passwordResetCode: string
    newPassword: string
}

export interface IRegisterData {
    names: string;
    email: string;
    telephone: string;
    password: string;
}

export interface IPaginationMeta {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number;
    next: number;
}