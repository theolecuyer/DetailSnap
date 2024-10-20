import { detailInfo } from "@/types";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import defaultImage from '../assets/images/default-image.jpg';
import { Colors } from "@/constants/Colors";

type DashboardListItemProps = {
    detailInfo: detailInfo;
}

const serviceColors: { [key in detailInfo['services'][number]]: string } = {
    'Interior': '#FF5733',
    'Exterior': '#33FF57',
    'Ceramic Coating': '#3357FF',
    'Tint': '#FFC300',
};

const textColors: { [key in detailInfo['services'][number]]: string } = {
    'Interior': '#ffffff',
    'Exterior': '#000000',
    'Ceramic Coating': '#ffffff',
    'Tint': '#000000',
};

const DashboardListItem = ({ detailInfo }: DashboardListItemProps) => {
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
                        <Text style={[styles.servicesText, { color: textColors[service]}]}>{service}</Text>
                    </View>
                ))}
            </View>
        </Pressable>
    );
}

export default DashboardListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(243, 243, 243)',
        borderRadius: 20,
        flex: 1,
        maxWidth: '50%',
        borderWidth: 0.5,
        borderColor: '#ccc',
        paddingBottom: 10,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 155 / 105,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        marginTop: 8,
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        marginVertical: 2,
    },
    servicesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 4,
    },
    dateText: {
        textAlign: 'left',
        fontSize: 12,
        color: '#999',
    },
    servicesText: {
        fontSize: 10,
        color: 'white',
        textAlign: 'left',
        marginHorizontal: 5,
    },
    serviceHighlight: {
        padding: 4,
        borderRadius: 5,
        marginHorizontal: 5,
    },
});
