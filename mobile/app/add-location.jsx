import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, KeyboardAvoidingView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRouter } from "expo-router";
import { useLocations } from "../hooks/useLocations";
import Header from "../components/Header";
import { globalStyles } from "../styles/globalStyles";
import { styles } from "../styles/addStyles";

export default function AddLocation() {
    const { addLocation } = useLocations();
    const router = useRouter();

    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleSave = () => {

        if (!name.trim() || !latitude || !longitude) {
            Alert.alert("Erro", "Todos os campos obrigatórios devem ser preenchidos.");
            return;
        }

        addLocation({
            id: Date.now().toString(),
            name: name.trim(),
            latitude,
            longitude,
        });

        router.push("/");
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
                    placeholder="Nome da Localização (obrigatório)"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={[styles.input, styles.readOnly]}
                    placeholder="Latitude"
                    value={latitude ? latitude.toString() : ""}
                    editable={false}
                />

                <TextInput
                    style={[styles.input, styles.readOnly]}
                    placeholder="Longitude"
                    value={longitude ? longitude.toString() : ""}
                    editable={false}
                />

                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onPress={handleMapPress}
                >
                    {selectedLocation && (
                        <Marker coordinate={selectedLocation} />
                    )}
                </MapView>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}


