import { useReducer, useEffect } from "react";
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

const ACTIONS = {
    FETCH: "fetch",
    ADD: "add",
    UPDATE: "update",
    REMOVE: "remove",
    ERROR: "error",
};

function locationsReducer(state, action) {
    switch (action.type) {
        case ACTIONS.FETCH:
            return { ...state, locations: action.payload };
        case ACTIONS.ADD:
            return { ...state, locations: [...state.locations, action.payload] };
        case ACTIONS.UPDATE:
            return {
                ...state,
                locations: state.locations.map((loc) =>
                    loc.id === action.payload.id ? { ...loc, ...action.payload } : loc
                ),
            };
        case ACTIONS.REMOVE:
            return {
                ...state,
                locations: state.locations.filter((loc) => loc.id !== action.payload),
            };
        case ACTIONS.ERROR:
            console.error(action.payload);
            return { ...state, error: action.payload };
        default:
            throw new Error(`Ação desconhecida: ${action.type}`);
    }
}

export function useLocations() {
    const [state, dispatch] = useReducer(locationsReducer, {
        locations: [],
        error: null,
    });

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await request(env.API_GQL_URL, FETCH_LOCATIONS);
                dispatch({ type: ACTIONS.FETCH, payload: data.locations || [] });
            } catch (error) {
                dispatch({ type: ACTIONS.ERROR, payload: error });
            }
        };

        fetchLocations();
    }, []);

    const addLocation = async (location) => {
        try {
            const variables = { newLocation: location };
            const data = await request(env.API_GQL_URL, ADD_LOCATION, variables);
            dispatch({ type: ACTIONS.ADD, payload: data.addLocation });
        } catch (error) {
            dispatch({ type: ACTIONS.ERROR, payload: error });
        }
    };

    const updateLocation = async (updatedLocation) => {
        try {
            const variables = { updateLocation: updatedLocation };
            const data = await request(env.API_GQL_URL, UPDATE_LOCATION, variables);
            dispatch({ type: ACTIONS.UPDATE, payload: data.updateLocation });
        } catch (error) {
            dispatch({ type: ACTIONS.ERROR, payload: error });
        }
    };

    const removeLocation = async (id) => {
        try {
            const variables = { deleteLocationId: id };
            await request(env.API_GQL_URL, REMOVE_LOCATION, variables);
            dispatch({ type: ACTIONS.REMOVE, payload: id });
        } catch (error) {
            dispatch({ type: ACTIONS.ERROR, payload: error });
        }
    };

    return {
        locations: state.locations,
        addLocation,
        updateLocation,
        removeLocation,
    };
}