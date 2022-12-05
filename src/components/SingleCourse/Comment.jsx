import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FiMoreVertical } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useComment } from "../../context/CommentContext";
import styles from "./styles/comment.module.css";
import TimeAgo from "./TimeAgo";

export default function Comment({ courseId, purchased }) {
  const [term, setTerm] = useState("");
  const [term2, setTerm2] = useState("");
  const [show, setShow] = useState(null);
  const [edit, setEdit] = useState(null);
  const [myComments, setMyComment] = useState([]);

  const { currentUser } = useAuth();
  const { addComment, deleteComment, updateComment, comments } = useComment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment(courseId, term);
    setTerm("");
  };
  const handleChangeSubmit = async (e, key) => {
    e.preventDefault();
    await updateComment(key, term2);
    setTerm2("");
    setEdit(null);
  };

  useEffect(() => {
    const copy = [];
    comments.forEach((comment) => {
      if (comment.courseId === courseId) {
        copy.push(comment);
      }
    });
    setMyComment(copy);
  }, [comments, courseId]);

  return (
    <div className={styles.main}>
      {/* Add Comment */}
      {currentUser && (
        <form onSubmit={handleSubmit}>
          <div className={styles.add}>
            <div className={styles.avater}>
              <span> {currentUser.displayName.charAt(0)}</span>
            </div>
            <Form.Control
              disabled={purchased ? false : true}
              className="w-100"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              type="text"
              placeholder={
                purchased ? "Comment..." : " You can't comment without purchase"
              }
            />
          </div>
        </form>
      )}

      {/* User Comments */}
      <div className={styles.body}>
        <h4>Comments</h4>

        <div className={styles.comments}>
          {myComments.length === 0 && (
            <div className={styles.noComment}>
              <h4>No Comments yet</h4>
            </div>
          )}
          {myComments &&
            myComments
              .map((comment) => (
                <div key={comment.key} className={styles.comment}>
                  <div>
                    <div className={styles.avater}>
                      <span>{comment.userName.charAt(0)}</span>
                    </div>{" "}
                    {edit !== comment.key ? (
                      <div className={styles.commentRight}>
                        <div>
                          <h5>{comment.userName}</h5>
                          <span>
                            {TimeAgo(comment.timeStamp)}{" "}
                            {TimeAgo(comment.timeStamp) === "Just now"
                              ? " "
                              : "ago"}
                          </span>
                        </div>
                        <p> {comment.comment} </p>
                      </div>
                    ) : (
                      <Form
                        className={styles.changeForm}
                        onSubmit={(e) => handleChangeSubmit(e, comment.key)}
                      >
                        <Form.Control
                          className="w-100"
                          value={term2}
                          onChange={(e) => setTerm2(e.target.value)}
                          type="text"
                          placeholder="Change Comment..."
                        />
                        <div>
                          {" "}
                          <Button
                            type="button"
                            variant="outline-primary"
                            onClick={() => setEdit(null)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" variant="primary">
                            Save
                          </Button>
                        </div>
                      </Form>
                    )}
                  </div>

                  <div className={styles.icon}>
                    <FiMoreVertical
                      size={20}
                      onClick={() =>
                        setShow(show === comment.key ? null : comment.key)
                      }
                    />

                    <ul
                      style={{
                        display: show === comment.key ? "block" : "none",
                      }}
                    >
                      {currentUser && comment.userId === currentUser.uid ? (
                        <>
                          <li onClick={() => deleteComment(comment.key)}>
                            Delete
                          </li>
                          <li
                            onClick={() => {
                              setEdit(comment.key);
                              setTerm2(comment.comment);
                              setShow(null);
                            }}
                          >
                            Edit
                          </li>
                        </>
                      ) : (
                        <li onClick={() => setShow(null)}>Report</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))
              .reverse()}
        </div>
      </div>
    </div>
  );
}
