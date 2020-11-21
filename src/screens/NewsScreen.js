import React,{useEffect} from 'react';
import {FlatList,StatusBar} from 'react-native';
import {View,StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {APP_COLOR} from '../../common/styles';

const styles = StyleSheet.create({
    newsContainer:{
        padding: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: APP_COLOR,
        marginBottom: 12
    },
    titleStyle:{
        color: APP_COLOR,
        fontWeight: 'bold',
        fontSize: 20
    },
    contentStyle:{
        color: APP_COLOR,
        fontSize: 16
    },
    listContainer:{
        padding: 5
    }
});

const renderNewsItem = ({item,index}) => {
    return(
        <View style={styles.newsContainer} key={index}>
            <Text h4 style={styles.titleStyle}>
                {item.title}
            </Text>
            <Text style={styles.contentStyle}>
                {item.content}
            </Text>
        </View>
    );
}

export default News = ({navigation}) => {

    useEffect(()=> {

        const listener = navigation.addListener('willFocus', () => {
            StatusBar.setHidden(false);
        });

        return () => {
            listener.remove();
        }
    },[]);

    return (
        <FlatList
            data={[{
                id: 0,
                title:'What is lorem Ipsum?',
                content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s \
                 standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \
                 It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised \
                 in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            },{
                id:1,
                title: 'Why do we use it?',
                content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, \
                as opposed to using \'Content here, content here\', \
                making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'\
                lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident,\
                sometimes on purpose (injected humour and the like)'
            }]}
            renderItem={renderNewsItem}
            centerContent={true}
            contentContainerStyle={styles.listContainer}
            keyExtractor={item => item.id.toString()}
        />
    );
}