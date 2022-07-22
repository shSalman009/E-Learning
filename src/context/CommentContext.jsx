import {
    getDatabase,
    onValue,
    push,
    ref,
    remove,
    set,
    update,
} from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import shortid from "shortid";
import { useAuth } from "./AuthContext";

const Context = createContext();

export const useComment = () => {
    return useContext(Context);
};

export default function CommentContext({ children }) {
    const [comments, setComments] = useState([]);

    const { currentUser } = useAuth();
    // const { uid, displayName } = currentUser;

    const db = getDatabase();
    const dbRef = ref(db, "comments");

    const addComment = async (id, comment) => {
        // validation
        const courseId = typeof id === "number" ? id : null;
        const Comment = typeof comment === "string" ? comment : null;

        if (courseId && Comment) {
            const data = {
                id: shortid.generate(),
                userName: currentUser.displayName,
                userId: currentUser.uid,
                courseId: courseId,
                timeStamp: new Date().getTime(),
                comment: Comment,
            };

            const newPostRef = push(dbRef);
            set(newPostRef, {
                ...data,
            });
        }
        fetchComments();
    };

    const deleteComment = async (key) => {
        comments.forEach((comment) => {
            if (comment.key === key) {
                if (currentUser.uid === comment.userId) {
                    remove(ref(db, `comments/${key}`));
                    fetchComments();
                }
            }
        });
    };

    const updateComment = (key, text) => {
        comments.forEach((comment) => {
            if (comment.key === key) {
                if (currentUser.uid === comment.userId) {
                    comment.comment = text;

                    update(ref(db, `comments/${key}`), {
                        ...comment,
                    });
                    fetchComments();
                }
            }
        });
    };

    const fetchComments = async () => {
        try {
            const datas = [];
            const keys = [];
            onValue(
                dbRef,
                async (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const childKey = childSnapshot.key;
                        const childData = childSnapshot.val();
                        datas.push(childData);
                        keys.push(childKey);
                    });

                    // pushin key in data
                    for (let index = 0; index < datas.length; index++) {
                        datas[index].key = keys[index];
                    }
                    setComments(datas);
                },
                {
                    onlyOnce: true,
                }
            );
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <Context.Provider
            value={{ addComment, deleteComment, updateComment, comments }}
        >
            {children}
        </Context.Provider>
    );
}
