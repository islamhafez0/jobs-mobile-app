import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SIZES } from "../../../constants";

import styles from "./tabs.style";

const TabButton = ({ item, activeTab, onHandleSearchType }) => (
  <TouchableOpacity
    style={styles.btn(item, activeTab)}
    onPress={onHandleSearchType}
  >
    <Text style={styles.btnText(item, activeTab)}>{item}</Text>
  </TouchableOpacity>
);

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            item={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
      ></FlatList>
    </View>
  );
};

export default Tabs;
