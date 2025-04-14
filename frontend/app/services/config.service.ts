export class ConfigService{


    static apiUrl = "http://localhost:3000/api"
    
    static setToken(token: string){
        localStorage.setItem("token",token)
    }
    static getToken(): string | null{
        const token = localStorage.getItem("token")
        if(!token) return null
        return token
    }

    static setApiUrl(url:string){
        ConfigService.apiUrl = url
    }
}