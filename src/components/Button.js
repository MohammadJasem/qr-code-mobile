import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity} from 'react-native';
import {APP_COLOR} from '../../common/styles';
import {Icon} from 'react-native-elements';

export default Button = ({onPress, title, style,icon}) => {

    return(
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container,style]}
        >
            {icon ?
            <Icon
                name={icon.name}
                type={icon.type}
                containerStyle={{
                    paddingLeft: 15,
                }}
                reverse
                size={20}
                color={APP_COLOR}
            /> : null}
            <Text style={styles.txtStyle}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        width:175,
        height: 50,
        margin:10,
        borderRadius:15,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor:APP_COLOR
    },
    txtStyle:{
        textAlign:'center',
        fontSize: 18,
        color:'#fff'
    }
});