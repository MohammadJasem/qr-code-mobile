import React from 'react';
import {StyleSheet} from 'react-native';
import {APP_COLOR} from '../../common/styles';
import {Input} from 'react-native-elements';

export default ({icon,placeholder,behavior,value,secure,onChangeText}) => {

    return(
        <Input
            leftIcon={icon}
            value={value}
            keyboardType={behavior}
            secureTextEntry={secure ? secure : false}
            placeholder={placeholder}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            onChangeText={onChangeText}
        />
    );
}

const styles = StyleSheet.create({
    containerStyle:{
        marginBottom: 30
    },
    inputContainerStyle:{
        padding: 5,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: APP_COLOR
    },
    inputStyle:{
        marginLeft: 8
    }
});