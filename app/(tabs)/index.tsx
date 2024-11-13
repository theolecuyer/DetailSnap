import { Text, View, StyleSheet, Pressable, Animated, Image, ScrollView } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import detailInfoList from "@/assets/data/testServices";
import DashboardListItem from "@/components/DashboardListItem";
import { useState, useRef, useEffect } from "react";
import Caret from "@/components/Caret";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarGroup, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";

export default function Index() {
  // //Values for the caret and for animation, unused, possibly future
  // const [caretDown, setCaretDown] = useState(true);
  // const rotation = useRef(new Animated.Value(0)).current;

  // const caretPress = () => {
  //   setCaretDown(!caretDown);
  //   console.log("Caret is down:", !caretDown);
  // };

  return (
    <ScrollView style={styles.container}>
      {/*Team Header*/}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Team</Text>
      <Caret/>
      
      </View>
      
      {/*Profile photo rendering*/}
      <HStack space={"md"} style={styles.hStackContainer}>
        <VStack style={{paddingRight:10}}>
          <Avatar style={styles.image} size="md" className="border-2 border-outline-0 bg-orange-300">
            <AvatarFallbackText className="text-white">
              Test User
            </AvatarFallbackText>
            <AvatarBadge />
          </Avatar>
          <Text style={styles.profileText}>Test User</Text>
      </VStack>
      {/*Placeholders for now, mapping func later*/}
      <AvatarGroup>
        <Avatar style={styles.image} size="md" className="border-2 border-outline-0 bg-indigo-600">
          <AvatarFallbackText className="text-white">
              O B
          </AvatarFallbackText>
        </Avatar>
        <Avatar style={styles.image} size="md" className="border-2 border-outline-0 bg-emerald-600">
          <AvatarFallbackText className="text-white">
              Test L
          </AvatarFallbackText>
        </Avatar>
        <Avatar style={styles.image} size="md" className="border-2 border-outline-0 bg-cyan-600">
          <AvatarFallbackText className="text-white">
              D K
          </AvatarFallbackText>
        </Avatar>
        <Avatar style={styles.image} size="md" className="border-2 border-outline-0 bg-gray-600">
          <AvatarFallbackText className="text-white">
              +
              2
          </AvatarFallbackText>
        </Avatar>
      </AvatarGroup>
      </HStack>

      {/*Active Header & flastlist*/}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Active</Text>
        <Caret/>
      </View>
      <FlatList
        horizontal
        data={detailInfoList}
        renderItem={({ item }) =>
          item.id === "add_card" ? (
            <Pressable style={styles.addCard} onPress={() => {/* Handle add later */}}>
              <Text style={styles.addText}>+ Add</Text>
            </Pressable>
          ) : (
            <DashboardListItem detailInfo={item} />
          ) 
        }
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={false}
      />

      {/*Completed Header & flastlist*/}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Completed</Text>
        <Caret/>
      </View>
      <FlatList
        horizontal
        data={detailInfoList}
        renderItem={({ item }) =>
          item.id === "add_card" ? (
            <Pressable style={styles.addCard} onPress={() => {/* Handle add later */}}>
              <Text style={styles.addText}>+ Add</Text>
            </Pressable>
          ) : (
            <DashboardListItem detailInfo={item} />
          ) 
        }
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
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
  hStackContainer: {
    marginBottom: 10,
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
  addCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
    marginLeft: 10,
    borderRadius: 8,
  },
  addText: {
    fontSize: 18,
    color: '#555',
  },
});