import { Text, View, StyleSheet, Pressable, Animated, Image } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import detailInfoList from "@/assets/data/testServices";
import DashboardListItem from "@/components/DashboardListItem";
import { useState, useRef } from "react";
import Caret from "@/components/Caret";

export default function Index() {
  // //Values for the caret and for animation, unused, possibly future
  // const [caretDown, setCaretDown] = useState(true);
  // const rotation = useRef(new Animated.Value(0)).current;

  // const caretPress = () => {
  //   setCaretDown(!caretDown);
  //   console.log("Caret is down:", !caretDown);
  // };

  return (
    <View style={styles.container}>
      <View style = {styles.profileContainer}>
        <Image source={{uri: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"}}
        style={styles.image}
        resizeMode="cover"
        />
        <Text style={styles.profileText}>Test User</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Active</Text>
        <Caret/>
      </View>
      <FlatList
        horizontal
        data={detailInfoList}
        renderItem={({ item }) => <DashboardListItem detailInfo={item} />}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Completed</Text>
        <Caret/>
      </View>
       <FlatList
        horizontal
        data={detailInfoList}
        renderItem={({ item }) => <DashboardListItem detailInfo={item} />}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width:50,
    height:50,
    marginBottom: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 6,
  },
  listContainer: {
    gap: 10,
    marginBottom: 15,
  },
  profileText: {
    fontSize: 10,
    textAlign: 'center',
    width: 50,
  },
});