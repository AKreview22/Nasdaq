import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { getTickerDetails } from "@/api";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { API_KEY } from "@/api/config";
import { ThemedContainer } from "@/components/ThemedContainer";

const TickerDetails: React.FC = () => {
  const localParams = useLocalSearchParams();
  const ticker = localParams?.tickerDetails;

  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickerDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTickerDetails(ticker as string);
        setDetails(data.results);
      } catch (error: any) {
        setError(`Failed to fetch ticker details: ${error.message || error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTickerDetails();
  }, [ticker]);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </ThemedView>
    );
  }

  if (!details) {
    return (
      <ThemedView style={styles.noDetailsContainer}>
        <Text style={styles.noDetailsText}>No details available</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          {details?.branding?.icon_url ? (
            <Image
              source={{ uri: `${details.branding.icon_url}?apiKey=${API_KEY}` }}
              style={styles.logo}
            />
          ) : (
            <ThemedContainer style={styles.placeholderLogo}>
              <ThemedText style={styles.placeholderText}>
                {details?.ticker?.substring(0, 2)}
              </ThemedText>
            </ThemedContainer>
          )}
          <View style={styles.headerText}>
            <ThemedText type="title" style={styles.title}>
              {details?.name ?? "N/A"} ({details?.ticker ?? "N/A"})
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              {details?.type ?? "N/A"} - {details?.primary_exchange ?? "N/A"}
            </ThemedText>
          </View>
        </View>
        <ThemedText style={styles.description}>
          {details?.description ?? "N/A"}
        </ThemedText>
        <TouchableOpacity
          onPress={() => Linking.openURL(details?.homepage_url ?? "#")}
        >
          <ThemedText type="link" style={styles.link}>
            Homepage: {details?.homepage_url ?? "N/A"}
          </ThemedText>
        </TouchableOpacity>
        <ThemedContainer style={styles.detailSection}>
          <ThemedText style={styles.sectionTitle}>Company Details</ThemedText>
          <DetailRow label="CIK" value={details?.cik ?? "N/A"} />
          <DetailRow label="Market" value={details?.market ?? "N/A"} />
          <DetailRow
            label="Market Cap"
            value={`$${details?.market_cap?.toLocaleString() ?? "N/A"}`}
          />
          <DetailRow
            label="Currency"
            value={details?.currency_name?.toUpperCase() ?? "N/A"}
          />
          <DetailRow
            label="Locale"
            value={details?.locale?.toUpperCase() ?? "N/A"}
          />
          <DetailRow label="Phone" value={details?.phone_number ?? "N/A"} />
          <DetailRow
            label="Employees"
            value={details?.total_employees?.toLocaleString() ?? "N/A"}
          />
          <DetailRow label="SIC Code" value={`${details?.sic_code ?? "N/A"}`} />
          <DetailRow
            label="SIC Description"
            value={`${details?.sic_description ?? "N/A"}`}
          />
        </ThemedContainer>
        <ThemedContainer style={styles.detailSection}>
          <ThemedText style={styles.sectionTitle}>Address</ThemedText>
          <ThemedText>{details?.address?.address1 ?? "N/A"}</ThemedText>
          <ThemedText>
            {details?.address?.city ?? "N/A"},{" "}
            {details?.address?.state ?? "N/A"}{" "}
            {details?.address?.postal_code ?? "N/A"}
          </ThemedText>
        </ThemedContainer>
      </ScrollView>
    </ThemedView>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View style={styles.detailRow}>
    <ThemedText style={styles.detailLabel}>{label}</ThemedText>
    <ThemedText style={styles.detailValue}>{value}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  content: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  noDetailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDetailsText: {
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 10,
    flexShrink: 1,
  },
  title: {
    fontSize: 24,
    flexWrap: "wrap",
  },
  subtitle: {
    fontSize: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  placeholderLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  detailSection: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: "bold",
  },
  detailValue: {
    flex: 1,
    textAlign: "right",
  },
});

export default TickerDetails;
