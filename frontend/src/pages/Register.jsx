import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { register } from "../api/authApi";

import "./Auth.css";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        name: "",

        email: "",

        password: ""

    });

    const [loading, setLoading] = useState(false);

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

            await register(form);

            toast.success("Registration Successful");

            navigate("/login");

        }

        catch (err) {

            console.error(err);

            toast.error(

                err.response?.data?.detail ||

                "Registration Failed"

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

                <h3>Create Account</h3>

                <input

                    type="text"

                    name="name"

                    placeholder="Full Name"

                    value={form.name}

                    onChange={handleChange}

                    required

                />

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

                        ?

                        "Creating Account..."

                        :

                        "Register"

                    }

                </button>

                <p>

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </form>

        </div>

    );

}