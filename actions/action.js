import { fetchHomeData } from "../apis/api";
//import console from 'console';
export const homepageLoad=(data)=>{
    return({
        type:'HOMEPAGE_LOAD',
        payload:data
    })
}