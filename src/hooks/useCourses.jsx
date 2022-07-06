import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useCourses() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchCourses = async () => {
            const db = getDatabase();
            const cousesRef = ref(db, "courses");
            const coursesQuery = query(cousesRef, orderByKey());

            try {
                setError(false);
                setLoading(true);
                const snapshot = await get(coursesQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setCourses((prev) => [...Object.values(snapshot.val())]);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(err);
            }
        };
        fetchCourses();
    }, []);

    return {
        loading,
        error,
        courses,
    };
}
