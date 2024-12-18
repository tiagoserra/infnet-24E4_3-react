import { ApolloServer } from "apollo-server";
import typeDefs from "./src/schema.js";
import Query from "./src/resolvers/query.js";
import Mutation from "./src/resolvers/mutation.js";
import 'dotenv/config';


const resolvers = { Query, Mutation };

const server = new ApolloServer({ typeDefs, resolvers });

server
    .listen()
    .then((serverInfo) => {
        console.log(`Serviço em execução: ${serverInfo.url}`);
    });



//console.log(process.env.Hello);
//import LocationRepository from "./src/repositories/location_repository.js";
// async function  insert() {

//     const locationRepository = new LocationRepository();

//     const location = {
//         name: "location 01-----",
//         latitude: 37.78825,
//         longitude: -122.4324,
//         description: "location description",
//     };

//     try {
//         const id = await locationRepository.insert(location);
//         console.log(`id: ${id}}`);
//     } catch (error) {
//         console.log({ error: error.message });
//     }
// }

// async function getAll() {
//     const locationRepository = new LocationRepository();
//     try {
//         const locations = await locationRepository.getAll();
//         console.log(locations);
//     } catch (error) {
//         console.log({ error: error.message });
//     }
// }

// insert();

// getAll();