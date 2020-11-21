import createContext from './createContext';
import {navigate} from '../navigationRef';
import * as Roles from '../../common/Roles';
import * as API from '../api/api';
import {AsyncStorage} from 'react-native';
import * as AppConstants from '../../common/Constants';

const authReducer = (state, action) => {

    switch(action.type){

        case 'signing_in':
            return {...state, token: null,errMessage: null, isLoading: true};

        case 'sign_in':
            return {...state,token: action.payload,errMessage: null, isLoading: false};

        case 'sign_out':
            return {...state, errMessage: null, token: null};
        case 'err':
            return {...state, errMessage: action.payload, token: null, isLoading: false}
        default:
            return state;
    }
};

const Signin = dispatch => ({email,password}) => {

    dispatch({
        type: 'signing_in',
    });

    API.login(email,password).then( async response => {
        if(response.code && response.code === 200){
            if(response.role_name === Roles.ROLE_STUDENT)
            {
                dispatch({
                    type: 'sign_in',
                    token: response.api_token
                });
                await AsyncStorage.multiSet([[
                    'token', response.api_token
                ],[
                    'username', response.name
                ],[
                    'role', response.role_name
                ]]).then(() => {
                    navigate('MainFlow');
                });

            }else{
                dispatch({
                    type: 'err',
                    payload: 'Only Students are authorized to login'
                });
            }
        }else{
            dispatch({
                type: 'err',
                payload: response.message
            });
        }
    });

};

const Signout = dispatch => async () => {
    dispatch({
        type: 'sign_out'
    });
    await AsyncStorage
        .multiRemove(['token','name','role']).then(() => {
            navigate('Signin');
        });
};

const checkToturial = async () => {
    const tutorial = await AsyncStorage.getItem('tutorial');

    return new Promise((res, reject) => {
        if(tutorial && tutorial === AppConstants.CHECKED)
        {
            res();
        } else{
            reject();
        }
    });
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');

    if(token){
        dispatch({
            type: 'sign_in',
            payload: token
        });

        navigate('MainFlow');
    }else{
        checkToturial().then(() => {
            navigate('Signin');
        }).catch(() => {
            navigate('Welcome');
        });
    }
};

export const {Provider, Context} = createContext(authReducer,{
    Signin, Signout, tryLocalSignin
},{
    errMessage: null,
    token: null,
    isLoading: false
});
