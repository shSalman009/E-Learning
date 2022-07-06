import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Alerts from "./components/Alerts";
import Notfound from "./components/Notfound";
import PrivateRoute from "./components/private_route/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import CartContext from "./context/CartContext";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import CoursesPage from "./pages/CoursesPage";
import Home from "./pages/Home";
import Login from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import SingleCourse from "./pages/SingleCourse";
import TeacherPage from "./pages/TeacherPage";

export default function App() {
    return (
        <div className="main">
            <BrowserRouter>
                <AuthProvider>
                    <CartContext>
                        <Alerts />
                        <Routes>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/courses" element={<CoursesPage />} />
                            <Route
                                path="/courses/:id"
                                element={<SingleCourse />}
                            />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/teacher" element={<TeacherPage />} />
                            <Route path="/notfound" element={<Notfound />} />

                            <Route path="/" element={<PrivateRoute />}>
                                <Route path="payment" element={<Checkout />} />
                                <Route path="cart" element={<CartPage />} />
                            </Route>
                        </Routes>
                    </CartContext>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}
