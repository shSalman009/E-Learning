import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { TbAlignRight } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import logo from "../images/logo.png";
import styles from "../styles/Topbar.module.css";

export default function Topbar() {
    const [show, setShow] = useState(false);
    const [resOne, setResOne] = useState(
        window.matchMedia("(max-width: 992px)").matches
    );
    const [resTwo, setResTwo] = useState(
        window.matchMedia("(max-width: 768px)").matches
    );

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const goHome = () => {
        navigate("/home");
    };

    useEffect(() => {
        window
            .matchMedia("(max-width: 992px)")
            .addEventListener("change", (e) => setResOne(e.matches));
        window
            .matchMedia("(max-width: 768px)")
            .addEventListener("change", (e) => setResTwo(e.matches));
    }, []);

    const { currentUser, logOut } = useAuth();

    const nav = ["categories", "courses", "teachers"];

    const { quantity } = useCart();

    return (
        <div className={`${styles.topbar}`}>
            <div className={styles.main}>
                <div className={styles.logo}>
                    <img onClick={goHome} src={logo} alt="" />
                    <h4 onClick={goHome}>E-Learning</h4>
                </div>
                {show && (
                    <div
                        onClick={() => {
                            setShow(false);
                        }}
                        className={styles.shape}
                    ></div>
                )}
                <div
                    className={`${show ? styles.show : styles.hide} ${
                        styles.menu
                    }`}
                >
                    {resOne && (
                        <div className={styles.SecondLogo}>
                            <h4>E-Learning</h4>
                            <div
                                className={styles.toggleIcon}
                                onClick={() => {
                                    setShow(false);
                                }}
                            >
                                <IoClose size={30} />
                            </div>
                        </div>
                    )}

                    <ul>
                        {path.includes("home") ? (
                            <li>
                                <ScrollLink
                                    onClick={() => {
                                        setShow && setShow(false);
                                    }}
                                    activeClass="active"
                                    to="home"
                                    spy={true}
                                    smooth={false}
                                    duration={500}
                                >
                                    home
                                </ScrollLink>
                            </li>
                        ) : (
                            <li>
                                <Link to="/home">home</Link>
                            </li>
                        )}
                        {nav.map((item, index) => (
                            <li key={index}>
                                <ScrollLink
                                    onClick={() => {
                                        setShow && setShow(false);
                                    }}
                                    activeClass="active"
                                    to={item}
                                    spy={true}
                                    smooth={false}
                                    duration={500}
                                >
                                    {item}
                                </ScrollLink>
                            </li>
                        ))}
                    </ul>
                    {resTwo && (
                        <div
                            onClick={() => {
                                setShow && setShow(false);
                            }}
                            className={styles.buttons}
                        >
                            <Link to="/login">
                                <button>Login</button>
                            </Link>
                            <p>|</p>
                            <Link to="/signup">
                                <button>register</button>
                            </Link>
                        </div>
                    )}
                </div>
                <div className={styles.account}>
                    <Link to="/cart">
                        <div className={styles.badge}>
                            <p>{currentUser ? quantity : 0}</p>
                            <div>
                                <AiOutlineShoppingCart size={30} />
                            </div>
                        </div>
                    </Link>
                    {currentUser ? (
                        <div className={styles.name}>
                            <h4> {currentUser.displayName}</h4>
                            <FiLogOut onClick={logOut} />
                        </div>
                    ) : (
                        !resTwo && (
                            <div className={styles.buttons}>
                                <Link to="/login">
                                    <button>Login</button>
                                </Link>
                                <p>|</p>
                                <Link to="/signup">
                                    <button>register</button>
                                </Link>
                            </div>
                        )
                    )}
                    {resOne && (
                        <div
                            className={styles.toggleIcon}
                            onClick={() => {
                                setShow(true);
                            }}
                        >
                            <TbAlignRight size={30} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
