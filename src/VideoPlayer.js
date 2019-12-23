import React from 'react';
import YouTube from 'react-native-youtube';
import { View,StyleSheet,Text,FlatList,Image,TouchableNativeFeedback,TouchableOpacity } from "react-native";
import  loader from "../assets/loader.gif";
import { fetchHomeData,fetchChannelData } from "../apis/api";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { homepageLoad } from '../actions/action';



const styles=StyleSheet.create({
    videoContainer:{
        display:'flex',
        flex:1,
    }
})



const mapStateToProps=(store)=>{
    return{
        videos:store.videos
    }
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({
        homepageLoad
    },dispatch)
}
class VideoPlayer extends React.Component{
    constructor(props){
        super(props);
       // this.state={videoData:this.props.navigation.state.params}
    }
    componentDidMount(){
        console.log(this.videoData)
    }
    render(){
        return(
            <View style={styles.videoContainer}>
                <YouTube
                    apiKey='AIzaSyA0rFR3gZSzq6DXv121g8Thc5DxDo0JyIc'
                    videoId={`${this.props.navigation.state.params.video.id}`} // The YouTube video ID
                    play// control playback of video with true/false
                     // control whether the video should play in fullscreen or inline
                    // control whether the video should loop when ended
                    style={{ alignSelf: 'stretch', height: 200 }}
                />
           </View> 
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(VideoPlayer);