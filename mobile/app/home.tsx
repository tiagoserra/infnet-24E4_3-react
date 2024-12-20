import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRouter } from "expo-router";
import { useLocations } from "../hooks/useLocations";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { styles } from "../styles/homeStyles";
import { Text } from 'react-native-paper';

import LocationItem from "../components/LocationItem";
import LocationMarkItem from "../components/LocationMarkItem";

export default function Home() {
  const { locations } = useLocations();
  const router = useRouter();
  const [showList, setShowList] = useState(false);
  const isTablet = Dimensions.get("window").width >= 500;

  const mapRef = useRef(null);

  useEffect(() => {
    if (locations.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(
        locations.map((loc) => ({
          latitude: loc.latitude,
          longitude: loc.longitude,
        })),
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [locations]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus locais favoritos</Text>
        {!isTablet && (
          <TouchableOpacity onPress={() => setShowList(!showList)}>
            <MaterialIcons name="list" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {isTablet ? (
        <View style={styles.tabletContainer}>
          <View style={styles.listContainer}>
            <FlatList
              data={locations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <LocationItem location={item} onPress={() => router.push(`/edit-location?id=${item.id}`)} />
              )}
            />
          </View>

          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
              onMapReady={() => {
                if (locations.length > 0) {
                  mapRef.current.fitToCoordinates(
                    locations.map((loc) => ({
                      latitude: loc.latitude,
                      longitude: loc.longitude,
                    })),
                    {
                      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                      animated: true,
                    }
                  );
                }
              }}
            >
              {locations.map((loc) => (
                <LocationMarkItem key={loc.id} location={loc} onPress={() => router.push(`/edit-location?id=${loc.id}`)} />
              ))}
            </MapView>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/add-location")}
          >
            <AntDesign name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {showList ? (
            <FlatList
              data={locations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <LocationItem location={item} onPress={() => router.push(`/edit-location?id=${item.id}`)} />
              )}
            />
          ) : (
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
              onMapReady={() => {
                if (locations.length > 0) {
                  mapRef.current.fitToCoordinates(
                    locations.map((loc) => ({
                      latitude: loc.latitude,
                      longitude: loc.longitude,
                    })),
                    {
                      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                      animated: true,
                    }
                  );
                }
              }}
            >
              {locations.map((loc) => (
                <LocationMarkItem key={loc.id} location={loc} onPress={() => router.push(`/edit-location?id=${loc.id}`)} />
              ))}
            </MapView>
          )}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/add-location")}
          >
            <AntDesign name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}