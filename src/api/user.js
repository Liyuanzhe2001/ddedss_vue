import axios from "@/plugins/axios";


export function sendVerificationCode(email) {
    return axios({
        url: `/user/sendVerificationCode/${email}`,
        method: "POST"
    })
}

export function forgetPassword(registerForm) {
    return axios({
        url: "/user/forgetPassword",
        method: "POST",
        data: {
            ...registerForm
        }
    })
}

export function login(number, password) {
    return axios({
        url: "/user/login",
        method: "POST",
        data: {
            number,
            password
        }
    })
}

export function register(registerForm) {
    return axios({
        url: "/user/register",
        method: "POST",
        data: {
            ...registerForm
        }
    })
}
