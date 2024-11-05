import { detailInfo } from "@/types";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import defaultImage from '../assets/images/default-image.jpg';
import { Colors } from "@/constants/Colors";

type DashboardListItemProps = {
    detailInfo: detailInfo;
};

const serviceColors: { [key in string]: string } = {
    'Interior': '#f38a72',
    'Exterior': '#4d965c',
    'Ceramic Coating': '#627efb',
    'Tint': '#fed54b',
};

const textColors: { [key in string]: string } = {
    'Interior': '#ffffff',
    'Exterior': '#000000',
    'Ceramic Coating': '#ffffff',
    'Tint': '#000000',
};

const DashboardListItem = ({ detailInfo }: DashboardListItemProps) => {
    if ('carMake' in detailInfo) {
        // Render the car detail card
        return (
            <Pressable style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={detailInfo.image ? { uri: detailInfo.image } : defaultImage}
                        style={styles.image}
                        resizeMode='cover'
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{detailInfo.carMake + " " + detailInfo.carModel}</Text>
                    <Text style={styles.dateText}>{new Date(detailInfo.date).toLocaleDateString()}</Text>
                </View>
                <View style={styles.servicesContainer}>
                    {detailInfo.services.map((service, index) => (
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
