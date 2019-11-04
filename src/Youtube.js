import React from 'react';
import { View,StyleSheet,Text,FlatList,Image,TouchableNativeFeedback,TouchableOpacity } from "react-native";
import YouTube from 'react-native-youtube';
import { fetchHomeData,fetchChannelData } from "../apis/api";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { homepageLoad } from '../actions/action';
const styles=StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
    },
    imageContainer:{
        width:'100%',
        height:'auto',
        display:'flex',
        flexDirection:'column',
        paddingBottom:10,
        borderBottomColor:'#cccccc',
        borderBottomWidth:1
    },
    image:{
        width:'100%',
        height:200,
    },
    titleContainer:{
        display:'flex',
        padding:10,
        flexDirection:'row',
    },
    icon:{
        width:50,
        height:50,
        borderRadius:25
    },
    videoText:{
        display:'flex',
        fontWeight:'900'
    },
    channelText:{
        fontWeight:'100',
        color:'#999999'
    },
    videoTextContainer:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        paddingLeft:10,
    },
    videoTextHeader:{
        width:'77%',
        display:'flex',
        flexDirection:'column',
    },
    moreInfoContainer:{
        width:40,
        height:40,
        borderRadius:20,
        justifyContent:"center",
        alignItems:'center',
    },
    dot:{
        width:4,
        height:4,
        borderRadius:2,
        backgroundColor:'#a6a6a6',
        marginBottom:2,
    }
})


const mapStateToProps=(store)=>{
    return({
        videos:store.videos
    })
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({
        homepageLoad
    },dispatch)
}


const Video=(props)=>{
    const [icon,useIcon]=React.useState('')
    console.log(props.video.snippet.channelId)
    React.useEffect(()=>{fetchChannelData(props.video.snippet.channelId).then(
        (response)=>response.json()
    ).then(
        (json)=>{
            console.log(json.items)
            useIcon(json.items[0].snippet.thumbnails.default.url)
        }
    ).catch(
        (error)=>console.log(error)
    )},[])
    
    return(
        <TouchableNativeFeedback  >
            <View style={styles.imageContainer}  >
                <Image source={{uri:props.video.snippet.thumbnails.standard.url}} style={styles.image} />
                <View style={styles.titleContainer}>
                    <Image source={{uri:icon}} style={styles.icon} />
                    <View style={styles.videoTextContainer}>
                        <View style={styles.videoTextHeader}>
                            <Text style={styles.videoText}>{props.video.snippet.title}</Text>
                            <Text style={styles.channelText} >{props.video.snippet.channelTitle}</Text>
                        </View>
                        <TouchableNativeFeedback style={styles.moreInfoContainer}>
                            <View style={styles.moreInfoContainer}>
                                <View style={styles.dot}></View>
                                <View style={styles.dot}></View>
                                <View style={styles.dot}></View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

class Youtube extends React.Component{
    constructor(props){
        super(props)
        this.state={
            videoList:[]
        }
    }
    componentDidMount(){
        fetchHomeData().then(
            (response)=>response.json()
        ).then(
            (json)=>{
                console.log(json)
                this.setState({videoList:json.items})
        }).catch(
            (error)=>console.log(error)
        )
    }
    renderList=({item})=>{
        return(<Video video={item} />)
    }
    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.videoList}
                    keyExtractor={item=>item.id}
                    renderItem={this.renderList}
                />
            </View>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Youtube);
/*<TouchableNativeFeedback >
                            <View style={styles.moreInfoContainer}>
                                <View style={styles.dot}></View>
                                <View style={styles.dot}></View>
                                <View style={styles.dot}></View>
                            </View>
                        </TouchableNativeFeedback>



                        <View style={styles.videoTextContainer}>
                        <View style={styles.videoTextHeader}>
                            <Text style={styles.videoText}>{props.video.snippet.title}</Text>
                            <Text style={styles.channelText} >{props.video.snippet.channelTitle}</Text>
                        </View>
                        
                    </View>*/