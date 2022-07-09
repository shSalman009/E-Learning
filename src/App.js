import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Alerts from "./components/Alerts";
import Notfound from "./components/Notfound";
import PrivateRoute from "./components/private_route/PrivateRoute";
import PublicRoute from "./components/public_route/PublicRoute";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import CartContext from "./context/CartContext";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import CoursesPage from "./pages/CoursesPage";
import FormPage from "./pages/FormPage";
import Home from "./pages/Home";
import SingleCourse from "./pages/SingleCourse";
import TeacherPage from "./pages/TeacherPage";

export default function App() {
    return (
        <div className="main">
            <BrowserRouter>
                <ScrollToTop>
                    <AuthProvider>
                        <CartContext>
                            <Alerts />
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Navigate to="/home" />}
                                />
                                <Route path="/home" element={<Home />} />
                                <Route
                                    path="/courses"
                                    element={<CoursesPage />}
                                />
                                <Route
                                    path="/courses/:id"
                                    element={<SingleCourse />}
                                />

                                <Route
                                    path="/teacher"
                                    element={<TeacherPage />}
                                />
                                <Route
                                    path="/notfound"
                                    element={<Notfound />}
                                />
                                <Route path="/" element={<PublicRoute />}>
                                    <Route
                                        path="/signup"
                                        element={<FormPage />}
                                    />
                                    <Route
                                        path="/login"
                                        element={<FormPage />}
                                    />
                                </Route>
                                <Route path="/" element={<PrivateRoute />}>
                                    <Route
                                        path="payment"
                                        element={<Checkout />}
                                    />
                                    <Route path="cart" element={<CartPage />} />
                                </Route>
                            </Routes>
                        </CartContext>
                    </AuthProvider>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
}
