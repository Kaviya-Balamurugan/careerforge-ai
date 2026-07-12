import Sidebar from "../components/common/Sidebar";

export default function MainLayout({ children }) {

    return (

        <div className="app-layout">

            <Sidebar />

            <main className="main-content">

                <div className="container">

                    {children}

                </div>

            </main>

        </div>

    );

}