export type PublicUser = {
    id: string,
    username: string,
}

export type PublicSelf = PublicUser & {
    balance: Number,
}

export type AuthObject = PublicSelf & {
    jwt: string
}
  

export type AuthResponse = (AuthObject & {result: "Success"}) | {result: "Error", msg: string}
export type GetUserResponse = (PublicUser & {result: "Success"}) | {result: "Error", msg: string}