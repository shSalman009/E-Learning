import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { MdOndemandVideo } from "react-icons/md";
import styles from "./styles/learnpath.module.css";

export default function LearnPath({ path }) {
    const [active, setActive] = useState(null);
    console.log(path);

    return (
        <div>
            <Accordion>
                {path.map((item) => (
                    <Accordion.Item eventKey={item.id} key={item.id}>
                        <Accordion.Header>
                            Section {item.id} - {item.title}
                        </Accordion.Header>
                        <Accordion.Body className={styles.body}>
                            {item.details.map((d, i) => (
                                <div
                                    onClick={() => {
                                        setActive(d.title);
                                    }}
                                    className={`${styles.detailsItem} ${
                                        active === d.title && styles.active
                                    }`}
                                    key={i}
                                >
                                    <div>
                                        {i + 1} : {d.title}
                                    </div>
                                    <div>
                                        <MdOndemandVideo size={20} />
                                        <p>{d.time}</p>
                                    </div>
                                </div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}
