import React from 'react';
import { View,StyleSheet,Text,FlatList,Image,TouchableNativeFeedback,TouchableOpacity } from "react-native";
import  loader from "../assets/loader.gif";
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
        width:40,
        height:40,
        borderRadius:20
    },
    videoText:{
        display:'flex',
        fontWeight:'900'
    },
    channelText:{
        fontWeight:'100',
        fontSize:12,
        paddingTop:2,
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
        width:35,
        height:35,
        borderRadius:15,
        justifyContent:"center",
        alignItems:'center',
        overflow:'hidden',
        marginLeft:15
    },
    dot:{
        width:4,
        height:4,
        borderRadius:2,
        overflow:'hidden',
        backgroundColor:'#6b6b6b',
        marginBottom:2,
    }
})



let count=0;

const Video=(props)=>{
    const [icon,useIcon]=React.useState(`${loader}`);

    //console.log(props.video.snippet.channelId)
    console.log(count++)
    React.useEffect(()=>{fetchChannelData(props.video.snippet.channelId).then(
        (response)=>response.json()
    ).then(
        (json)=>{
            //console.log(json.items[0].snippet.thumbnails)
            useIcon(json.items[0].snippet.thumbnails.high.url)
        }
    ).catch(
        (error)=>console.log(error)
    )},[])
    
    return(
        <TouchableNativeFeedback  >
            <View style={styles.imageContainer}  >
                <Image source={{uri:props.video.snippet.thumbnails.high.url}} style={styles.image} />
                
                <View style={styles.titleContainer}>
                    <Image source={{uri:icon}} style={styles.icon} />
                    
                    <View style={styles.videoTextContainer}>
                        
                        <View style={styles.videoTextHeader}>
                            <Text style={styles.videoText}>{props.video.snippet.title}</Text>
                            <Text style={styles.channelText} >{props.video.snippet.channelTitle}</Text>
                        </View>
                        
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('grey', true)}>
                            
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
class Youtube extends React.Component{
    componentDidMount(){
        fetchHomeData().then(
            (response)=>response.json()
        ).then(
            (json)=>{
                console.log(json)
                this.props.homepageLoad(json.items)
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
                    data={this.props.videos}
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
                    //
                    // 