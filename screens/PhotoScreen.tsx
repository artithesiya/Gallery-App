import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PhotoScreen = ({navigation}:{navigation:any}) => {
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
    const [endCursor, setEndCursor] = useState<string | undefined>('');
    const [fetchingMore, setFetchingMore] = useState<boolean>(false);
    useEffect(() => {
        getAllPhotos();
    }, []);

    const getAllPhotos = () => {
        CameraRoll.getPhotos({
            first: 500,
            assetType: 'Photos',
            after: endCursor, // Use the endCursor to fetch more photos after the last fetched photo
        })
            .then(r => {
                setPhotos([...photos, ...r.edges]); // Append the new photos to the existing list
                setEndCursor(r.page_info.end_cursor); // Update the endCursor for the next fetch
            })
            .catch((err) => {
                // Error Loading Images
            });
    };

    const handleEndReached = () => {
        if (!fetchingMore) {
            setFetchingMore(true);
            getAllPhotos();
            setFetchingMore(false);
        }
    };
    function handleOnClick(photos: PhotoIdentifier[], index: number): void {
        // navigation.navigate("PhotoPager",{photos,index})
        // console.warn(index)
        navigation.navigate("PhotoPager",{photos:photos, selectedIndex:index})

    }

    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item,index }) => (
                    <TouchableOpacity onPress={()=>handleOnClick(photos,index)}>
                        <Image source={{ uri: item.node.image.uri }} style={styles.image} />
                    </TouchableOpacity>
                )}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5} // Load more photos when the user is within 50% of the end
            />
        </View>
    )
}

export default PhotoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: Dimensions.get('window').width / 3 - 2, // Adjust margin to fit 3 images in a row
        height: Dimensions.get('window').width / 3 - 2, // Adjust margin to fit 3 images in a row
        margin: 1,
    },
})