import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useTeachers() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [teachers, setTeachers] = useState([]);
    useEffect(() => {
        const fetchTeachers = async () => {
            const db = getDatabase();
            const teachersRef = ref(db, "teachers");
            const teachersQuery = query(teachersRef, orderByKey());

            try {
                setError(false);
                setLoading(true);
                const snapshot = await get(teachersQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setTeachers((prev) => [...Object.values(snapshot.val())]);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(err);
            }
        };
        fetchTeachers();
    }, []);

    return {
        loading,
        error,
        teachers,
    };
}
