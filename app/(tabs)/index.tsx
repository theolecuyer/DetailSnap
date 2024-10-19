import { Text, View, StyleSheet } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import detailInfoList from "@/assets/data/testServices";
import DashboardListItem from "@/components/DashboardListItem";

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlatList
      ListHeaderComponent={<Text style={styles.header}>Recent Details:</Text>}
      data={detailInfoList}
      renderItem={({ item }) => <DashboardListItem detailInfo={item}/>}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      />
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    padding: 6,
  },
})
