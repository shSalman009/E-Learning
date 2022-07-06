import book from "../images/book.png";
import cloud from "../images/cloud.png";
import latest from "../images/new.png";
import project from "../images/project.png";
import puzzle from "../images/puzzle.png";
import setting from "../images/setting.png";
import styles from "../styles/Service.module.css";

const arr = [
    {
        img: latest,
        title: "Byte Size Chunks",
        description:
            "We always keep our eyes on the latest and trending technologies to make you up to date with the world. With us, you will never miss the trends.",
    },
    {
        img: cloud,
        title: "Latest Technology",
        description:
            "We design our courses as you can learn a very specific topic in detail, including theory, implementation, projects, and best practices.",
    },
    {
        img: book,
        title: "Make Theory Interesting",
        description:
            "Theoretical knowledge is important. We try to represent theoretical knowledge as much interesting as possible. We don't want to make you bore anyway.",
    },
    {
        img: setting,
        title: "Practical Acknowledgements",
        description:
            "Practical knowledge makes your theory live. We always guide you to implement the theory you have learned possibly in the best and easiest way.",
    },
    {
        img: project,
        title: "Real Life Projects",
        description:
            "To solve real-life problems you need experience. We always try to make complicated things easy by implementing real-life projects.",
    },
    {
        img: puzzle,
        title: "Practices & Challenges",
        description:
            "We provide lots of problems to practice and also throw challenges to make you confident. You don't have to surf the internet to find some practice problems. Your challenge is your progress.",
    },
];

export default function Service() {
    return (
        <div className={styles.service}>
            <div className="container">
                <div className={styles.main}>
                    <div className={styles.items}>
                        {arr.map((e, i) => (
                            <div key={i} className={styles.item}>
                                <div>
                                    <img src={e.img} alt="" />
                                </div>
                                <h4>{e.title}</h4>
                                <p>{e.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
