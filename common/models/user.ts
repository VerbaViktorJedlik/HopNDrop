export type PublicUser = {
    id: string,
    username: string,
}

export type PublicSelf = PublicUser & {
    balance: Number,
    jwt: string
}

export type AuthResponse = (PublicSelf & {
    result: "Success"
}) | {result: "Error", msg: string}
