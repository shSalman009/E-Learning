import { Link } from "react-router-dom";

import styles from "../../styles/Course.module.css";
import Star from "../Star";

export default function Course({ course }) {
    return (
        <>
            <Link
                to={`/courses/${course.title.replace("/", "")}`}
                state={{ course }}
            >
                <div className={styles.card}>
                    <div className={styles.cardImgWrapper}>
                        <img src={course.img && course.img} alt="" />
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.bodyOne}>
                            <p> {course.content.length} Lesson</p>
                            <h4>
                                {course.price ? `$${course.price}.00` : "Free"}
                            </h4>
                        </div>
                        <h4>{course.title}</h4>
                        <div className={styles.bodyTwo}>
                            <p>Tutor</p>
                            <div>
                                <Star num={5} size={15} />
                                <p>4.8(8)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}
