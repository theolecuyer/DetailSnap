// app/(tabs)/[id].tsx
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDetailList } from '@/api/details';
import { ActivityIndicator } from 'react-native';
const DetailPage = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const {data: details, isLoading} = useDetailList();
    const detailInfo = details?.find((p) => p.id === Number(id));
    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{flex: 1}}/>
    }
    console.log(detailInfo?.car_make)
    if (!detailInfo) {
        return <Text>Detail not found</Text>;
      }
    if('car_make' in detailInfo) {
        return (
            <View style={styles.container}>
                <Stack.Screen 
                options={{ 
                    title: `Detail ${detailInfo.car_make + " " + detailInfo.car_model}`,
                    headerLeft: () => (
                        <Pressable onPress={() => router.back()} style={{ marginLeft: 15 }}>
                          <Ionicons name="arrow-back" size={24} color="black" />
                        </Pressable>
                      ),
                }} />
                <Text>{detailInfo.car_make} {detailInfo.car_model}</Text>
                <Text>{detailInfo.open_at}</Text>
                <View>
                    {Array.isArray(detailInfo.services) && detailInfo.services.map((service, index) => (
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
