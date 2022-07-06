import { useEffect, useState } from "react";
import buisness from "../images/buisness.png";
import dataScience from "../images/data-science.png";
import development from "../images/development.png";
import health from "../images/health.png";
import marketing from "../images/marketing.png";
import webDesign from "../images/web-design.png";
import useCourses from "./useCourses";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    const { courses } = useCourses();

    useEffect(() => {
        const data = [
            {
                id: 1,
                category: "development",
                img: development,
                availibleCourse: 0,
            },
            {
                id: 2,
                category: "business",
                img: buisness,
                availibleCourse: 0,
            },
            {
                id: 3,
                category: "data science",
                img: dataScience,
                availibleCourse: 0,
            },
            {
                id: 4,
                category: "health and fitness",
                img: health,
                availibleCourse: 0,
            },
            {
                id: 5,
                category: "web design",
                img: webDesign,
                availibleCourse: 0,
            },
            {
                id: 6,
                category: "marketing",
                img: marketing,
                availibleCourse: 0,
            },
        ];

        courses.forEach((course) => {
            data.forEach((cate) => {
                if (course.category === cate.category) {
                    cate.availibleCourse += 1;
                }
            });
        });
        setCategories(data);
    }, [courses]);

    return {
        categories,
    };
}
