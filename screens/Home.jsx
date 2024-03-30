import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';
import S3 from 'aws-sdk/clients/s3';
// import RNFetchBlob from 'react-native-fetch-blob';

const s3 = new S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
});

const Home = () => {
    const [files, setFiles] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        const params = {
            Bucket: 'pcloud-1',
        };

        s3.listObjects(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                setFiles(data.Contents);
            }
        });
    };

    const downloadFile = async (file) => {
        setReload((item) => !item)

    };

    const renderItem = ({ item }) => {
        const uri = s3.getSignedUrl('getObject', { Bucket: 'pcloud-1', Key: item.Key });

        return (
            <View style={styles.item}>
                {uri && <Image source={{ uri }} style={{ width: 100, height: 100 }} />}
                <Text>{item.Key}</Text>
                <Button title="Download" onPress={() => downloadFile(item)} />
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={files}
                renderItem={renderItem}
                keyExtractor={(item) => item.Key}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});

export default Home;