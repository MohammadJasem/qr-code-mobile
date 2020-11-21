import React,{useEffect} from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    FlatList,
} from 'react-native';
import {Rating} from 'react-native-elements';
import {APP_COLOR} from '../../common/styles';

const styles = StyleSheet.create({
    courseView:{
        padding: 6,
        borderColor: APP_COLOR,
        borderWidth: 1,
        marginBottom: 12,
        borderRadius: 12
    },
    txtStyle:{
        textAlign: 'center',
        fontSize: 16
    },
    listContainer: {
        padding: 8
    },
    viewRow: {
        flexDirection: 'row',
        marginBottom: 12,
        justifyContent: 'space-between'
    },
    ratingView:{
        flex: 1,
        justifyContent: 'center'
    }
});

const renderCourseCard = ({item, index}) => {
    return <View style={styles.courseView}>
        <View style={styles.viewRow}>
            <Text style={styles.txtStyle}>
                {item.title}
            </Text>
            <Text style={styles.txtStyle}>
                {item.percentage} %
            </Text>
        </View>
        <View style={styles.viewRow}>
            <Text style={[styles.txtStyle,{color: 'green'}]}>
                {item.registered} registered
            </Text>
            <Text style={[styles.txtStyle,{color: 'red'}]}>
                {item.missing} missing
            </Text>
        </View>
        <View style={styles.ratingView}>
            <Rating
                readonly
                fractions={1}
                imageSize={20}
                startingValue={item.rating}
            />
        </View>
    </View>;
}

export default Statistics = ({navigation}) => {

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
            data={[
                {
                    id: 0,
                    title: 'Software Technology',
                    percentage: 64,
                    registered: 7,
                    missing: 3,
                    rating: 4
                },
                {
                    id: 1,
                    title: 'Interactive Media',
                    percentage: 64,
                    registered: 7,
                    missing: 3,
                    rating: 3.2
                },
                {
                    id: 2,
                    title: 'Models of Computation',
                    percentage: 64,
                    registered: 7,
                    missing: 3,
                    rating: 2.7
                }
            ]}
            renderItem={renderCourseCard}
            contentContainerStyle={styles.listContainer}
            keyExtractor = {item => item.id.toString()}
            centerContent={true}
        />
    );
}