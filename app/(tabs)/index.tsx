import { Text, View, StyleSheet, Pressable, Animated, Image, ScrollView, ActivityIndicator } from "react-native";
import DashboardListItem from "@/components/DashboardListItem";
import Caret from "@/components/Caret";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarGroup, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";
import { FlashList } from "@shopify/flash-list";
import { useDetailList, addDetail } from "@/api/details";
import { useEffect } from "react";
export default function Index() {
  const { session, loading, profile, group } = useAuth();
  const { data: details, isLoading, refetch } = useDetailList();

  useEffect(() => {
    if (session && !isLoading && !loading) {
      refetch();
    }
  }, [session, refetch, isLoading, loading]);

  const typedDetailList = (details ?? []) as carDetail[];
  typedDetailList?.push({
    id: "add_card",
    type: "add",
  });

  // Test insert supabase types
  // const myCarDetail: carDetail = {
  //   id: undefined,
  //   group: group.id,
  //   image: 'https://media.ed.edmunds-media.com/gmc/yukon-xl/2023/oem/2023_gmc_yukon-xl_4dr-suv_denali-ultimate_fq_oem_1_1280.jpg',
  //   services: ['Interior', 'Exterior'] as Service[],
  //   open: true,
  //   car_make: 'GMC',
  //   car_model: 'Yukon',
  //   customer: 1,
  //   open_at: undefined,
  //   close_at: null,
  // }
  // const error = addDetail(myCarDetail);

  if (isLoading || loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{flex: 1}}/>
  }
  const fullName = profile ? `${profile.first_name} ${profile.last_name}` : "Doesnt Exist"; 
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
              {fullName}
            </AvatarFallbackText>
            <AvatarBadge />
          </Avatar>
          <Text style={styles.profileText}>{fullName}</Text>
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
      <View style={styles.listContainer}>
      <FlashList
        horizontal
        data={typedDetailList}
        renderItem={({ item }) =>
          item.id === "add_card" ? (
            <Pressable style={styles.addCard} onPress={() => {/* Handle add later */}}>
              <Text style={styles.addText}>+ Add</Text>
            </Pressable>
          ) : (
            <DashboardListItem detailInfo={item} />
          ) 
        }
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id ? item.id.toString() : 'add_card'}
        nestedScrollEnabled={true}
        estimatedItemSize={200}
      />
      </View>

      {/*Completed Header & flastlist*/}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Completed</Text>
        <Caret/>
      </View>

      <View style={styles.listContainer}>
      <FlashList
        horizontal
        data={typedDetailList}
        renderItem={({ item }) =>
          item.id === "add_card" ? (
            <Pressable style={styles.addCard} onPress={() => {/* Handle add later */}}>
              <Text style={styles.addText}>+ Add</Text>
            </Pressable>
          ) : (
            <DashboardListItem detailInfo={item} />
          ) 
        }
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id ? item.id.toString() : 'add_card'}
        nestedScrollEnabled={true}
        estimatedItemSize={200}
      />
      </View>
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
    //gap: 10,
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