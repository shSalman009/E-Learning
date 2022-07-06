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
    const [isChange, setIsChange] = useState();
    const [addAlert, setAddAlert] = useState(false);
    const [removeAlert, setRemoveAlert] = useState(false);
    const [changeAlert, setChangeAlert] = useState(false);
    const [removeAllALert, setRemoveAllALert] = useState(false);
    const [loading, setLoading] = useState(false);

    const { currentUser } = useAuth();

    const navigate = useNavigate();

    const increment = (id, qty) => {
        setIsChange(true);
        const carts = [...cartItems];
        const cart = cartItems.find((x) => x.id === id);
        cart.qty += qty;
        setCartItems(carts);
        setQuantity((prev) => prev + 1);
    };
    const decrement = (id, qty) => {
        const carts = [...cartItems];
        const cart = cartItems.find((x) => x.id === id);
        if (cart.qty > 1) {
            setIsChange(true);
            cart.qty -= qty;
            setCartItems(carts);
            setQuantity((prev) => prev - 1);
        }
    };

    const updateQuantity = async (qty) => {
        const qtyRef = doc(FireStoreDb, "quantity", currentUser.uid);
        const quantitySnap = await getDoc(qtyRef);
        if (quantitySnap.exists()) {
            await setDoc(doc(FireStoreDb, "quantity", currentUser.uid), {
                quantity: quantitySnap.data().quantity + qty,
            });
            setQuantity(quantitySnap.data().quantity + qty);
        } else {
            await setDoc(doc(FireStoreDb, "quantity", currentUser.uid), {
                quantity: qty,
            });

            setQuantity(qty);
        }
    };

    const handleAddCart = async (product, qn) => {
        setLoading(true);
        if (!currentUser) {
            return navigate("/signup");
        }

        updateQuantity(qn);
        const docRef = doc(
            FireStoreDb,
            "cartItems",
            currentUser.uid + product.id
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const copy = {
                ...docSnap.data().product,
                qty: docSnap.data().product.qty + qn,
            };
            await setDoc(docRef, {
                product: copy,
            });
        } else {
            await setDoc(
                doc(FireStoreDb, "cartItems", currentUser.uid + product.id),
                {
                    product,
                }
            );
        }
        setLoading(false);
        setAddAlert(false);
        setRemoveAlert(false);
        setChangeAlert(false);
        setRemoveAllALert(false);
        setAddAlert(true);
        setTimeout(() => {
            setAddAlert(false);
        }, 3000);
        fetchCartItems();
    };

    const handleRemoveCart = async (product) => {
        // delete product
        await deleteDoc(
            doc(FireStoreDb, "cartItems", currentUser.uid + product.id)
        );
        // update quantity

        await setDoc(doc(FireStoreDb, "quantity", currentUser.uid), {
            quantity: quantity - product.qty,
        });
        fetchQuantity();
        setAddAlert(false);
        setRemoveAlert(false);
        setChangeAlert(false);
        setRemoveAllALert(false);
        setRemoveAlert(true);
        setTimeout(() => {
            setRemoveAlert(false);
        }, 3000);
        fetchCartItems();
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
                setChangeAlert(false);
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
    const handleSaveEdit = async () => {
        // set edited cartItems in database

        setIsChange(false);
        cartItems.forEach(async (product) => {
            await setDoc(
                doc(FireStoreDb, "cartItems", currentUser.uid + product.id),
                {
                    product,
                }
            );
        });
        setAddAlert(false);
        setRemoveAlert(false);
        setChangeAlert(false);
        setRemoveAllALert(false);
        setChangeAlert(true);
        setTimeout(() => {
            setChangeAlert(false);
        }, 3000);
        // set edited quantity in database
        await setDoc(doc(FireStoreDb, "quantity", currentUser.uid), {
            quantity: quantity,
        });
    };
    const handleCancelEdit = async () => {
        setIsChange(false);
        // get cartItems
        fetchCartItems();
        // get quantity
        fetchQuantity();
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
                increment,
                decrement,
                handleSaveEdit,
                handleCancelEdit,
                isChange,
                addAlert,
                removeAlert,
                changeAlert,
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
