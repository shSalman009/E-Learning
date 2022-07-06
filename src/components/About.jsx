import { Link } from "react-router-dom";
import img from "../images/about-img.png";
import styles from "../styles/About.module.css";

export default function About() {
    return (
        <div className={styles.about}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.main}>
                        <div className={styles.left}>
                            <img src={img} alt="" />
                        </div>
                        <div className={styles.right}>
                            <h2 className="head">
                                Increase Your High{" "}
                                <p className="head-1">Education</p> Level with{" "}
                                <p className="head-2">E-Learning</p>
                            </h2>
                            <p className="lead">
                                Helping employees gain skills and providing
                                career development often take a back seat to
                                business priorities but workplace. We offer
                                fresh courses on emerging topics that keep your
                                level.
                            </p>
                            <ul>
                                <li className="blockquote-footer lead">
                                    Course curriculum
                                </li>
                                <li className="blockquote-footer lead">
                                    Easy to enroll courses
                                </li>
                                <li className="blockquote-footer lead">
                                    Know the latest technology
                                </li>
                            </ul>
                            <Link to="/courses">
                                <button className="custom-b">enroll now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
