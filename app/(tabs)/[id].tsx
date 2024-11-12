// app/(tabs)/[id].tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import detailInfoList from '@/assets/data/testServices';
const DetailPage = () => {
    const { id } = useLocalSearchParams();
    console.log("here");
    const detailInfo = detailInfoList.find((p) => p.id === Number(id));
    if (!detailInfo) {
        return <Text>Detail not found</Text>;
      }
    if('carMake' in detailInfo) {
        return (
            <View style={styles.container}>
                <Text>{detailInfo.carMake} {detailInfo.carModel}</Text>
                <Text>{new Date(detailInfo.date).toLocaleDateString()}</Text>
                <View>
                    {detailInfo.services.map((service, index) => (
                        <Text key={index}>{service}</Text>
                    ))}
                </View>
            </View>
        );
}
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
});

export default DetailPage;
