import React,{useState,useContext} from 'react';
import {setNavigator} from './src/navigationRef';
import {Provider as AuthProvider, Context as AuthContext} from './src/context/AuthContext';
import { View,StatusBar,Image } from 'react-native';
import {Icon} from 'react-native-elements';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createMaterialTopTabNavigator, MaterialTopTabBar} from 'react-navigation-tabs';
import Startup from './src/screens/Startup';
import Welcome from './src/screens/WelcomeScreen';
import SigninScreen from './src/screens/SigninScreen';
import QRScanner from './src/screens/QRScanner';
import News from './src/screens/NewsScreen';
import PostQRData from './src/screens/PostQRData';
import Statistics from './src/screens/StatisticsScreen';
import {Header} from 'react-native-elements';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import {APP_COLOR} from './common/styles';
import { createStackNavigator } from 'react-navigation-stack';

const switchNavigator = createSwitchNavigator({
  Startup,
  Welcome: {
    screen: Welcome
  },
  Signin: createStackNavigator({
    SigninScreen: {
      screen:SigninScreen
    },
  },{
    defaultNavigationOptions:{
      header: null
    }
  }),
  // AuthFlow: createMaterialTopTabNavigator({
  //   Signin: {
  //     screen: SigninScreen
  //   },
    // Signup :{
    //   screen: SignupScreen,
    //   navigationOptions:{
    //     tabBarLabel: 'Sign up'
    //   }
    // },
  // },{
  //   tabBarComponent: props => (
  //     <>
  //       <Header
  //         placement={'left'}
  //         leftComponent={<Image source={require('./assets/qr-code.jpg')} style={{width:32,height:32}} />}
  //         backgroundColor={APP_COLOR}
  //         containerStyle={{
  //           borderBottomWidth:0
  //         }}
  //         centerComponent={{text: 'QR Code', style:{color:'#fff',fontSize:18}}}
  //       />
  //       <MaterialTopTabBar {...props} />
  //     </>
  //   ),
  //   tabBarOptions:{
  //     activeTintColor:'#fff',
  //     inactiveTintColor: '#D3D3D3',
  //     style:{
  //       backgroundColor: APP_COLOR
  //     },
  //     indicatorStyle:{
  //       backgroundColor: '#fff',
  //     },
  //   },
  //   swipeEnabled: true
  // }),
  MainFlow: createMaterialTopTabNavigator({
    QRScanner: createStackNavigator({
      QRScanner,
      PostQRData
    },{
      navigationOptions:{
        tabBarVisible: false
      }
    }),
    News:{
      screen: News
    },
    Statistics: {
      screen: Statistics
    }
  },{
      tabBarComponent: props => {

        const {Signout} = useContext(AuthContext);

        return(
        <>
          <Header
            placement={'left'}
            leftComponent={<Image source={require('./assets/qr-code.jpg')}
              style={{width:32,height:32}} />}
            backgroundColor={APP_COLOR}
            containerStyle={{
              borderBottomWidth:0
            }}
            centerComponent={{text:'QR Code', style:{color:'#fff',fontSize:18}}}
            rightComponent={
              <Icon size={32}
                name='logout'
                color='#fff'
                type='material-community'
                onPress={() => { Signout() }}
              />}
          />
          <MaterialTopTabBar {...props} />
        </>
      )},
      tabBarOptions:{
        activeTintColor:'#fff',
        inactiveTintColor: '#D3D3D3',
        style:{
          backgroundColor: APP_COLOR,
          elevation: 0
        },
        indicatorStyle:{
          backgroundColor: '#fff',
        },
      },
      swipeEnabled: true
  })
});

const App = createAppContainer(switchNavigator);

export default () => {

  StatusBar.setBackgroundColor(APP_COLOR);

  const [ready, setReady] = useState(false);

  function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  _loadAssetsAsync = async () => {

    const imageAssets = cacheImages([
      require('./assets/qr-code.jpg'),
      require('./assets/qr-code-2.png'),
      require('./assets/attendance.png')
    ]);

    await Promise.all([...imageAssets]);

  }

  if(!ready){
    return(
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={{
      flex: 1,
    }}>
      <AuthProvider>
        <App ref={(nav) => setNavigator(nav)} />
      </AuthProvider>
    </View>
  );
};