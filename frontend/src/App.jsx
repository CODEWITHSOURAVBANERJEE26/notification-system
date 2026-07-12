import { useState } from "react";
import "./App.css";
import NotificationBell from "./components/NotificationBell";

function App() {

    const [tenantId, setTenantId] = useState("t1");
    const [userId, setUserId] = useState("u1");

    return (

        <div className="container">

            <h1 className="title">
                Multi-Tenant Notification System
            </h1>

            <div className="selector-box">

                <div className="selector">

                    <label>Tenant</label>

                    <select
                        value={tenantId}
                        onChange={(e) => {

                            const tenant = e.target.value;

                            setTenantId(tenant);

                            if (tenant === "t1") {

                                setUserId("u1");

                            } else {

                                setUserId("u2");

                            }

                        }}
                    >

                        <option value="t1">Tenant 1</option>
                        <option value="t2">Tenant 2</option>

                    </select>

                </div>

                <div className="selector">

                    <label>User</label>

                    <select
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    >

                        <option value="u1">User 1</option>
                        <option value="u2">User 2</option>

                    </select>

                </div>

            </div>

            <NotificationBell
                tenantId={tenantId}
                userId={userId}
            />

        </div>

    );

}

export default App;
