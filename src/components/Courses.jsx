import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import useCourses from "../hooks/useCourses";
import styles from "../styles/Courses.module.css";
import Course from "./sub/Course";

export default function Courses() {
    const [resOne, setResOne] = useState(
        window.matchMedia("(max-width: 992px)").matches
    );

    const { loading, error, courses } = useCourses();

    useEffect(() => {
        window
            .matchMedia("(max-width: 992px)")
            .addEventListener("change", (e) => setResOne(e.matches));
    }, []);

    return (
        <>
            {loading && "loading..."}
            {error && "something wrong happen "}
            {!loading && !error && courses && courses.length > 0 && (
                <Element name="courses">
                    <div className={styles.course}>
                        <div className="container">
                            <div className={styles.head}>
                                <h2 className="head">
                                    Explore <p className="head-1">Our</p> Top{" "}
                                    <p className="head-2">Courses</p>
                                </h2>
                            </div>
                            <div className={styles.items}>
                                {courses.map(
                                    (course, index) =>
                                        index < (resOne ? 6 : 8) && (
                                            <Course
                                                key={course.id}
                                                course={course}
                                            />
                                        )
                                )}
                            </div>
                            <div className={styles.viewMore}>
                                <Link to="/courses">
                                    <button className="custom-b">
                                        View All Courses
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Element>
            )}
        </>
    );
}
