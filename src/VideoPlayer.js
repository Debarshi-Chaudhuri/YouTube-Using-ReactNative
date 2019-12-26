import React from 'react';
import YouTube from 'react-native-youtube';
import GestureRecognizer,{swipeDirections} from "react-native-swipe-gestures";
import { View,StyleSheet,Text,Dimensions,FlatList,Image,TouchableNativeFeedback,TouchableOpacity,PanResponder,Animated,Easing } from "react-native";
import  loader from "../assets/loader.gif";
import { fetchHomeData,fetchChannelData } from "../apis/api";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { homepageLoad } from '../actions/action';
import {BackHandler} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


//let Window=Dimensions.get('window')
const CIRCLE=36;
const styles=StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
    },
    videoContainer:{
        display:'flex',
        flex:1,
        borderColor:'blue',
        borderWidth:1,
        height:'50%'
    },
    video:{
        width:'100%',
        height:300,
        //height:50,
        //borderRadius:25,
        borderColor:'red',
        borderWidth:1,
        position:'absolute',
        display:'flex',
        flex:1
    },
    dropZone:{
        display:'flex',
        flex:1,
        borderColor:'red',
        borderWidth:1
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

const AnimatedTouchable=Animated.createAnimatedComponent(TouchableNativeFeedback)

class VideoPlayer extends React.Component{
    constructor(props){
        super(props);
        this.state={pan:new Animated.ValueXY(),draggable:true,dropZoneValues:null}

        this.panResponder=PanResponder.create({
            onStartShouldSetPanResponder: ()=>true,
            onPanResponderMove: Animated.event([null,{
                dy:this.state.pan.y
                }
            ]),
            onPanResponderRelease: (e,gesture)=>{
                if(this.isDropZone(gesture)){
                    this.setState({draggable:false})
                }
                else{
                    Animated.spring(
                        this.state.pan,
                        {toValue:{x:0,y:0}}
                    ).start()
                }
            }
        })
    }


    isDropZone(gesture){
        let dz=this.state.dropZoneValues;
        return gesture.moveY>dz.y && gesture.moveY<(dz.y + dz.height);
    }


    setDropZoneValues(event){
        this.setState({dropZoneValues:event.nativeEvent.layout})
    }


    componentDidMount(){
        console.log(this.props)
        BackHandler.addEventListener('hardwareBackPress',this.androidBackPress)
    }


    androidBackPress=()=>{
        this.setState({text:'BBBB'})
    }

//{this.renderDraggable()}
    render(){
        const config = {
            velocityThreshold: 1,
            directionalOffsetThreshold: 800
        };
        return(
            <View style={styles.container}  >
                {this.renderDraggable()}
                <View
                    onLayout={this.setDropZoneValues.bind(this)}
                    style={styles.dropZone}
                >
                    <Text>DROP HERE</Text>
                </View>
            </View>
        )
    }


    renderDraggable(){
        return(
                <View style={styles.videoContainer}>
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[this.state.pan.getLayout(),styles.video]}
                    >
                    <YouTube
                            apiKey='AIzaSyA0rFR3gZSzq6DXv121g8Thc5DxDo0JyIc'
                            videoId={`${this.props.navigation.state.params.video.id}`} // The YouTube video ID
                            play// control playback of video with true/false
                            // control whether the video should play in fullscreen or inline
                            // control whether the video should loop when ended
                            style={{width:'100%',height:200,position:'absolute'}}
                            />
                     
                    </Animated.View>
                </View>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(VideoPlayer);
/*<YouTube
                    apiKey='AIzaSyA0rFR3gZSzq6DXv121g8Thc5DxDo0JyIc'
                    videoId={`${this.props.navigation.state.params.video.id}`} // The YouTube video ID
                    play// control playback of video with true/false
                     // control whether the video should play in fullscreen or inline
                    // control whether the video should loop when ended
                    style={{ alignSelf: 'stretch', height: 200 }}
                />
                
                
                <View style={{width:'100%',height:210}}>
                        <YouTube
                            apiKey='AIzaSyA0rFR3gZSzq6DXv121g8Thc5DxDo0JyIc'
                            videoId={`${this.props.navigation.state.params.video.id}`} // The YouTube video ID
                            play// control playback of video with true/false
                            // control whether the video should play in fullscreen or inline
                            // control whether the video should loop when ended
                            style={{width:'100%',height:200,position:'absolute'}}
                            />
                        </View>
                
                */