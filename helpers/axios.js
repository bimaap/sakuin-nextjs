// import Axios from 'axios'
// import Cookies from 'js-cookie'

// const axiosApiIntances = Axios.create({
//     baseURL: 'https://fazzpay.herokuapp.com/'
// })

// axiosApiIntances.interceptors.request.use(function(config){
//     config.headers = {
//         Autorization: `Bearer ${Cookies.get('token')}`
//     }
//     return config
// }, function (error){
//     return Promise.reject(error)
// })

// axiosApiIntances.interceptors.response.use(function(response){
//     return response
// }, function(error){
//     if(error.response.status === 403){
//         Cookies.remove('token')
//         window.location.href = '/auth/login'
//     }
//     return error
// })

// export default axiosApiIntances