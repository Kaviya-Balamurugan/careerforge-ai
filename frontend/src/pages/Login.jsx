import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { login } from "../api/authApi";

import "./Auth.css";

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        email: "",

        password: ""

    });

    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            navigate("/dashboard", { replace: true });

        }

    }, [navigate]);

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await login(form);

            localStorage.setItem(

                "token",

                response.data.access_token

            );

            toast.success("Login Successful");

            navigate("/dashboard", { replace: true });

        }

        catch (err) {

            console.error(err);

            toast.error(

                typeof err.response?.data?.detail === "string"

                    ? err.response.data.detail

                    : "Login Failed"

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="auth-page">

            <form

                className="auth-card"

                onSubmit={handleSubmit}

            >

                <h1>CareerForge AI</h1>

                <h3>Login</h3>

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={form.email}

                    onChange={handleChange}

                    required

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    value={form.password}

                    onChange={handleChange}

                    required

                />

                <button

                    type="submit"

                    disabled={loading}

                >

                    {

                        loading

                            ? "Signing In..."

                            : "Login"

                    }

                </button>

                <p>

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </form>

        </div>

    );

}