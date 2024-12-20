import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Alert, KeyboardAvoidingView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useLocations } from "../context/LocationContext";
import Header from "../components/Header";
import { globalStyles } from "../styles/globalStyles";
import { styles } from "../styles/addStyles";
import { TextInput } from "react-native-paper";

export default function AddLocation() {
    const { addLocation } = useLocations();
    const router = useRouter();

    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Erro", "Permissão de localização não foi concedida.");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});

            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);

    const handleSave = () => {
        if (!name.trim() || !latitude || !longitude) {
            Alert.alert("Erro", "Todos os campos obrigatórios devem ser preenchidos.");
            return;
        }

        addLocation({
            name: name.trim(),
            description: "",
            latitude,
            longitude,
        });

        router.push("/home");
    };

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLatitude(latitude);
        setLongitude(longitude);
        setSelectedLocation({ latitude, longitude });
    };

    return (
        <View style={globalStyles.container}>
            <Header title="Adicionar Localização" showBackButton />

            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TextInput
                    style={styles.input}
                    mode="flat"
                    label="Nome do local"
                    placeholder="Informe o Nome do local"
                    value={name}
                    onChangeText={setName}
                />

                <MapView
                    style={styles.map}
                    initialRegion={currentLocation || {
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={currentLocation}
                    onPress={handleMapPress}
                >
                    {selectedLocation && <Marker coordinate={selectedLocation} />}
                    {currentLocation && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                            }}
                            title="Você está aqui"
                            pinColor="blue" 
                        />
                    )}
                </MapView>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                
            </KeyboardAvoidingView>
        </View>
    );
}