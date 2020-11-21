import React, {useEffect,useContext} from 'react';
import {View} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Context as AuthContext} from '../context/AuthContext';

export default Startup = ({navigation}) => {

    const {tryLocalSignin} = useContext(AuthContext);

    useEffect(() => {

        tryLocalSignin();
    },[]);

    return <>
        <NavigationEvents
            onWillFocus={() => tryLocalSignin()}
        />
        <View /></>;
}