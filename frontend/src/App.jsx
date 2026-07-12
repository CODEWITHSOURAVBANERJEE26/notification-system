import { useState } from "react";
import NotificationBell from "./components/NotificationBell";

function App() {
    const [tenantId, setTenantId] = useState("t1");
    const [userId, setUserId] = useState("u1");

    return (
        <div
            style={{
                width: "750px",
                margin: "30px auto",
                fontFamily: "Arial"
            }}
        >
            <h1 style={{ textAlign: "center" }}>
                Multi-Tenant Notification System
            </h1>

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px"
                }}
            >
                <div>
                    <label>Tenant</label>
                    <br />
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

                <div>
                    <label>User</label>
                    <br />
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

