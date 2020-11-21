import React,{useEffect, useReducer} from 'react';
import {StyleSheet,View,Text, AsyncStorage, Alert} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import Button from '../components/Button';
import Spinner from '../components/Spinner';

const ActionTypes = {
    POSTING_QR_CODE:'POSTING_QR_CODE',
    QR_CODE_POSTED: 'QR_CODE_POSTED',
    QR_CODE_POSTING_ERR: 'QR_CODE_POSTING_ERR'
};

const reducer = (state, action) => {
    switch(action.type)
    {
        case ActionTypes.POSTING_QR_CODE: {
            return {
                ...state,
                postingQRCode: true,
                success: null,
                err: null,
            }
        }

        case ActionTypes.QR_CODE_POSTED:{
            return{
                ...state,
                postingQRCode: false,
                success: action.payload,
                err: null,
            }
        }

        case ActionTypes.QR_CODE_POSTING_ERR: {
            return{
                ...state,
                postingQRCode: false,
                success: null,
                err: action.payload
            }
        }
        default: return state;
    }
};

const postQRCode = async (url,navigateBack) => {

    const token = await AsyncStorage.getItem('token');
    try{
        const response = await fetch(url,{
            method: 'POST',
            headers:{
                'Authorization': 'Bearer '.concat(token)
            }
        });

        return response.json();
    }catch(err){
        displayErrAlert(err.message,() => navigateBack());
    }
}

const displayErrAlert = (text,navigateBack) => {
    Alert.alert('Error',text, [
        {
            text: 'Scan again',
            onPress: () => {
                navigateBack();
            }
        }
    ],{cancelable: false});
};

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
    },
    txtStyle:{
        color:'#D87A56',
        fontSize: 24,
        textAlign: 'center'
    },
    errText:{
        color: 'red',
        fontSize: 24,
        textAlign: 'center'
    }
});

export default PostQRData = ({navigation}) => {

    const {navigate} = navigation;
    const [state, dispatch] = useReducer(reducer, {
        postingQRCode: false,
        success: null,
        err: null,
    });
    const url = navigation.getParam('url', null);
    const registerAttendance = () => {
        dispatch({
            type: ActionTypes.POSTING_QR_CODE
        });
        postQRCode(url,() => navigation.goBack()).then(res => {
            if(res && res.code){
                switch(res.code){
                    case 200:
                        let success = 'Congratulations ' + res.user.name + ', you have successfully registered for ' + res.schedule.group.subject.title + ' Schedule';
                        dispatch({
                            type: ActionTypes.QR_CODE_POSTED,
                            payload: success
                        });
                        break;
                    case 400:{
                        dispatch({
                            type: ActionTypes.QR_CODE_POSTING_ERR,
                            payload: res.err
                        });
                        break;
                    }
                    default:
                        break;
                }
            }
        });
    };

    useEffect(() => {
        if(url !== null)
        {

            registerAttendance();
        }
    }, []);

    return(
        <View style={styles.container}>
            <Header
                backgroundColor='#fff'
                leftComponent={
                <Icon
                    onPress={() => {navigation.goBack()}}
                    color='#D87A56'
                    name='back'
                    size={40}
                    type='antdesign'
                />}
            />
            <View style={styles.centeredView}>
                {state.postingQRCode ? <Spinner /> : null}
                {state.success ? <Text style={styles.txtStyle}>
                    {state.success}
                </Text> : null}
                {state.err ? <Text style={styles.errText}>
                    {state.err}
                </Text>:null}
                {!state.postingQRCode ? <Button
                    title='continue'
                    style={{
                        justifyContent:'center'
                    }}
                    onPress={() => navigate('Statistics')}
                /> : null}
            </View>
        </View>
    );
};

PostQRData.navigationOptions = () => {
    return {
        header: null
    }
}