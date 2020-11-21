import {StyleSheet} from 'react-native';

export const APP_COLOR = '#D87A56';

export default styles = StyleSheet.create({
    pager:{
        flex: 2,
    },
    page:{
        paddingTop: 30
    },
    pageText:{
        textAlign: 'center',
        fontSize: 20,
        color: '#D87A56' //rgba(216,122,86,0,7)
    },
    container:{
        flex: 1,
        paddingHorizontal: 8,
    },
    inner:{
        flex: 1,
        justifyContent: 'center'
    },
    errText:{
        color: 'red',
        textAlign: 'center',
        fontSize:18
    },
    modal:{
        paddingHorizontal: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    modalBody:{
        width: 300,
        height: 150,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#rgba(127,127,127,0.4)'
    },
    txtModal: {
        color: APP_COLOR,
        fontSize: 16,
        textAlign: 'center'
    }
});