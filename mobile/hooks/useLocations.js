import { useState, useEffect } from "react";
import { request, gql } from "graphql-request";
import env from '../constants/env.backend';

const FETCH_LOCATIONS = gql`
    query {
        locations {
            id
            name
            latitude
            longitude
        }
    }
`;

const ADD_LOCATION = gql`
    mutation AddLocation($newLocation: locationInput) {
        addLocation(newLocation: $newLocation) {
            id
            name
            latitude
            longitude
            description
        }
    }
`;

const UPDATE_LOCATION = gql`
    mutation UpdateLocation($updateLocation: locationEditInput) {
        updateLocation(updateLocation: $updateLocation) {
            id
            name
            latitude
            longitude
            description
        }
    }
`;

const REMOVE_LOCATION = gql`
    mutation DeleteLocation($deleteLocationId: String!) {
        deleteLocation(id: $deleteLocationId)
    }
`;

export function useLocations() {

    const [locations, setLocations] = useState([]);

    useEffect(() => {

        const fetchLocations = async () => {
            try {
                const data = await request(env.API_GQL_URL, FETCH_LOCATIONS);
                setLocations(data.locations || []);
            } catch (error) {
                console.error("Erro ao buscar locations:", error);
            }
        };

        fetchLocations();
    }, [env.API_GQL_URL]);


    const addLocation = async (location) => {
        try {
            
            const variables = { newLocation: location };
            
            const data = await request(env.API_GQL_URL, ADD_LOCATION, variables);

            setLocations((prevLocations) => [...prevLocations, data.addLocation]);
        } catch (error) {
            console.error("Erro ao adicionar localização:", error);
        }
    };

    const updateLocation = async (updatedLocation) => {
        try {
            const variables = { updateLocation: updatedLocation };
            const data = await request(env.API_GQL_URL, UPDATE_LOCATION, variables);
            setLocations((prevLocations) =>
                prevLocations.map((loc) =>
                    loc.id === updatedLocation.id ? { ...loc, ...data.updateLocation } : loc
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar localização:", error);
        }
    };

    const removeLocation = async (id) => {
        try {
            const variables = { deleteLocationId: id };
            await request(env.API_GQL_URL, REMOVE_LOCATION, variables);
            setLocations((prevLocations) =>
                prevLocations.filter((loc) => loc.id !== id)
            );
        } catch (error) {
            console.error("Erro ao remover localização:", error);
        }
    };


    return {
        locations,
        addLocation,
        updateLocation,
        removeLocation,
    };
}