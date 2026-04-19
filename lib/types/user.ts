export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    phoneNumber?: number;
    designation?: string;
    district?: string;
    city?: string;
    role: "user" | "admin";
    provider?: "credentials" | "google";
}