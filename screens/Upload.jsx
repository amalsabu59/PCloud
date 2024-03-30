import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    // region: 'your-region',
});

const Upload = () => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
        if (!result.cancelled) {
            setImage(result.uri);
            uploadImage(result);
        }
    };

    const uploadImage = async (pickerResult) => {
        const uri = pickerResult.assets[0].uri;

        const response = await fetch(uri).catch((err) => { console.error(err); });
        const blob = await response.blob();

        const params = {
            Bucket: 'pcloud-1',
            Key: uri.split('/').pop(),
            Body: blob,
            ContentType: pickerResult.type,
        };

        s3.upload(params, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(`File uploaded successfully at ${data.Location}`);
            }
        });
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
};

export default Upload;
