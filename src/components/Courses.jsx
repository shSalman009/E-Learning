import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import useCourses from "../hooks/useCourses";
import styles from "../styles/Courses.module.css";
import LoadingMotion from "./loading_motion";
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
      <div className="bg-white py-5">
        <div className="container text-center">
          {loading && <LoadingMotion />}
          {error && (
            <div>
              <p className="h2 text-warning">Sorry! Can't load Courses</p>
<<<<<<< HEAD
=======

              <p className="text-danger h5">Something Wrong Happen</p>
>>>>>>> shSalman009-patch-1
            </div>
          )}
        </div>
      </div>

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
                      <Course key={course.id} course={course} />
                    )
                )}
              </div>
              <div className={styles.viewMore}>
                <Link to="/courses">
                  <button className="custom-b">View All Courses</button>
                </Link>
              </div>
            </div>
          </div>
        </Element>
      )}
    </>
  );
}
