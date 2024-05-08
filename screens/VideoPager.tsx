// PhotoPager.tsx
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import PagerView from 'react-native-pager-view';
// import Video from 'react-native-video';
// import Carousel from 'react-native-snap-carousel';

interface VideoPagerProps {
    route: {
        params: {
            photos: PhotoIdentifier[];
            selectedIndex: number;
        };
    };
}

// const PhotoPager: React.FC<PhotoPagerProps> = ({ photos, selectedIndex }) => {
const VideoPager: React.FC<VideoPagerProps> = ({ route }) => {
    const { photos, selectedIndex } = route.params;
    const [initialPage, setInitialPage] = useState<number>(selectedIndex);

    useEffect(() => {
        setInitialPage(selectedIndex);
        // console.warn(initialPage)

    }, []);
    // const renderItem = ({ item }: { item: PhotoIdentifier }) => {
    //     return (
    //         <View style={styles.item}>
    //             <Image source={{ uri: item.node.image.uri }} style={styles.image} />
    //         </View>
    //     );
    // };
    const renderImage = ({ item }: { item: PhotoIdentifier }) => (
        // <View style={styles.page}>
        //     <ReactNativeZoomableView
        //         maxZoom={30}
        //         contentWidth={500}
        //         contentHeight={500}
        //     >
        //         <Image source={{ uri: item.node.image.uri }} style={styles.images} />
        //     </ReactNativeZoomableView>
        // </View>
        <View style={styles.page}>
            <ReactNativeZoomableView
                maxZoom={30}
                // Give these to the zoomable view so it can apply the boundaries around the actual content.
                // Need to make sure the content is actually centered and the width and height are
                // dimensions when it's rendered naturally. Not the intrinsic size.
                // For example, an image with an intrinsic size of 400x200 will be rendered as 300x150 in this case.
                // Therefore, we'll feed the zoomable view the 300x150 size.
                contentWidth={Dimensions.get('window').width}
                contentHeight={Dimensions.get('window').height}
            >
                {/* <Text style={{color:'black'}}>{item.node.image.uri}</Text> */}
                <Image
                    style={{ width: '100%', height: '100%',  margin: 10 }}
                    source={{ uri: item.node.image.uri }}
                />
               
            </ReactNativeZoomableView>
        </View>
    );
    return (
        // <PagerView style={styles.pagerView} initialPage={initialPage} useNext={true}>

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
        // </PagerView>
        // <View>
        //     <Text style={{ color: 'black', fontSize: 20 }}>selectedIndex: {photos.length}</Text>
        //     {/* <Carousel
        //         data={photos}
        //         renderItem={renderItem}
        //         sliderWidth={Dimensions.get('window').width}
        //         itemWidth={Dimensions.get('window').width}
        //         initialScrollIndex={selectedIndex}
        //     /> */}
        // </View>

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
    // ,image: {
    //     width: Dimensions.get('window').width - 10, // Adjust margin to fit 3 images in a row
    //     height: Dimensions.get('window').width - 10, // Adjust margin to fit 3 images in a row
    //     margin: 1,
    // },
});

export default VideoPager;
