import { useState } from "react";

export default function WaitlistCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (_) {
      // silently continue — don't block the user if network fails
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Card */}
      <div
        className="flex rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(2px)",
          maxWidth: 860,
          width: "100%",
        }}
      >
        {/* Left — artwork panel */}
        <div
          className="hidden md:block"
          style={{
            width: "45%",
            minHeight: 480,
            backgroundImage: "url('/house.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "1.5rem",
            margin: "0.6rem",
            flexShrink: 0,
          }}
        />

        {/* Right — form panel */}
        <div
          className="flex flex-col justify-between flex-1 px-10 py-30"
          style={{ background: "#f5f2ed", borderRadius: "0 1.5rem 1.5rem 0" }}
        >
          <div>
            {!submitted ? (
              <>
                <p className="text-sm mb-1" style={{ color: "#777" }}>
                  Join the waitlist for
                </p>
                <h1
                  className="mb-0 leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                    color: "#1a1a1a",
                    fontWeight: 500,
                  }}
                >
                  Lymora Housing
                </h1>
                <p className="text-sm mb-1" style={{ color: "#777" }}>
                  The First AI powered Housing Solution
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-8">
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required
                    style={{
                      background: focused ? "#fff" : "#ece9e3",
                      border: "none",
                      borderRadius: "0.6rem",
                      padding: "0.85rem 1rem",
                      fontSize: "0.95rem",
                      color: "#333",
                      outline: focused ? "2px solid #b5a89a" : "none",
                      transition: "all 0.2s ease",
                    }}
                  />

                  <button
                    type="submit"
                    style={{
                      background: "#1a1a1a",
                      color: "#f5f2ed",
                      border: "none",
                      borderRadius: "0.6rem",
                      padding: "0.85rem 1rem",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                      marginTop: "0.25rem",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLButtonElement).style.background = "#333")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLButtonElement).style.background = "#1a1a1a")
                    }
                  >
                    Join Waitlist
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col justify-center h-full py-8">
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✦</div>
                <h2
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 400,
                    color: "#1a1a1a",
                    marginBottom: "0.5rem",
                  }}
                >
                  You're on the list.
                </h2>
                <p style={{ color: "#777", fontSize: "0.95rem" }}>
                  We'll reach out to <strong>{email}</strong> when we're live.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-center gap-2 mt-6"
            style={{ borderTop: "1px solid #ddd9d2", paddingTop: "0.75rem" }}
          >
            <span style={{ fontSize: "0.7rem", color: "#999" }}>brought to you by</span>

            {/* Glassy logo */}
            <span
              className="relative inline-flex"
              style={{ height: "1.5rem", width: "1.5rem", flexShrink: 0 }}
            >
              <img
                src="/lym.png"
                className="h-full w-full rounded-full object-cover"
                alt=""
                style={{ display: "block" }}
              />
              <span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `
                    radial-gradient(circle at 35% 35%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 40%, transparent 65%),
                    radial-gradient(circle at 65% 75%, rgba(255,255,255,0.12) 0%, transparent 50%)
                  `,
                  boxShadow: `
                    inset 0 1px 2px rgba(255,255,255,0.6),
                    inset 0 -2px 4px rgba(0,0,0,0.3),
                    0 2px 8px rgba(0,0,0,0.4)
                  `,
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}