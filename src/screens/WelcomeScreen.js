import React,{useState, useEffect} from 'react';
import {
    View,
    ViewPagerAndroid,
    Platform,
    Image,
    AsyncStorage
} from 'react-native';
import {Text} from 'react-native-elements';
import Constants from 'expo-constants';
import styles, { APP_COLOR } from '../../common/styles';
import SVG,{Circle} from 'react-native-svg';
import * as AppConstants from '../../common/Constants';

const Pages = [
    {
        desc: 'QR Code provides an easy way for Teachers to Register their students attendances',
        imgUrl: require('../../assets/attendance.png')
    },
    {
        desc: 'View Statistics and Subscribe for latest news',
        imgUrl: require('../../assets/qr-code.jpg')
    },
    {
        desc: 'Open your phone camera and Scan the code',
        imgUrl: require('../../assets/qr-code-2.png')
    },
];

export default Welcome = ({navigation}) => {

    const [pageInd, setPageInd] = useState(0);

    const _handlePageScroll = (e) => {
        setPageInd(e.nativeEvent.position);
    }

    return(
        <View style={{flex: 1,paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
            <ViewPagerAndroid
                initialPage={0}
                style={styles.pager}
                onPageSelected={_handlePageScroll}
            >
                {Pages.map((page, index) => {
                    return(
                        <View style={styles.page} key={index}>
                            <Text style={styles.pageText}>
                            {page.desc}</Text>
                            <Image
                                source={page.imgUrl}
                                style={{
                                    width: 250,
                                    height:200,
                                    marginTop: 25,
                                    resizeMode: 'contain',
                                    alignSelf: 'center'
                                }}
                            />
                        </View>
                    );
                })}
            </ViewPagerAndroid>
            <SVG
                width='100%'
                height='25'
                style={{
                    paddingTop: 30
                }}
            >
                {/* cx ---> center x coordinate, yx ---> center y coordinate */}
                {Pages.map((page, index) => {
                    let x = 140 + 40 * index;
                    let y = 15;
                    const rad = 10;
                    return <Circle
                        key={index}
                        cx={x}
                        cy={y}
                        r={rad}
                        fill={index === pageInd ? '#305D7A' : APP_COLOR}
                    />
                })}
            </SVG>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Button
                    style={{
                        justifyContent: 'center'
                    }}
                    title={'Sign in'}
                    onPress={ async () => {
                        await AsyncStorage.setItem('tutorial', AppConstants.CHECKED)
                            .then(() => {
                            navigation.navigate('SigninScreen');
                        }, err => console.log(err));
                    }}
                />
            </View>
        </View>

    );
}