import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Youtube from '../src/Youtube.js';
import VideoPlayer from '../src/VideoPlayer.js';

const MainRoute=createStackNavigator({
    Home:Youtube,
    Player:VideoPlayer
},
{
    headerMode:'none',
});
export default createAppContainer(MainRoute);