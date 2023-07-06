import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
	baseURL: '/api',
	timeout: 10000,
})

// 请求拦截
request.interceptors.request.use(
	config => {
		NProgress.start()
		const identification = window.localStorage.getItem('identification')
		//identification存在，且是基于baseURL的请求
		if (identification && !(config.url.startsWith('http://') || config.url.startsWith('https://'))) {
			config.headers.identification = identification
		}
		const token = localStorage.getItem('token') // 这里取token之前，你肯定需要先拿到token,存一下
		if (token) {
			config.headers.token = token //  如果要求携带在请求头中
		}
		return config
	}
)

// 响应拦截
request.interceptors.response.use(
	config => {
		NProgress.done()
		const identification = config.headers.identification
		if (identification) {
			//保存身份标识到localStorage
			window.localStorage.setItem('identification', identification)
		}
		return config.data
	}
)

export default request
