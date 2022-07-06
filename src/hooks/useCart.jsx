import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FireStoreDb } from "../firebase";

function useCarts() {
    const [quantity, setQuantity] = useState(0);
    const [error, setError] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const { currentUser } = useAuth();
    useEffect(() => {
        const fetchCollection = async () => {
            const querySnapshot = await getDocs(
                collection(FireStoreDb, "cartItems")
            );
            querySnapshot.forEach((doc) => {
                setCartItems((prev) => [...prev, doc.data().product]);
            });
        };
        fetchCollection();

        const fetchQuantity = async () => {
            const docRef = doc(FireStoreDb, "quantity", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setQuantity(docSnap.data().quantity);
            }
        };
        fetchQuantity();
    }, [currentUser]);

    return {
        quantity,
        error,
        cartItems,
    };
}
