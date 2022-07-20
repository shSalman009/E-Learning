import { useEffect } from "react";
import About from "../components/About";
import Categories from "../components/Categories";
import CoursesSection from "../components/Courses";
import Footer from "../components/Footer";
import Service from "../components/Service";
import Slider from "../components/Slider";
import Teachers from "../components/Teachers";
import Topbar from "../components/Topbar";
import { useCart } from "../context/CartContext";
import { usePurchase } from "../context/PurchaseContext";

export default function Home() {
    const { fetchCartItems, fetchQuantity } = useCart();
    const { fetchPurchaseItems } = usePurchase();

    useEffect(() => {
        fetchCartItems();
        fetchQuantity();
        fetchPurchaseItems();
    }, []);

    return (
        <>
            <Topbar />
            <Slider />
            <About />
            <Categories />
            <CoursesSection />
            <Teachers />
            <Service />
            <Footer />
        </>
    );
}
