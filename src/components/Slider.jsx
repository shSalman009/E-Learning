import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import sliderImg from "../images/slider.png";
import styles from "../styles/Slider.module.css";

export default function Slider() {
    return (
        <Element name="home">
            <div className={styles.slider}>
                <div className="container h-100">
                    <div className={styles.main}>
                        <div className="row h-100">
                            <div className="col-xxl-6">
                                <div className={styles.left}>
                                    <h4>Start learning from home</h4>
                                    <h2 className="head mx-0">
                                        Build your{" "}
                                        <p className="head-2">success</p> with{" "}
                                        <p className="head-1">E-Learning</p>
                                    </h2>
                                    <p className="lead mb-3">
                                        We are providing high-quality online
                                        courses to improve your skill. Our all
                                        instructors are highly experienced and
                                        experts on self fields.
                                    </p>
                                    <Link
                                        style={{ textAlign: "center" }}
                                        to="/courses"
                                    >
                                        <button className="custom-b">
                                            View Our Courses
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xxl-6">
                                <div className={styles.right}>
                                    <img src={sliderImg} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Element>
    );
}
