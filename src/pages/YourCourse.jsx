import React from "react";
import Topbar from "../components/Topbar";
import Main from "../components/yourcourse/Main";
import { usePurchase } from "../context/PurchaseContext";

export default function YourCourse() {
    const { purchaseItems } = usePurchase();

    return (
        <>
            <Topbar />
            <Main />
        </>
    );
}
