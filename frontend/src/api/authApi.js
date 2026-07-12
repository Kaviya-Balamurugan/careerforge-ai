import api from "./axios";

export const login = (form) => {

    const formData = new URLSearchParams();

    formData.append("username", form.email);

    formData.append("password", form.password);

    return api.post(

        "/login",

        formData,

        {

            headers: {

                "Content-Type": "application/x-www-form-urlencoded"

            }

        }

    );

};

export const register = (form) =>

    api.post(

        "/register",

        form

    );