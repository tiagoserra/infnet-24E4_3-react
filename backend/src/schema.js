import { gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        helloWorld: String
        locations: [location]
        location(id: String!, name: String!): location!
    }

    type Mutation {
        addLocation(newLocation: locationInput): location!
        deleteLocation(id: String!): Boolean
        updateLocation(updateLocation: locationEditInput): location!
    }

    input locationInput {
        name: String
        latitude: Float
        longitude: Float
        description: String
    }

    input locationEditInput {
        id: String
        name: String
        latitude: Float
        longitude: Float
        description: String
    }

    type location {
        id: String
        name: String
        latitude: Float
        longitude: Float
        description: String
    }
`;

export default typeDefs;