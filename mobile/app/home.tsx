import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Text, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRouter } from "expo-router";
import { useLocations } from "../hooks/useLocations";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { styles } from "../styles/indexStyles";
import { Appearance } from "react-native";
export default function Home() {

const isDarkMode = Appearance.getColorScheme() == 'dark';

console.log(isDarkMode)


  const { locations } = useLocations();
  const router = useRouter();
  const [showList, setShowList] = useState(false);

  const isTablet = Dimensions.get("window").width >= 500;

  let initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
  }

  if(locations.length > 0)
  {
      initialRegion = {
        latitude: locations[0].latitude,
        longitude: locations[0].longitude
      }
  }

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
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => router.push(`/edit-location?id=${item.id}`)}
                >
                  <Text style={styles.listTitle}>{item.name}</Text>
                  <Text style={styles.coordinates}>
                    Lat: {item.latitude}, Lng: {item.longitude}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.mapContainer}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {locations.map((loc) => (
                <Marker
                  key={loc.id}
                  coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                  title={loc.name}
                  onPress={() => router.push(`/edit-location?id=${loc.id}`)}
                />
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
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => router.push(`/edit-location?id=${item.id}`)}
                >
                  <Text style={styles.listTitle}>{item.name}</Text>
                  <Text style={styles.coordinates}>
                    Lat: {item.latitude}, Lng: {item.longitude}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0,
              }}
            >
              {locations.map((loc) => (
                <Marker
                  key={loc.id}
                  coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                  title={loc.name}
                  onPress={() => router.push(`/edit-location?id=${loc.id}`)}
                />
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