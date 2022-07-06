import search from "../../images/search.png";
import styles from "./styles/Searchbar.module.css";

export default function Searchbar({ searchTerm, handleSearch }) {
    return (
        <div className="searchbar">
            <div className="container">
                <div className={styles.main}>
                    <h4>Courses</h4>
                    <div className={styles.search}>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => {
                                handleSearch(e.target.value);
                            }}
                        />
                        <div>
                            <img src={search} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
