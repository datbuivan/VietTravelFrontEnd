export interface User {
    id?: string;
    email?: string;
    userName: string;
    roles: string[];
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
    expiresIn: number;
}
