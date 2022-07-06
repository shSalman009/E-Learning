import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import useTeachers from "../hooks/useTeachers";
import styles from "../styles/Teachers.module.css";

export default function Teachers() {
    const { teachers, error, loading } = useTeachers();

    return (
        <>
            {loading && "loading..."}
            {error && "something wrong happen"}
            {teachers && teachers.length > 0 && (
                <Element name="teachers" className="element">
                    <div id="teachers" className={styles.teachers}>
                        <div className="container">
                            <div className={styles.main}>
                                <div className={styles.heads}>
                                    <h2 className="head">
                                        Meet With <p className="head-1">Our</p>{" "}
                                        Best <p className="head-2">Teachers</p>
                                    </h2>
                                </div>
                                <div className={styles.items}>
                                    {teachers.map((t) => (
                                        <div key={t.id} className={styles.item}>
                                            <div className={styles.imgWrapper}>
                                                <img src={t.photo} alt="" />
                                            </div>
                                            <div className={styles.body}>
                                                <h4>{t.name}</h4>
                                                {t.skills.map((s, i) => (
                                                    <h5 key={i}>{s}</h5>
                                                ))}
                                                <p>{t.description}</p>
                                                <Link
                                                    to="/teacher"
                                                    state={{ teacher: t }}
                                                >
                                                    <button>More Info</button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Element>
            )}
        </>
    );
}
