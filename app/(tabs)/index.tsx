import { Text, View, StyleSheet, Pressable, Animated } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import detailInfoList from "@/assets/data/testServices";
import DashboardListItem from "@/components/DashboardListItem";
import { useState, useRef } from "react";
import Caret from "@/components/Caret";

export default function Index() {
  //Values for the caret and for animation
  const [caretDown, setCaretDown] = useState(true);
  const rotation = useRef(new Animated.Value(0)).current;

  const caretPress = () => {
    setCaretDown(!caretDown);
    console.log("Caret is down:", !caretDown);
  };

  return (
    <View>
      <FlatList
      ListHeaderComponent={
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Active Details</Text>
        <Caret onPress={caretPress} />
      </View>
    }
      data={detailInfoList}
      renderItem={({ item }) => <DashboardListItem detailInfo={item}/>}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    padding: 6,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  caret: {
    fontSize: 24,
    padding: 6,
  },
})
