export type PublicUser = {
    id: string,
    username: string,
}

export type PublicSelf = PublicUser & {
    balance: Number,
}

export type AuthResponse = ({result: "Success", self: PublicUser, jwt: string}) | {result: "Error", msg: string}
export type GetUserResponse = ({result: "Success", self: PublicUser}) | {result: "Error", msg: string}
export type GetSelfResponse = ({result: "Success", self: PublicSelf}) | {result: "Error", msg: string}
export type GetAllUsersResponse = ({result: "Success", users: PublicUser[]}) | {result: "Error", msg: string}

export type TokenVerifyResponse = "Success" | "Error"
