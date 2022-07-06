import { useLocation } from "react-router-dom";
import Slider from "../components/CoursesPage/Slider";
import Footer from "../components/Footer";
import Main from "../components/SingleCourse/Main";
import Topbar from "../components/Topbar";

export default function SingleCourse() {
    const { state } = useLocation();

    return (
        <>
            <Topbar />
            <Slider />
            <Main course={state.course} />
            <Footer />
        </>
    );
}
