export class ConfigService{

    
    static setToken(token: string){
        localStorage.setItem("token",token)
    }
    static getToken(): string | null{
        const token = localStorage.getItem("token")
        if(!token) return null
        return token
    }
}