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

export default function Home() {
    const { fetchCartItems, fetchQuantity } = useCart();

    useEffect(() => {
        fetchCartItems();
        fetchQuantity();
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
