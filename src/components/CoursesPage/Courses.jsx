import Course from "../sub/Course";
import styles from "./styles/Courses.module.css";

export default function Courses({ courses }) {
    return (
        <div className={styles.courses}>
            {courses && courses.length > 0 ? (
                <div className={styles.items}>
                    {courses.map((course) => (
                        <Course key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className={styles.invalid}>No Course is here </div>
            )}
        </div>
    );
}
