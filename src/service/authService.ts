import Cookies from "js-cookie";

const TOKEN_KEY = "DreamBookToken";

export function login(token : string){
    Cookies.set(TOKEN_KEY,token);
    localStorage.removeItem('token');
}

export function logout() {
    Cookies.remove(TOKEN_KEY);
    localStorage.removeItem('token');
    window.location.reload();
}

export function getToken() {
    return Cookies.get(TOKEN_KEY);
}