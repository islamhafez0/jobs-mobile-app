import styles from "./nearbyjobs.style";
import { ActivityIndicator, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { useFetch } from "../../../hook/useFetch";
import { COLORS } from "../../../constants";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, error, isLoading } = useFetch("search", {
    query: "Node Js Developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearbay Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nerabay-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
