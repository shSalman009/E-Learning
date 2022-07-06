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

    const { currentUser } = useAuth();

    const navigate = useNavigate();

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
    const deleteQuantity = async (qty) => {
        const qtyRef = doc(FireStoreDb, "quantity", currentUser.uid);
        const quantitySnap = await getDoc(qtyRef);
        if (quantitySnap.exists()) {
            await setDoc(doc(FireStoreDb, "quantity", currentUser.uid), {
                quantity: quantitySnap.data().quantity - qty,
            });
            setQuantity(quantitySnap.data().quantity - qty);
        } else {
            console.log("Quantity is not exist");
        }
    };

    const handleAddCart = async (product, qn) => {
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
    };

    const handleRemoveCart = async (product, qty) => {
        const docRef = doc(
            FireStoreDb,
            "cartItems",
            currentUser.uid + product.id
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            if (docSnap.data().product.qty === 1) {
                await deleteDoc(
                    doc(
                        FireStoreDb,
                        "cartItems",
                        currentUser.uid + docSnap.data().product.id
                    )
                );
                deleteQuantity(qty);
            } else {
                const copy = {
                    ...docSnap.data().product,
                    qty: docSnap.data().product.qty - qty,
                };
                await setDoc(docRef, {
                    product: copy,
                });
                deleteQuantity(qty);
            }
        } else {
            console.log(
                "Error : Warning!!! may has some bugs in handleRemoveCart()"
            );
        }

        // const exist = cartItems.find((x) => x.id === product.id);
        // if (exist.qty === 1) {
        //     setCartItems(cartItems.filter((x) => x.id !== product.id));
        // } else {
        //     setCartItems(
        //         cartItems.map((x) =>
        //             x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        //         )
        //     );
        // }
    };

    const removeSingleCart = (product) => {
        setQuantity((prev) => prev - product.qty);
        setCartItems(cartItems.filter((item) => item.id !== product.id));
    };

    const handleClearCart = () => {
        setCartItems([]);
        setQuantity(0);
    };

    useEffect(() => {
        const fetchCollection = async () => {
            setCartItems([]);

            const querySnapshot = await getDocs(
                collection(FireStoreDb, "cartItems")
            );
            querySnapshot.forEach((doc) => {
                setCartItems((prev) => [...prev, doc.data().product]);
            });
        };
        fetchCollection();
    }, [currentUser, quantity]);

    useEffect(() => {
        const fetchQuantity = async () => {
            const docRef = doc(FireStoreDb, "quantity", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setQuantity(docSnap.data().quantity);
            }
        };
        fetchQuantity();
        // Only for first time rendered
    }, []);
    return (
        <Context.Provider
            value={{
                cartItems,
                handleAddCart,
                handleRemoveCart,
                removeSingleCart,
                handleClearCart,
                quantity,
            }}
        >
            {children}
        </Context.Provider>
    );
}
