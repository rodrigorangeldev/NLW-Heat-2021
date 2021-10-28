import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type AuthProvider = {
    children: ReactNode
}

type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

type AuthContextData = {
    user: User | null;
    signInUrl: string;
    signOut: () => void;
}

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProvider){

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=fe3d3827c6eca2816973`

    const [user, setUser] = useState<User | null>(null)

    async function signIn(githubCode: string){
        const response = await api.post<AuthResponse>('authenticate',{
            code: githubCode
        })

        const {token, user} = response.data

        localStorage.setItem('@dowhile:token', token)

        api.defaults.headers.common.authorization = `Bearer ${token}`

        setUser(user)
    }

    function signOut(){
        setUser(null)
        localStorage.removeItem('@dowhile:token')
    }

    useEffect(() => {
        if(window.location.href.includes('?code=')){
            let [url, code] = window.location.href.split('?code=')
            window.history.pushState({},'',url)

            signIn(code)
        }
    },[])

    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token')
        if(token){
            api.defaults.headers.common.authorization = `Bearer ${token}`

            api.get<User>('profile').then(response => {
                setUser(response.data)
            })
        }
    },[])


    return (
        <AuthContext.Provider value={{signInUrl, user, signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}