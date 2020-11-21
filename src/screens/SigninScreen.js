import React,{useState,useContext,useEffect} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Loading from '../components/Loading';
import {Icon,Text } from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';
import {View,Image,StyleSheet, Keyboard,BackHandler,
    SafeAreaView, TouchableWithoutFeedback
} from 'react-native';
import styles,{APP_COLOR} from '../../common/styles';

const signinStyles = StyleSheet.create({
    logo:{
        height: 225,
        width: 225,
        alignSelf: 'center',
    }
});

export default SigninScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const {state,Signin} = useContext(AuthContext);

    let backHandler = null;
    let KeyboardDidShowListener = null;
    let KeyboardDidHideListener = null;

    const error = state.errMessage ?
        <Text style={styles.errText}>
            {state.errMessage}
        </Text> : null;

    const _keyboardDidShow = e => {
        setKeyboardHeight(e.endCoordinates.height);
    };

    const _keyboardDidHide = () => {
        setKeyboardHeight(0);
    };

    useEffect(() => {
        KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });
    },[]);

    return (
        <SafeAreaView style={[styles.container,{marginBottom:keyboardHeight}]}>
            <NavigationEvents
                onWillBlur={() => {
                    if(KeyboardDidHideListener !== null &&
                            KeyboardDidShowListener !== null &&
                            backHandler !== null
                        ){
                        KeyboardDidShowListener.remove();
                        KeyboardDidHideListener.remove();
                        backHandler.remove();
                    }
                }}
            />
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >
                <View style={styles.inner}>
                    <Loading
                        isVisible={state.isLoading}
                        text='Signing in. Please Wait...'
                    />
                    {keyboardHeight === 0 ? <Image
                        style={signinStyles.logo}
                        source={require('../../assets/qr-code.jpg')}
                    /> : null}
                    {error}
                    <Input
                        placeholder={'Email Address'}
                        value={email}
                        behavior={'email-address'}
                        onChangeText={(email) => setEmail(email)}
                        icon={
                            <Icon
                                name='email'
                                color={APP_COLOR}
                                type='material'
                            />
                        }
                    />
                    <Input
                        placeholder={'Password'}
                        secure={true}
                        behavior={'default'}
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        icon={
                            <Icon
                                type='font-awesome'
                                color={APP_COLOR}
                                name='lock'
                            />
                        }
                    />
                    <Button
                        title={'Login'}
                        icon={{name: 'login',type:'antdesign'}}
                        onPress={() => Signin({email,password})}
                    />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}