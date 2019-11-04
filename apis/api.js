export const fetchHomeData=()=>{
    return fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=15&key=AIzaSyBjhFK9MovixovHfXxDM3RUHST7ClMAFNY')
}
export const fetchChannelData=(data)=>{
    return fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${data}&key=AIzaSyBjhFK9MovixovHfXxDM3RUHST7ClMAFNY`)
}