import LocationRepository from "../repositories/location_repository.js";
const locationRepository = new LocationRepository();

const Query = {
    helloWorld: () => {
        return "Hello World";
    },
    async locations() {
        try {
            const locations = await locationRepository.getAll();
            return locations;
        } catch (error) {
            return { error: error.message };
        }
    },
    async location(_, { id }) {
        try {
            const location = await locationRepository.getById(id);
            return location;
        } catch (error) {
            return { error: error.message };
        }
    }
};

export default Query;