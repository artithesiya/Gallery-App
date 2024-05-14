// PhotoPager.tsx
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import Video from 'react-native-video';

interface VideoPagerProps {
    route: {
        params: {
            photos: PhotoIdentifier[];
            selectedIndex: number;
        };
    };
}

const VideoPager: React.FC<VideoPagerProps> = ({ route }) => {
    const { photos, selectedIndex } = route.params;
    const [initialPage, setInitialPage] = useState<number>(selectedIndex);
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(null);

    useEffect(() => {
        setInitialPage(selectedIndex);
    }, []);
    const renderImage = ({ item, index }: { item: PhotoIdentifier, index: number }) => (
        <View style={styles.page}>
            <Video
                source={{ uri: item.node.image.uri }}
                style={styles.video}
                controls={true}
                paused={index !== currentVideoIndex}
                onFullscreenPlayerWillDismiss={() => setCurrentVideoIndex(null)}
                onEnd={() => setCurrentVideoIndex(null)}
            />
        </View>
    );
    return (
        <FlatList
            style={{ flex: 1 , }}
            data={photos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(data) => renderImage({ ...data, index: data.index })}
            // getItemLayout={(data, index) => (
            //     { length: Dimensions.get('window').width, offset: Dimensions.get('window').width * index, index }
            // )}
            horizontal
            // initialScrollIndex={initialPage}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        margin: 10
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        // alignSelf: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
        // position:'absolute',
        // top:0,
        // bottom:0,
        // left:0,
        // right:0
    },
});

export default VideoPager;
