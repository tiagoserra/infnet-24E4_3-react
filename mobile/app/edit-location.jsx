import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Alert, KeyboardAvoidingView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useLocations } from "../context/LocationContext";
import Header from "../components/Header";
import { globalStyles } from "../styles/globalStyles";
import { styles } from "../styles/editStyles";
import { TextInput, Button } from "react-native-paper";

export default function EditLocation() {

    const { locations, updateLocation, removeLocation } = useLocations();
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        
        const location = locations.find((loc) => loc.id === id);

        if (location) {
            setName(location.name);
            setLatitude(location.latitude);
            setLongitude(location.longitude);
            setSelectedLocation({ latitude: location.latitude, longitude: location.longitude });
        } 
    }, [id, locations]);

    const handleSave = () => {

        if (!name.trim() || !latitude || !longitude) {
            Alert.alert('Erro', 'Preencha todos os campos e selecione um local no mapa.');
            return;
        }

        const location = locations.find((loc) => loc.id === id);

        location.name = name;
        location.latitude = selectedLocation.latitude;
        location.longitude = selectedLocation.longitude;

        updateLocation(location);

        router.push("/home");
    };

    const handleRemove = () => {
        Alert.alert(
            'Confirmação',
            'Deseja realmente remover esta localização?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Remover',
                    style: 'destructive',
                    onPress: () => {
                        removeLocation(id);

                        router.push("/home");
                    },
                },
            ]
        );
    };

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLatitude(latitude);
        setLongitude(longitude);
        setSelectedLocation({ latitude, longitude });
    };

    return (

        <View style={globalStyles.container}>

            <Header title="Editar Localização" showBackButton />

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
                    initialRegion={{
                        latitude: selectedLocation ? selectedLocation.latitude : 37.78825,
                        longitude: selectedLocation ? selectedLocation.longitude : -122.4324,
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
                <TouchableOpacity style={styles.buttonDelete} onPress={handleRemove}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>
    );
}