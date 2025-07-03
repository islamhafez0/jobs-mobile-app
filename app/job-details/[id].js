import React from "react";
import {
  Text,
  RefreshControl,
  SafeAreaView,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  Company,
  JobAbout,
  JobFooter,
  ScreenHeaderBtn,
  Specifics,
  JobTabs,
} from "../../components";
import {
  useRouter,
  Stack,
  useSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import { useFetch } from "../../hook/useFetch";
import { SIZES, COLORS, icons } from "../../constants";

const JobDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error } = useFetch("job-details", {
    job_id: id,
  });
  console.log(data[0]?.job_google_link);

  const onRefresh = () => {};

  const tabs = ["About", "Qualifications", "Responsibilities"];
  const [activeTab, setActiveTab] = useState(tabs[[0]]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No Data Provided"} />
        );
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights.Qualifications ?? ["N/A"]}
          />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        return <Text>No yet mother fucker</Text>;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No Data</Text>
          ) : (
            <View>
              <Company
                companyLogo={data[0]?.employer_logo}
                jobTitle={data[0]?.job_title}
                companyName={data[0].employer_name}
                country={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {renderTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://www.google.com/about/careers/applications/jobs/results"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
