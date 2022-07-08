import { useEffect, useRef, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import useCategory from "../hooks/useCategory";
import styles from "../styles/Categories.module.css";

export default function Categories() {
    const [resOne, setResOne] = useState(
        window.matchMedia("(max-width: 1400px)").matches
    );
    const [resTwo, setResTwo] = useState(
        window.matchMedia("(max-width: 992px)").matches
    );
    const [resThree, setResThree] = useState(
        window.matchMedia("(max-width: 768px)").matches
    );

    const { categories } = useCategory();

    const prev = useRef(null);
    const next = useRef(null);

    useEffect(() => {
        window
            .matchMedia("(max-width: 1400px)")
            .addEventListener("change", (e) => setResOne(e.matches));
        window
            .matchMedia("(max-width: 992px)")
            .addEventListener("change", (e) => setResTwo(e.matches));
        window
            .matchMedia("(max-width: 768px)")
            .addEventListener("change", (e) => setResThree(e.matches));
    }, []);

    return (
        <Element name="categories">
            <div className={styles.categories}>
                <div className="container">
                    <div className={styles.main}>
                        <div className={styles.head}>
                            <h2 className="head">
                                Explore <p className="head-1"> Our </p> Top{" "}
                                <p className="head-2"> Categories </p>
                            </h2>
                        </div>
                        <div className={styles.items}>
                            <Swiper
                                slidesPerView={
                                    resThree ? 1 : resTwo ? 2 : resOne ? 3 : 4
                                }
                                spaceBetween={30}
                                navigation={{
                                    prevEl: prev.current,
                                    nextEl: next.current,
                                }}
                                onSwiper={(swiper) => {
                                    setTimeout(() => {
                                        swiper.params.navigation.prevEl =
                                            prev.current;
                                        swiper.params.navigation.nextEl =
                                            next.current;
                                        swiper.navigation.destroy();
                                        swiper.navigation.init();
                                        swiper.navigation.update();
                                    });
                                }}
                                modules={[Navigation]}
                                className="mySwiper"
                            >
                                {categories.map((category) => (
                                    <SwiperSlide key={category.id}>
                                        <Link
                                            to="/courses"
                                            state={{
                                                category: category.category,
                                            }}
                                        >
                                            <div className={styles.card}>
                                                <div
                                                    className={
                                                        styles.cardImgWrapper
                                                    }
                                                >
                                                    <img
                                                        src={category.img}
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={styles.cardBody}
                                                >
                                                    <h4>{category.category}</h4>
                                                    <p>
                                                        Availible Course :
                                                        {
                                                            category.availibleCourse
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <button className={styles.prev} ref={prev}>
                                <MdArrowBackIosNew size={40} />
                            </button>
                            <button className={styles.next} ref={next}>
                                <MdArrowForwardIos size={40} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Element>
    );
}
