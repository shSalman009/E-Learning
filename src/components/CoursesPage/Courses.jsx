import { AnimatePresence } from "framer-motion";
import Course from "../sub/Course";
import styles from "./styles/Courses.module.css";

export default function Courses({ courses }) {
  return (
    <div className={styles.courses}>
      {courses && courses.length > 0 ? (
        <div className={styles.items}>
          {courses.map((course) => (
            <AnimatePresence key={course.id}>
              <Course course={course} />
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <div className={styles.invalid}>No Course is here </div>
      )}
    </div>
  );
}
