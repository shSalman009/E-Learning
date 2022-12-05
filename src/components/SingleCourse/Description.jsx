import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";
import useTeachers from "../../hooks/useTeachers";
import Comment from "./Comment";
import styles from "./styles/Description.module.css";

export default function Description({ course, purchased }) {
  const [teacher, setTeacher] = useState();

  const { teachers, loading, error } = useTeachers();

  useEffect(() => {
    setTeacher(teachers.find((t) => t.id === course.tutorId));
  }, [teachers, course]);

  return (
    <>
      {loading && "loading..."}
      {error && "something wron happer"}
      {teachers && teachers.length > 0 && teacher && (
        <div className={styles.description}>
          <div className={styles.title}>
            <h2>{course.title}</h2>
          </div>
          <div className={styles.des}>
            <h4>Description</h4>
            <p>{course.description}</p>
          </div>
          <div className={styles.whatWeLearn}>
            <div className={styles.head}>
              {" "}
              <h4>What We Will Learn</h4>
            </div>
            <ul>
              {course.topic.map((t) => (
                <li key={t}>
                  <FcCheckmark size={40} />
                  <p>{t}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.requirements}>
            <h4>Requirements</h4>
            <ul>
              {course.requirements.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className={styles.courseContent}>
            <Accordion defaultActiveKey="0">
              {course.content.map((ct, index) => (
                <Accordion.Item key={ct.id} eventKey={index}>
                  <Accordion.Header>{ct.title}</Accordion.Header>
                  <Accordion.Body>
                    {ct.details.map((d, i) => (
                      <div className={styles.collapseItem} key={i}>
                        <div>{d.title}</div>
                        <div>{d.time}</div>
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
          <div className={styles.teacher}>
            <div className={styles.imgWrapper}>
              <img src={teacher.photo} alt="" />
            </div>
            <div className={styles.about}>
              <div className={styles.name}>{teacher.name}</div>
              <div className={styles.skills}>
                {teacher.skills.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>

            <div className={styles.bottom}>
              <p>{teacher.description}</p>
            </div>
          </div>
          <Comment courseId={course.id} purchased={purchased} />
        </div>
      )}
    </>
  );
}
