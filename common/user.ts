export type PublicUser = {
    id: string,
    username: string,
}

export type PublicSelf = PublicUser & {
    balance: Number,
}

export type AuthResponse = PublicSelf & {
    jwt: string
}