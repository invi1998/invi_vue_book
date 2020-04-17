import axios from 'axios'

export function home(){
    return axios ({
        method:'GET',
        url:`${process.env.VUE_APP_BASE_URL}/book/home`
    })
}