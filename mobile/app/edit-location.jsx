import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, KeyboardAvoidingView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useLocations } from "../hooks/useLocations";
import Header from "../components/Header";
import { globalStyles } from "../styles/globalStyles";
import { styles } from "../styles/editStyles";

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
        } else {
            //Alert.alert('Erro', 'Localização não encontrada.');
            router.push("/");
        }
    }, [id, locations]);

    const handleSave = () => {

        if (!name.trim() || !latitude || !longitude) {
            Alert.alert('Erro', 'Preencha todos os campos e selecione um local no mapa.');
            return;
        }

        const updatedLocation = { name: name, latitude: selectedLocation.latitude, longitude: selectedLocation.longitude };
        updateLocation(id, updatedLocation);

        router.push("/");
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

                        router.push("/");
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