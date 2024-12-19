import { useState } from "react";

let sharedLocations = [];

export function useLocations() {

    const [locations, setLocations] = useState(sharedLocations);

    const addLocation = (location) => {
        sharedLocations = [...sharedLocations, location];
        setLocations(sharedLocations);
    };

    const updateLocation = (id, updatedLocation) => {
        sharedLocations = sharedLocations.map((loc) =>
            loc.id === id ? { ...loc, ...updatedLocation } : loc
        );
        setLocations(sharedLocations);
    };

    const removeLocation = (id) => {
        sharedLocations = sharedLocations.filter((loc) => loc.id !== id);
        setLocations(sharedLocations);
    };

    return {
        locations,
        addLocation,
        updateLocation,
        removeLocation,
    };
}