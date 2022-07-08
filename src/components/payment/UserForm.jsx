import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { countrys } from "./Countrys";
import FormSelect from "./FormSelect";
import styles from "./styles/UserForm.module.css";

import FormInputs from "./FormInputs";

export default function ShippingForm({ next }) {
    const [fail, setFail] = useState(null);

    const shippingOption = [
        { id: "1", value: "free", label: "Free Shipping" },
        { id: "2", value: "flat", label: "Flat Rate" },
        { id: "3", value: "local", label: "Loca Pickup" },
    ];
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            address: "",
            email: "",
            city: "",
            zipcode: "",
            shipping: "",
            country: "",
        },
        validationSchema: yup.object({
            firstname: yup
                .string()
                .min(2, "Firstname is too short")
                .max(20, "Firstname is too long")
                .required("Firstname is required"),
            lastname: yup
                .string()
                .min(2, "Lastname is too short")
                .max(20, "Lastname is too long")
                .required("Lastname is required"),
            address: yup
                .string()
                .min(2, "Adress is too short")
                .max(100, "Adress is too long")
                .required("Adress is required"),
            email: yup
                .string()
                .email("Provide a valid email")
                .required("email is required"),
            city: yup
                .string()
                .min(2, "City is too short")
                .max(20, "City is too long")
                .required("City is required"),
            zipcode: yup
                .string()
                .min(2, "Zip Code is too short")
                .max(20, "Zip Code is too long")
                .required("Zip Code is required"),
            country: yup.string().required("Country is required"),
            shipping: yup.string().required("Shipping is required"),
        }),
        onSubmit: async (values) => {
            next();
        },
    });

    return (
        <>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                {fail && <p variant="warning">{fail.slice(10)}</p>}
                <FormInputs
                    placeholder="firstname"
                    type="text"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    isInvalid={
                        formik.errors.firstname && formik.touched.firstname
                            ? true
                            : false
                    }
                    feedback={
                        formik.errors.firstname && formik.touched.firstname
                            ? formik.errors.firstname
                            : null
                    }
                />
                <FormInputs
                    placeholder="lastname"
                    name="lastname"
                    type="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    isInvalid={
                        formik.errors.lastname && formik.touched.lastname
                            ? true
                            : false
                    }
                    feedback={
                        formik.errors.lastname && formik.touched.lastname
                            ? formik.errors.lastname
                            : null
                    }
                />
                <FormInputs
                    placeholder="address"
                    name="address"
                    type="text"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    isInvalid={
                        formik.errors.address && formik.touched.address
                            ? true
                            : false
                    }
                    feedback={
                        formik.errors.address && formik.touched.address
                            ? formik.errors.address
                            : null
                    }
                />
                <FormInputs
                    placeholder="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={
                        formik.errors.email && formik.touched.email
                            ? true
                            : false
                    }
                    feedback={
                        formik.errors.email && formik.touched.email
                            ? formik.errors.email
                            : null
                    }
                />

                <FormInputs
                    placeholder="city"
                    name="city"
                    type="text"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    isInvalid={
                        formik.errors.city && formik.touched.city ? true : false
                    }
                    feedback={
                        formik.errors.city && formik.touched.city
                            ? formik.errors.city
                            : null
                    }
                />
                <FormInputs
                    placeholder="zip / postal code"
                    type="number"
                    name="zipcode"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    isInvalid={
                        formik.errors.zipcode && formik.touched.zipcode
                            ? true
                            : false
                    }
                    feedback={
                        formik.errors.zipcode && formik.touched.zipcode
                            ? formik.errors.zipcode
                            : null
                    }
                />

                <FormSelect
                    label="Country"
                    options={countrys}
                    id="country"
                    name="country"
                    onBlur={() => {
                        formik.handleBlur({ target: { name: "country" } });
                    }}
                    onChange={(option) => {
                        formik.setFieldValue("country", option.id);
                    }}
                    error={formik.errors.country}
                    touched={formik.touched.country}
                />

                <FormSelect
                    label="Shipping Fee"
                    options={shippingOption}
                    id="shipping"
                    name="shipping"
                    onBlur={() => {
                        formik.handleBlur({ target: { name: "shipping" } });
                    }}
                    onChange={(option) => {
                        formik.setFieldValue("shipping", option.id);
                    }}
                    error={formik.errors.shipping}
                    touched={formik.touched.shipping}
                />
                <div className={styles.buttons}>
                    <Link to="/cart">
                        <button className="custom-b" type="button">
                            Back to cart
                        </button>
                    </Link>

                    <button className="custom-b" type="submit">
                        Next
                    </button>
                </div>
            </form>
        </>
    );
}
