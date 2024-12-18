import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, deleteDoc, updateDoc, getDocs } from "firebase/firestore";
import 'dotenv/config';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const locationsCollection = collection(db, "locations");

export default class LocationRepository {

    async insert(location) {

        try {

            console.log(location)

            const docRef = await addDoc(locationsCollection, {
                name: location.name,
                latitude: location.latitude,
                longitude: location.longitude,
                description: location.description,
            });

            return docRef.id;
        } catch (error) {

            console.log(error)

            return null
        }
    }

    async update(location) {

        try {

            const locationDoc = doc(db, "locations", location.id);

            await updateDoc(locationDoc, {
                name: location.name,
                latitude: location.latitude,
                longitude: location.longitude,
                description: location.description,
            });
        } catch (error) {

            console.log(error)
        }
    }

    async delete(id) {

        try {
            const locationDoc = doc(db, "locations", id);
            await deleteDoc(locationDoc);
        } catch (error) {

            console.log(error)
        }
    }

    async getAll() {
        const snapshot = await getDocs(locationsCollection);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    async getById(id) {
        const locationDoc = doc(db, "locations", id);
        const docSnap = await getDoc(locationDoc);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    }
}