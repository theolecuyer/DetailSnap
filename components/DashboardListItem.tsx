import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import defaultImage from '../assets/images/default-image.jpg';
import { Colors } from "@/constants/Colors";
import { Link, useRouter, Href } from "expo-router";
import { memo, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { downloadDetailImage } from "@/api/details";

type DashboardListItemProps = {
    detailInfo: carDetail;
};

const serviceColors: { [key in string]: string } = {
    'Interior': '#f8ae8b',
    'Exterior': '#5e964d',
    'Ceramic Coating': '#627efb',
    'Tint': '#fed54b',
};

const textColors: { [key in string]: string } = {
    'Interior': '#000000',
    'Exterior': '#eeeeee',
    'Ceramic Coating': '#ffffff',
    'Tint': '#000000',
};

const DashboardListItem = ({ detailInfo }: DashboardListItemProps) => {
    const router = useRouter();
    const [image, setImage] = useState<string>('')
    if ('car_make' in detailInfo) {
        const MY_ROUTE = `/(detail)/${detailInfo.id}` as Href
        // Render the car detail card
        const handlePress = () => {
            router.push(MY_ROUTE);
        };
        
        //Load the image every time the detail changes
        useEffect(() => {
            const fetchImage = async () => {
              const imageUrl = await downloadDetailImage(detailInfo);
              setImage(imageUrl);
            };
            fetchImage();
          }, [detailInfo]);
        
        return (
            <Pressable style={styles.container} onPress={handlePress}>
                <View style={styles.imageContainer}>
                    <Image
                        source={image? { uri: image } : {uri: 'https://static.vecteezy.com/system/resources/previews/004/141/669/large_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'}}
                        style={styles.image}
                        resizeMode='cover'
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{detailInfo.car_make + " " + detailInfo.car_model}</Text>
                    <Text style={styles.dateText}>{detailInfo.open_at}</Text>
                </View>
                <View style={styles.servicesContainer}>
                    {Array.isArray(detailInfo.services) && detailInfo.services.map((service, index) => (
                        <View
                            key={index}
                            style={[styles.serviceHighlight, { backgroundColor: serviceColors[service] }]}
                        >
                            <Text style={[styles.servicesText, { color: textColors[service] }]}>{service}</Text>
                        </View>
                    ))}
                </View>
            </Pressable>    
        );
    } else {
        return (
            <Pressable style={[styles.container, styles.addCardContainer]}>
                <Text style={styles.addCardText}>Add New Detail</Text>
            </Pressable>
        );
    }
};

export default DashboardListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(243, 243, 243)',
        borderRadius: 12,
        width: 200,
        height: 200,
        borderWidth: 0.5,
        borderColor: '#ccc',
        marginHorizontal: 5,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1.5,
        overflow: 'hidden',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        marginTop: 4,
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 12,
    },
    dateText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#999',
    },
    servicesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 2,
    },
    servicesText: {
        fontSize: 8,
        textAlign: 'center',
        marginHorizontal: 3,
    },
    serviceHighlight: {
        padding: 2,
        borderRadius: 4,
        marginHorizontal: 3,
    },
    addCardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addCardText: {
        fontSize: 16,
        color: Colors.light.tint,
    },
});
