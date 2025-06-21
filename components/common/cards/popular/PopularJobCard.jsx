import React from "react";
import { View, Text, Touchable, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageUrl } from "../../../../utils";

const PopularJobCard = ({ selectedTab, item, handlePress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedTab, item)}
      onPress={() => handlePress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedTab, item)}>
        <Image
          source={{
            uri: checkImageUrl(item.employer_logo)
              ? item.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedTab, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
