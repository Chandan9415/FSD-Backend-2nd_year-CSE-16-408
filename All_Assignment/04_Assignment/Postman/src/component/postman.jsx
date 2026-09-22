import { useState } from "react";
import "../App.css";

function Postman() {
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("");
    const [body, setBody] = useState("");
    const [response, setResponse] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const sendRequest = async () => {
        setLoading(true);
        setResponse("");
        setStatus("");

        try {
            const options = {
                method: method
            };

            if (
                method === "POST" ||
                method === "PUT" ||
                method === "PATCH"
            ) {
                options.headers = {
                    "Content-Type": "application/json"
                };

                if (body.trim() !== "") {
                    options.body = body;
                }
            }

            const startTime = Date.now();

            const res = await fetch(url, options);

            const endTime = Date.now();

            setStatus(
                `${res.status} ${res.statusText} | ${endTime - startTime} ms`
            );

            const contentType = res.headers.get("content-type");

            if (
                contentType &&
                contentType.includes("application/json")
            ) {
                const data = await res.json();

                setResponse(
                    JSON.stringify(data, null, 2)
                );
            } else {
                const data = await res.text();

                setResponse(data);
            }
        } catch (error) {
            setStatus("Request Error");
            setResponse(error.message);
        }

        setLoading(false);
    };

    const clearResponse = () => {
        setResponse("");
        setStatus("");
    };

    return (
        <div className="postman">

            <div className="topbar">
                <h1>My Postman</h1>
                <span>API Testing Tool</span>
            </div>

            <div className="request-section">

                <div className="request-bar">

                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="PATCH">PATCH</option>
                        <option value="DELETE">DELETE</option>
                        <option value="HEAD">HEAD</option>
                        <option value="OPTIONS">OPTIONS</option>
                    </select>

                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter request URL"
                    />

                    <button
                        onClick={sendRequest}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>

                </div>

                {(method === "POST" ||
                    method === "PUT" ||
                    method === "PATCH") && (

                    <div className="panel">

                        <h3>Request Body</h3>

                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder={`{
    "id": 102,
    "name": "Rahul",
    "email": "rahul@gmail.com"
}`}
                        />

                    </div>
                )}

                <div className="response-panel">

                    <div className="response-header">

                        <h3>Response</h3>

                        <div>
                            <span>{status}</span>

                            <button
                                onClick={clearResponse}
                                className="clear-btn"
                            >
                                Clear
                            </button>
                        </div>

                    </div>

                    <pre>
                        {response || "Response will appear here..."}
                    </pre>

                </div>

            </div>

        </div>
    );
}

export default Postman;