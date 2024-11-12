// app/(tabs)/[id].tsx
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import detailInfoList from '@/assets/data/testServices';
import { Ionicons } from '@expo/vector-icons';
const DetailPage = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const detailInfo = detailInfoList.find((p) => p.id === Number(id));
    if (!detailInfo) {
        return <Text>Detail not found</Text>;
      }
    if('carMake' in detailInfo) {
        return (
            <View style={styles.container}>
                <Stack.Screen 
                options={{ 
                    title: `Detail ${detailInfo.carMake + " " + detailInfo.carModel}`,
                    headerLeft: () => (
                        <Pressable onPress={() => router.back()} style={{ marginLeft: 15 }}>
                          <Ionicons name="arrow-back" size={24} color="black" />
                        </Pressable>
                      ),
                }} />
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
