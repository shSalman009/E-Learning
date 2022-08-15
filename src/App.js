import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-loading";
import Alerts from "./components/Alerts";
import Notfound from "./components/Notfound";
import PrivateRoute from "./components/private_route/PrivateRoute";
import PublicRoute from "./components/public_route/PublicRoute";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import CartContext from "./context/CartContext";
import CommentContext from "./context/CommentContext";
import PurchaseContext from "./context/PurchaseContext";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import CoursesPage from "./pages/CoursesPage";
import FormPage from "./pages/FormPage";
import Home from "./pages/Home";
import Learning from "./pages/Learning";
import SingleCourse from "./pages/SingleCourse";
import TeacherPage from "./pages/TeacherPage";
import YourCourse from "./pages/YourCourse";

export default function App() {
  return (
    <div className="main">
      <ScrollToTop>
        <AuthProvider>
          <CartContext>
            <PurchaseContext>
              <CommentContext>
                <Alerts />
                <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />

                  <Route path="/courses" element={<CoursesPage />} loading />
                  <Route
                    path="/courses/:id"
                    element={<SingleCourse />}
                    loading
                  />

                  <Route path="/teacher" element={<TeacherPage />} loading />
                  <Route path="/notfound" element={<Notfound />} />
                  <Route path="/" element={<PublicRoute />}>
                    <Route path="/signup" element={<FormPage />} loading />
                    <Route path="/login" element={<FormPage />} loading />
                  </Route>
                  <Route path="/" element={<PrivateRoute />}>
                    <Route path="payment" element={<Checkout />} loading />
                    <Route path="cart" element={<CartPage />} loading />
                    <Route path="yourcourse" element={<YourCourse />} loading />
                    <Route path="learning" element={<Learning />} />
                  </Route>
                </Routes>
              </CommentContext>
            </PurchaseContext>
          </CartContext>
        </AuthProvider>
      </ScrollToTop>
    </div>
  );
}
