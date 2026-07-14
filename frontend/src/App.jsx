import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import ATS from "./pages/ATS";
import Assistant from "./pages/Assistant";
import Interview from "./pages/Interview";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Resume from "./pages/Resume";
import RewriteResume from "./pages/RewriteResume";
import ResumeChat from "./pages/ResumeChat";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CareerSummary from "./pages/CareerSummary";

import "./App.css";

function App() {

    const isAuthenticated = !!localStorage.getItem("token");

    return (

        <Routes>

            {/* Default Route */}

            <Route
    path="/"
    element={<Navigate to="/login" replace />}
/>

            {/* Public Routes */}

            <Route

                path="/login"

                element={<Login />}

            />

            <Route

                path="/register"

                element={<Register />}

            />

            {/* Protected Routes */}

            <Route

                path="/dashboard"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Dashboard />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/resume"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Resume />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/analytics"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Analytics />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/skills"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Skills />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/projects"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Projects />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/ats"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <ATS />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/assistant"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Assistant />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/interview"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <Interview />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/rewrite"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <RewriteResume />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />

            <Route

                path="/chat"

                element={

                    <ProtectedRoute>

                        <MainLayout>

                            <ResumeChat />

                        </MainLayout>

                    </ProtectedRoute>

                }

            />
            <Route
    path="/summary"
    element={
        <ProtectedRoute>
            <MainLayout>
                <CareerSummary />
            </MainLayout>
        </ProtectedRoute>
    }
/>

            {/* 404 */}

            <Route

                path="*"

                element={<NotFound />}

            />

        </Routes>

    );

}

export default App;