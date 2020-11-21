import React,{useReducer,useEffect} from 'react';
import {View,Alert,StatusBar,Animated, Easing, StyleSheet} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import Button from '../components/Button';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import BarcodeMask from 'react-native-barcode-mask';
import SVG,{Line, Polygon, G} from 'react-native-svg';
import {APP_COLOR} from '../../common/styles';

const ActionTypes = {
    RESET: 'RESET',
    REQUESTING_CAMERA_PERMISSION: 'REQUESTING_CAMERA_PERMISSION',
    SCANNING_BARCODE:'SCANNING_BARCODE'
};

const reducer = (state, action) => {

    switch(action.type){

        case ActionTypes.RESET:{
            return {
                ...state,
                scanned: false,
            }
        }
        case ActionTypes.REQUESTING_CAMERA_PERMISSION :
            return {
                ...state,
                hasCameraPermission: action.payload,
                scanned: false
            };
        case ActionTypes.SCANNING_BARCODE:
            return {
                ...state,
                scanned: true
            };
        default:
            return state;
    }
}

export default QRScanner = ({navigation}) => {

    const animatedVal = new Animated.Value(0);

    const animate = () => {

        animatedVal.setValue(0);

        Animated.timing(animatedVal,{
            toValue: 8,
            duration:2500,
            easing: Easing.linear
        }).start(() => {
            animate();
        });
    };

    const [state,dispatch] = useReducer(reducer,{hasCameraPermission: null,scanned: false});

    const requestCameraPermission = async () => {

        try{
            const {status} = await Permissions.askAsync(Permissions.CAMERA);
            dispatch({
                type: ActionTypes.REQUESTING_CAMERA_PERMISSION,
                payload: status === 'granted'
            });
        }catch(err){

        }
    }

    StatusBar.setHidden(true);

    useEffect(() => {

        requestCameraPermission();
        // animate();

        const listener = navigation.addListener('willFocus', () => {
            StatusBar.setHidden(true);
            dispatch({
                type: ActionTypes.RESET
            });
        });

        return () => {
            listener.remove();
        };

    }, []);

    const handleScannedBarCode = ({type, data}) => {
        dispatch({
            type: ActionTypes.SCANNING_BARCODE,
        });
        navigation.navigate('PostQRData',{
            url:data
        });
    }

    return (
        <View style={{flex: 1}}>
            <Camera
                    style={styles.camera}
                    type={Camera.Constants.Type.back}
                    onBarCodeScanned={state.scanned ? undefined : handleScannedBarCode}
                >
                    {/*<View style={styles.floatingHeader}>
                        <Text h4 style={{textAlign: 'center',color: '#fff'}}>
                            Scan QR Code
                     </Text>
                    </View>
                    */}
                    <BarcodeMask
                        width={300}
                        height={300}
                        showAnimatedLine={true}
                    />
            </Camera>
            {(!state.hasCameraPermission) && (
                <Button style={{justifyContent: 'center'}}
                    title={'tap to scan again'}
                    onPress={() => {
                        requestCameraPermission();
                }} />
            )}
            {/* <SVG width='100%'
                    style={{marginTop: 25}}
                    height='100'
                >
                <G>
                    <Line
                        x1='15'
                        x2='215'
                        y1='50'
                        y2='50'
                        strokeWidth='5'
                        strokeOpacity='0.4'
                        stroke={APP_COLOR}
                    />
                    <Polygon
                        stroke={APP_COLOR}
                        fill={APP_COLOR}
                        strokeWidth={'5'}
                        strokeOpacity={'0.4'}
                        points="215,50 150,70 150,30"
                    />
                </G>
            </SVG> */}
        </View>
    );
}

const styles = StyleSheet.create({

    floatingHeader: {
        position: 'absolute',
        top: 20,
        right: 0,
        left: 0
    },
    camera:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
});

QRScanner.navigationOptions = () => {
    return {
        header: null
    }
}