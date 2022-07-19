import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
} from "firebase/firestore";
import { FireStoreDb } from "../firebase";

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Context = createContext();

export const useCart = () => {
    return useContext(Context);
};

export default function CartContext({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [addAlert, setAddAlert] = useState(false);
    const [removeAlert, setRemoveAlert] = useState(false);
    const [removeAllALert, setRemoveAllALert] = useState(false);
    const [loading, setLoading] = useState(false);

    const { currentUser } = useAuth();

    const navigate = useNavigate();

    const updateQuantity = async () => {
        const qtyRef = doc(FireStoreDb, "quantity", currentUser.uid);
        const quantitySnap = await getDoc(qtyRef);
        if (quantitySnap.exists()) {
            await setDoc(doc(FireStoreDb, "quantity", currentUser.uid), {
                quantity: quantitySnap.data().quantity + 1,
            });
            setQuantity(quantitySnap.data().quantity + 1);
        } else {
            await setDoc(doc(FireStoreDb, "quantity", currentUser.uid), {
                quantity: 1,
            });

            setQuantity(1);
        }
    };

    const handleAddCart = async (product) => {
        if (!currentUser) {
            return navigate("/signup");
        }
        setLoading(true);
        updateQuantity();

        await setDoc(
            doc(FireStoreDb, "cartItems", currentUser.uid + product.id),
            {
                product,
            }
        );

        setLoading(false);
        setAddAlert(false);
        setRemoveAlert(false);
        setRemoveAllALert(false);
        setAddAlert(true);
        setTimeout(() => {
            setAddAlert(false);
        }, 3000);
        fetchCartItems();
    };

    const handleRemoveCart = async (product, alert) => {
        // delete product
        await deleteDoc(
            doc(FireStoreDb, "cartItems", currentUser.uid + product.id)
        );
        // update quantity

        await setDoc(doc(FireStoreDb, "quantity", currentUser.uid), {
            quantity: quantity - 1,
        });
        if (alert) {
            fetchQuantity();
            setAddAlert(false);
            setRemoveAlert(false);
            setRemoveAllALert(false);
            setRemoveAlert(true);
            setTimeout(() => {
                setRemoveAlert(false);
            }, 3000);
            fetchCartItems();
        }
    };

    const handleClearCart = async (para) => {
        // para returns  true / false for alert show or not

        if (cartItems.length > 0 && quantity > 0) {
            const querySnapshot = await getDocs(
                collection(FireStoreDb, "cartItems")
            );
            querySnapshot.forEach(async (document) => {
                // delete cartItems
                await deleteDoc(
                    doc(
                        FireStoreDb,
                        "cartItems",
                        currentUser.uid + document.data().product.id
                    )
                );
            });
            if (para) {
                setAddAlert(false);
                setRemoveAlert(false);
                setRemoveAllALert(false);
                setRemoveAllALert(true);
                setTimeout(() => {
                    setRemoveAllALert(false);
                }, 3000);
            }

            // delete quantity
            await deleteDoc(doc(FireStoreDb, "quantity", currentUser.uid));

            // fetching datas
            fetchCartItems();
            fetchQuantity();
        }
    };

    const fetchCartItems = async () => {
        const store = [];
        if (currentUser) {
            const querySnapshot = await getDocs(
                collection(FireStoreDb, "cartItems")
            );
            querySnapshot.forEach((doc) => {
                if (doc.id === currentUser.uid + doc.data().product.id) {
                    store.push(doc.data().product);
                }
            });
            setCartItems(store);
        }
    };
    const fetchQuantity = async () => {
        if (currentUser) {
            const docRef = doc(FireStoreDb, "quantity", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setQuantity(docSnap.data().quantity);
            } else {
                setQuantity(0);
            }
        }
    };

    useEffect(() => {
        fetchCartItems();
        fetchQuantity();

        // Only for first time rendered
    }, []);

    return (
        <Context.Provider
            value={{
                cartItems,
                quantity,
                handleAddCart,
                handleRemoveCart,
                handleClearCart,
                addAlert,
                removeAlert,
                removeAllALert,
                loading,
                fetchCartItems,
                fetchQuantity,
            }}
        >
            {children}
        </Context.Provider>
    );
}
