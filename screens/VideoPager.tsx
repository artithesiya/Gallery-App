// PhotoPager.tsx
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import PagerView from 'react-native-pager-view';

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

    useEffect(() => {
        setInitialPage(selectedIndex);
    }, []);
    const renderImage = ({ item }: { item: PhotoIdentifier }) => (
        <View style={styles.page}>
            <Image
                style={{ width: '100%', height: '100%', margin: 10 }}
                source={{ uri: item.node.image.uri }}
            />

        </View>
    );
    return (
        <FlatList
            data={photos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderImage}
            getItemLayout={(data, index) => (
                { length: Dimensions.get('window').width, offset: Dimensions.get('window').width * index, index }
            )}
            horizontal
            initialScrollIndex={initialPage}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    page: {
        borderWidth: 20, flexShrink: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        borderBlockColor: 'white',
        borderColor: 'white'
    },
    pagerView: {
        flex: 1,
        backgroundColor: 'blue'
    },
    item: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    images: {
        width: '90%',
        height: '90%',
        resizeMode: 'cover',
        padding: 15
    }
});

export default VideoPager;
