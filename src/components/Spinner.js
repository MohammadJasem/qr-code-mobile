import React from 'react';
import {ActivityIndicator} from 'react-native';
import { APP_COLOR } from '../../common/styles';


export default Spinner = () => {

    return(
        <ActivityIndicator color={APP_COLOR} size='large' />
    );
};