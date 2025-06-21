import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { SIZES, icons } from "../../../constants";
import styles from "./welcome.style";

const Welcome = () => {
  const router = useRouter();
  const jobTypes = [
    "Full Time",
    "Part Time",
    "Freelance",
    "Popular Jobs",
    "Nearby Jobs",
  ];
  const [activeJobType, setActiveJobType] = useState("Full Time");
  const handleTabPress = (item) => {
    setActiveJobType(item);
    router.push(`/search/${item}`);
  };
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Islam</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="What are you looking for"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => handleTabPress(item)}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
