export const fetchHomeData=()=>{
    return fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=AIzaSyA0rFR3gZSzq6DXv121g8Thc5DxDo0JyIc')
}
export const fetchChannelData=(data)=>{
    return fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${data}&key=AIzaSyA0rFR3gZSzq6DXv121g8Thc5DxDo0JyIc`)
}