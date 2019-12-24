import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Youtube from '../src/Youtube.js';
import VideoPlayer from '../src/VideoPlayer.js';
import Animated, { Easing } from 'react-native-reanimated';


const transitionConfig=()=>{
    return{
        transitionSpec:{
            duration:300,
            useNativeDriver: true
        },
        screenInterpolator:sceneProps=>{
            const {layout,position,scene}=sceneProps;
            console.log(sceneProps)
            const thisSceneIndex=scene.index;
            const height=layout.initHeight;

            const translateY=position.interpolate({
                
                inputRange:[thisSceneIndex-1,thisSceneIndex,thisSceneIndex+1],
                
                outputRange:[height,0,0],
                
            })
            /*const translateY=position.interpolate({
                inputRange:[thisSceneIndex-1,thisSceneIndex,thisSceneIndex+1],
                //top is height 0
                //jokhon video te click korli
                //initial screen er top part ta height/10 position theke 0 e jaye
                //are videor screen er top part ta height theke height/10 obdi ashe
                outputRange:[height,height/10,0],
            })*/
            return{ transform:[{translateY}] }
        },
    }
}
const MainRoute=createStackNavigator({
    Home:Youtube,
    Player:VideoPlayer
},
{
    headerMode:'none',
    initialRouteName:'Home',
    transitionConfig
});
export default createAppContainer(MainRoute);

/*transitionConfig:()=>{
        return{
            transitionSpec: {
                duration: 2000,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
                useNativeDriver: true,
            },
            screenInterpolator:sceneProps=>{
                const {layout,position,scene}=sceneProps;
                console.log(sceneProps)
                const thisSceneIndex=scene.index;
                const height=layout.initHeight;

                const translateY=position.interpolate({
                    inputRange:[thisSceneIndex-1,thisSceneIndex,thisSceneIndex+1],
                    outputRange:[height,0,0],
                })

                return{ transform:[{translateY}] }
            }
        }
    }*/