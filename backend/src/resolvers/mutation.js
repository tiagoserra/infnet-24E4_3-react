import LocationRepository from "../repositories/location_repository.js";

const locationRepository = new LocationRepository();

const Mutation = {
    async addLocation(_, { newLocation }) {        
        try {
            const id = await locationRepository.insert(newLocation);

            newLocation.id = id;

            return newLocation;
        } catch (error) {
            return { error: error.message };
        }
    },
    async updateLocation(_, { updateLocation }) {
        try {
            await locationRepository.update(updateLocation);
            return updateLocation;
        } catch (error) {
            return { error: error.message };
        }
    },
    async deleteLocation(_, { id }) {
        try {
            await locationRepository.delete(id);
            return true;
        } catch (error) {
            return { error: error.message };
        }
    },
};

export default Mutation;