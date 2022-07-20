import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/learning/Main";
import Topbar from "../components/Topbar";
export default function Learning() {
    const { state } = useLocation();

    return (
        <>
            <Topbar />
            <Main item={state} />
            <Footer />
        </>
    );
}
