import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import useCourses from "../../hooks/useCourses";
import Courses from "./Courses";
import Filter from "./Filter";
import styles from "./styles/Main.module.css";

export default function Main() {
  const [allCourse, setAllCourse] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const { state } = useLocation();

  const [filtered, setFiltered] = useState({
    filter: [],
    price: "all",
    // SEARCH OPTION ADD IN LATER
  });

  const { courses } = useCourses();
  const { categories } = useCategory();

  const handleCategory = (id) => {
    const currentChecked = filtered.filter.indexOf(id);
    const copy = [...filtered.filter];
    if (currentChecked === -1) {
      copy.push(id);
    } else {
      copy.splice(currentChecked, 1);
    }
    setFiltered((prev) => ({ ...prev, filter: copy }));
  };

  const handlePrice = (type) => {
    if (type === "free") {
      setFiltered((prev) => ({ ...prev, price: type }));
    }
    if (type === "paid") {
      setFiltered((prev) => ({ ...prev, price: type }));
    }
    if (type === "all") {
      setFiltered((prev) => ({ ...prev, price: type }));
    }
  };

  useEffect(() => {
    setAllCategory(categories);

    const filteringCategories = () => {
      setAllCourse([]);
      courses.forEach((course) => {
        if (filtered.filter.length > 0) {
          filtered.filter.forEach((category) => {
            if (course.category === category) {
              if (filtered.price === "all") {
                setAllCourse((prev) => [...prev, course]);
              }
              if (filtered.price === "free") {
                if (!course.price) {
                  setAllCourse((prev) => [...prev, course]);
                }
              }
              if (filtered.price === "paid") {
                if (course.price) {
                  setAllCourse((prev) => [...prev, course]);
                }
              }
            }
          });
        } else {
          if (filtered.price === "all") {
            setAllCourse((prev) => [...prev, course]);
          }
          if (filtered.price === "free") {
            if (!course.price) {
              setAllCourse((prev) => [...prev, course]);
            }
          }
          if (filtered.price === "paid") {
            if (course.price) {
              setAllCourse((prev) => [...prev, course]);
            }
          }
        }
      });
    };
    filteringCategories();
  }, [courses, categories, filtered]);

  useEffect(() => {
    if (state) {
      const comesCategory =
        typeof state.category === "string" ? state.category : false;
      const copy = [...filtered.filter];
      if (!copy.includes(comesCategory)) {
        copy.push(comesCategory);
        setFiltered((prev) => ({ ...prev, filter: copy }));
      }
    }
    // don't add dependencies. it may create bugs
  }, []);

  return (
    <div className={styles.main}>
      <div className="container">
        {/* <Searchbar /> */}
        <div className={styles.wrapper}>
          <Filter
            categories={allCategory}
            handleCategory={handleCategory}
            handlePrice={handlePrice}
            filter={filtered.filter}
          />
          <Courses courses={allCourse} />
        </div>
      </div>
    </div>
  );
}
