import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

const VideoScreen = ({ navigation }: { navigation: any }) => {
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
    const [endCursor, setEndCursor] = useState<string | undefined>('');
    const [fetchingMore, setFetchingMore] = useState<boolean>(false);
    useEffect(() => {
        getAllPhotos();
    }, []);

    const getAllPhotos = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Videos',
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
    function handleOnClick(photos:PhotoIdentifier[],index: number): void {
        navigation.navigate("VideoPager", { photos: photos, selectedIndex: index })
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ index,item }) => (
                    <TouchableOpacity onPress={() => handleOnClick(photos,index)}>
                        <Image source={{ uri: item.node.image.uri }} style={styles.image} />
                    </TouchableOpacity>
                )}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5} // Load more photos when the user is within 50% of the end
            />
        </View>
    )
}

export default VideoScreen

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