import React from 'react';
import YouTube from 'react-native-youtube';
import { View,StyleSheet,Text,FlatList,Image,TouchableNativeFeedback,TouchableOpacity } from "react-native";
const styles=StyleSheet.create({
    videoContainer:{
        display:'flex',
        flex:1,
    }
})
class VideoPlayer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.videoContainer}>
                <YouTube
                    videoId="KVZ-P-ZI6W4" // The YouTube video ID
                    play // control playback of video with true/false
                    fullscreen // control whether the video should play in fullscreen or inline
                    loop // control whether the video should loop when ended
                    style={{ alignSelf: 'stretch', height: 300 }}
                />
           <View/> 
        )
    }
}