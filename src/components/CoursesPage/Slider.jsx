import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import sliderImage from "../../images/course-slider.jpg";
import styles from "./styles/Slider.module.css";

export default function Slider() {
    const location = useLocation();
    const pathname = location.pathname;

    const pathnames = pathname.split("/").filter((x) => x);

    return (
        <div className={styles.slider}>
            <img src={sliderImage} alt="" />
            <div className="container" style={{ height: "100%" }}>
                <div className={styles.main}>
                    <div className={styles.breadcrumbs}>
                        <div className={styles.linkWrapper}>
                            <Link to="/home">Home</Link> <RiArrowRightSLine />
                        </div>
                        {pathnames.map((name, index) => {
                            const isLast = index === pathnames.length - 1;
                            return (
                                <div key={index}>
                                    {isLast ? (
                                        <div className={styles.linkWrapper}>
                                            <p>{name}</p>
                                        </div>
                                    ) : (
                                        <div className={styles.linkWrapper}>
                                            <Link to={`/${name}`}>{name}</Link>
                                            <RiArrowRightSLine />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
