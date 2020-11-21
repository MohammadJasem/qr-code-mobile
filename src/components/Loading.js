import React from 'react';
import {Modal, ActivityIndicator, View, Text} from 'react-native';
import styles,{APP_COLOR} from '../../common/styles';

export default Loading = ({isVisible,text}) => {

    return <Modal visible={isVisible} animationType='slide' transparent={true}>
        <View style={styles.modal}>
            <View style={styles.modalBody}>
                <ActivityIndicator color={APP_COLOR} size='small' />
                <Text style={styles.txtModal}>
                    {text}
                </Text>
            </View>
        </View>
    </Modal>
}