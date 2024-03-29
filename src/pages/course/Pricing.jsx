import { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { GrLanguage, GrPersonalComputer } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./styles/Pricing.module.css";

export default function Pricing({ course, carted, purchased }) {
    const [times, setTimes] = useState(0);
    const { handleAddCart, loading } = useCart();
    const navigate = useNavigate();

    const totalDuration = new Date(times * 1000).toISOString().substr(11, 8);

    useEffect(() => {
        course.content.forEach((c) => {
            c.details.forEach((d) => {
                if (d.time.length <= 5) {
                    const a = ("00:" + d.time).split(":");
                    var seconds = +a[0] * 60 * 60 + +a[1] * 60;
                    setTimes((prev) => (prev += seconds));
                }
            });
        });
    }, [course]);

    return (
        <div className={styles.pricing}>
            <div className={styles.main}>
                <div className={styles.imgWrapper}>
                    <img src={course.img} alt="" />
                </div>
                <div className={styles.price}>
                    <h3>
                        {course.price ? "$" + course.price + ".00" : "Free"}
                    </h3>
                </div>
                <div className={styles.info}>
                    <div className={styles.lecture}>
                        <div>
                            <GrPersonalComputer />
                            <p>Lecture</p>
                        </div>
                        <p>{course.content.length} Lecture</p>
                    </div>
                    <div className={styles.duration}>
                        <div>
                            <AiOutlineFieldTime />
                            <p>Duration</p>
                        </div>
                        <p>{totalDuration}</p>
                    </div>
                    <div className={styles.category}>
                        <div>
                            <BiCategory />
                            <p>Category</p>
                        </div>
                        <p>{course.category}</p>
                    </div>
                    <div className={styles.language}>
                        <div>
                            <GrLanguage />
                            <p>Language</p>
                        </div>
                        <p>English</p>
                    </div>
                    <div className={styles.access}>
                        <div>
                            <BsBookmark />
                            <p>Access</p>
                        </div>
                        <p>Full Lifetime</p>
                    </div>
                    <div className={styles.certificate}>
                        <div>
                            <FaGraduationCap />
                            <p>Certificate</p>
                        </div>
                        <p>Yes</p>
                    </div>
                </div>
                {purchased ? (
                    <div className={styles.buttons}>
                        <button
                            onClick={() =>
                                navigate("/learning", { state: course })
                            }
                        >
                            Enroll Now
                        </button>
                    </div>
                ) : (
                    <div className={styles.buttons}>
                        {course.price && (
                            <>
                                {carted ? (
                                    <button onClick={() => navigate("/cart")}>
                                        View in Cart
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            handleAddCart(course);
                                        }}
                                        disabled={loading}
                                        className={
                                            loading
                                                ? styles.disabled
                                                : undefined
                                        }
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </>
                        )}

                        <button
                            onClick={() => {
                                course.price
                                    ? navigate("/payment", {
                                          state: { products: course },
                                      })
                                    : navigate("/learning", { state: course });
                            }}
                        >
                            {course.price ? "Buy Now" : "Enroll Now"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
