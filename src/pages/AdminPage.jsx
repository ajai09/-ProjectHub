import { useEffect, useMemo, useState } from "react";

const API_URL = "https://projecthub-t02p.onrender.com/contacts";
const ADMIN_PASSCODE = "admin123";

function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sortedMessages = useMemo(
    () =>
      [...messages].sort((a, b) => {
        const first = new Date(a.createdAt || 0).getTime();
        const second = new Date(b.createdAt || 0).getTime();
        return second - first;
      }),
    [messages]
  );

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json().catch(() => []);

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch messages.");
      }

      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authorized) fetchMessages();
  }, [authorized]);

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    if (passcode === ADMIN_PASSCODE) {
      setAuthorized(true);
    } else {
      setError("Incorrect admin passcode.");
    }
  };

  return (
    <main>
      <section className="page-hero small">
        <div className="container admin-hero">
          <div>
            <h1>Admin Messages</h1>
            <p>Review contact form submissions from your portfolio.</p>
          </div>
          {authorized && (
            <button className="btn btn-outline" type="button" onClick={fetchMessages} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          )}
        </div>
      </section>

      <section className="admin-content">
        <div className="container">
          {!authorized ? (
            <form className="admin-login" onSubmit={handleLogin}>
              <div className="form-field">
                <label>Admin Passcode</label>
                <input
                  type="password"
                  placeholder="Enter passcode"
                  value={passcode}
                  onChange={(event) => setPasscode(event.target.value)}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Open Admin Page
              </button>
              {error && <p className="admin-alert">{error}</p>}
            </form>
          ) : (
            <>
              <div className="admin-summary">
                <div className="admin-stat">
                  <span className="admin-stat-number">{messages.length}</span>
                  <span className="admin-stat-label">Total Messages</span>
                </div>
                <div className="admin-stat">
                  <span className="admin-stat-number">{sortedMessages[0]?.name || "None"}</span>
                  <span className="admin-stat-label">Latest Sender</span>
                </div>
              </div>

              {error && <p className="admin-alert">{error}</p>}

              {loading ? (
                <div className="admin-empty">Loading messages...</div>
              ) : sortedMessages.length === 0 ? (
                <div className="admin-empty">No messages yet.</div>
              ) : (
                <div className="admin-message-list">
                  {sortedMessages.map((message) => (
                    <article className="admin-message-card" key={message._id || `${message.email}-${message.createdAt}`}>
                      <div className="admin-message-head">
                        <div>
                          <h2>{message.name}</h2>
                          <a href={`mailto:${message.email}`}>{message.email}</a>
                        </div>
                        <time dateTime={message.createdAt}>
                          {message.createdAt ? new Date(message.createdAt).toLocaleString() : "No date"}
                        </time>
                      </div>
                      <p>{message.message}</p>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default AdminPage;
