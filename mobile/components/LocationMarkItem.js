import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function LocationMarkItem({ location, onPress }) {
    return (
        <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
            onPress={onPress}
        />
    )
}