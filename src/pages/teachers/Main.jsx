import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useCourses from "../../hooks/useCourses";
import styles from "./styles/Main.module.css";

export default function Main() {
  const [availibleCourse, setAvailibleCourse] = useState([]);

  const { state } = useLocation();
  const { error, loading, courses } = useCourses();

  useEffect(() => {
    setAvailibleCourse([]);
    courses &&
      courses.forEach((course) => {
        if (course.tutorId === state.teacher.id) {
          setAvailibleCourse((prev) => [...prev, course]);
        }
      });
  }, [courses, state]);

  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles.wrapper}>
          <div>
            <div className={styles.imgWrapper}>
              <img src={state.teacher.photo} alt="" />
            </div>
          </div>
          <div className={styles.name}>
            <h4>{state.teacher.name}</h4>
          </div>
          <div className={styles.skills}>
            {state.teacher.skills.map((s, i) => (
              <div key={i}>{s}</div>
            ))}
          </div>
          <div className={styles.course}>
            <h4 className="head">
              {" "}
              {availibleCourse.length} <p className="head-1">Availible</p>{" "}
              course of <p className="head-2">{state.teacher.name}</p>{" "}
            </h4>
            <div className={styles.courses}>
              {availibleCourse &&
                availibleCourse.length > 0 &&
                availibleCourse.map((avc) => (
                  <Link
                    key={avc.id}
                    to={`/courses/${avc.title.replace("/", "")}`}
                    state={{ course: avc }}
                  >
                    <div>
                      <div className={styles.courseImg}>
                        <img src={avc.img} alt="" />
                      </div>
                      <h4>{avc.title}</h4>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <div className={styles.description}>
            <div>
              <h4>
                About <span className="head-1">{state.teacher.name}</span>
              </h4>
              <h4>
                Experience as
                {state.teacher.skills.map((s, i) => (
                  <span className="head-2" key={i}>
                    {" "}
                    {s}
                  </span>
                ))}
              </h4>
            </div>
            <p>{state.teacher.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
