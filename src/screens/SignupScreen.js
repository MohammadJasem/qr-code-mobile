import React,{useState} from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import {Icon } from 'react-native-elements';
import styles,{APP_COLOR} from '../../common/styles';
import {View,Picker} from 'react-native';

export default SignupScreen = () => {

    const [fullName, setFullName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [major, setMajor] = useState('');

    return (
        <View style={styles.container}>
            <Input
                placeholder={'Full Name'}
                value={fullName}
                behavior={'default'}
                onChangeText={(fullName) => setFullName(fullName)}
                icon={
                    <Icon
                        name='user'
                        color={APP_COLOR}
                        type='font-awesome'
                    />
                }
            />
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
                value={password}
                secure={true}
                behavior={'default'}
                onChangeText={(password) => setPassword(password)}
                icon={
                    <Icon
                        type='font-awesome'
                        color={APP_COLOR}
                        name='lock'
                    />
                }
            />
            <Input
                placeholder={'Confirm Password'}
                value={confirmPassword}
                behavior={'default'}
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                icon={
                    <Icon
                        type='font-awesome'
                        color={APP_COLOR}
                        name='lock'
                    />
                }
            />
            <Picker
                style={{
                    marginBottom: 30,
                }}

                selectedValue={major}
                onValueChange={(val, ind) => setMajor(val)}
            >
                <Picker.Item  color={APP_COLOR} label={'Software and Service Architecture'}
                    value={'SSA'}
                />
                <Picker.Item color={APP_COLOR} label={'Artificial Intelligence'}
                    value={'AI'}
                />
                <Picker.Item color={APP_COLOR} label={'Autonomous Systems'}
                    value={'AS'}
                />
                <Picker.Item color={APP_COLOR} label={'Data Science'}
                    value={'DS'}
                />
            </Picker>
            <Button
                icon={{type: 'font-awesome',name:'user-plus'}}
                title={'Register'}
                onPress={() => {}}
            />
        </View>
    );
}