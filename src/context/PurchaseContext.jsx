import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { FireStoreDb } from "../firebase";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";

const Context = createContext();

export const usePurchase = () => {
    return useContext(Context);
};

export default function PurchaseContext({ children }) {
    const [purchaseItems, setPurchaseItems] = useState([]);

    const { cartItems, handleRemoveCart } = useCart();
    const { currentUser } = useAuth();

    const addCartPurchase = async (products) => {
        products.forEach(async (product) => {
            await setDoc(
                doc(FireStoreDb, "purchaseItems", currentUser.uid + product.id),
                {
                    product,
                }
            );
        });

        fetchPurchaseItems();
    };
    const addSinglePurchase = async (product) => {
        if (cartItems && cartItems.length > 0) {
            cartItems.forEach((cart) => {
                if (cart.id === product.id) {
                    handleRemoveCart(product, false);
                }
            });
            fetchPurchaseItems();
        }

        await setDoc(
            doc(FireStoreDb, "purchaseItems", currentUser.uid + product.id),
            {
                product,
            }
        );
    };

    const fetchPurchaseItems = async () => {
        const store = [];
        if (currentUser) {
            const querySnapshot = await getDocs(
                collection(FireStoreDb, "purchaseItems")
            );
            querySnapshot.forEach((doc) => {
                if (doc.id === currentUser.uid + doc.data().product.id) {
                    store.push(doc.data().product);
                }
            });
            setPurchaseItems(store);
        }
    };

    useEffect(() => {
        fetchPurchaseItems();
    }, []);

    return (
        <Context.Provider
            value={{
                addCartPurchase,
                purchaseItems,
                addSinglePurchase,
                fetchPurchaseItems,
            }}
        >
            {children}
        </Context.Provider>
    );
}
