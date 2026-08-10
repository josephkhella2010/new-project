import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useStyles = createUseStyles({
  page: {
    minHeight: "100dvh",
    width: "100%",
    background: "#f8fafc",
    color: "#1f2937",
    overflowX: "hidden",
  },

  navbar: {
    width: "100%",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 6%",
    boxSizing: "border-box",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 10,

    "@media (max-width: 600px)": {
      padding: "0 20px",
    },
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "20px",
    fontWeight: 800,
    color: "#1f2937",

    "& span": {
      width: "34px",
      height: "34px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      background: "#1f2937",
      color: "#ffffff",
      fontSize: "17px",
    },
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "28px",

    "& a": {
      color: "#4b5563",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: 500,

      "&:hover": {
        color: "#111827",
      },
    },

    "@media (max-width: 600px)": {
      display: "none",
    },
  },

  navButton: {
    padding: "9px 17px",
    borderRadius: "8px",
    border: "none",
    background: "#1f2937",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",

    "&:hover": {
      background: "#111827",
    },
  },

  hero: {
    minHeight: "calc(100dvh - 70px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    boxSizing: "border-box",
    textAlign: "center",

    background:
      "radial-gradient(circle at top, #eef2ff 0%, #f8fafc 45%, #ffffff 100%)",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "7px 13px",
    borderRadius: "50px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    color: "#4b5563",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "25px",
  },

  title: {
    maxWidth: "850px",
    margin: 0,
    fontSize: "clamp(42px, 7vw, 78px)",
    lineHeight: 1.05,
    letterSpacing: "-3px",
    fontWeight: 800,
    color: "#111827",

    "& span": {
      color: "#43536c",
    },

    "@media (max-width: 600px)": {
      letterSpacing: "-1.5px",
    },
  },

  description: {
    maxWidth: "650px",
    margin: "25px auto 0",
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#6b7280",

    "@media (max-width: 600px)": {
      fontSize: "15px",
    },
  },

  heroActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "35px",

    "@media (max-width: 500px)": {
      width: "100%",
      flexDirection: "column",
    },
  },

  primaryButton: {
    padding: "13px 24px",
    borderRadius: "9px",
    border: "none",
    background: "#1f2937",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 8px 25px rgba(31, 41, 55, 0.18)",

    "&:hover": {
      background: "#111827",
      transform: "translateY(-1px)",
    },

    "@media (max-width: 500px)": {
      width: "100%",
    },
  },

  secondaryButton: {
    padding: "13px 24px",
    borderRadius: "9px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#1f2937",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",

    "&:hover": {
      background: "#f9fafb",
    },

    "@media (max-width: 500px)": {
      width: "100%",
    },
  },

  chatPreview: {
    width: "min(850px, 100%)",
    marginTop: "65px",
    borderRadius: "16px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    boxShadow: "0 25px 70px rgba(15, 23, 42, 0.12)",
    overflow: "hidden",
    textAlign: "left",
  },

  chatTop: {
    height: "48px",
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "0 17px",
    borderBottom: "1px solid #e5e7eb",
  },

  dot: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: "#d1d5db",
  },

  chatBody: {
    padding: "25px",
  },

  userMessage: {
    marginLeft: "auto",
    maxWidth: "70%",
    padding: "11px 15px",
    borderRadius: "12px 12px 3px 12px",
    background: "#1f2937",
    color: "#ffffff",
    fontSize: "14px",

    "@media (max-width: 600px)": {
      maxWidth: "85%",
    },
  },

  aiMessage: {
    maxWidth: "75%",
    marginTop: "18px",
    padding: "14px 16px",
    borderRadius: "12px 12px 12px 3px",
    background: "#f3f4f6",
    color: "#374151",
    fontSize: "14px",
    lineHeight: 1.6,

    "@media (max-width: 600px)": {
      maxWidth: "90%",
    },
  },

  features: {
    padding: "100px 6%",
    background: "#ffffff",
    textAlign: "center",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "36px",
    fontWeight: 800,
    color: "#111827",

    "@media (max-width: 600px)": {
      fontSize: "28px",
    },
  },

  sectionDescription: {
    maxWidth: "600px",
    margin: "15px auto 50px",
    color: "#6b7280",
    lineHeight: 1.6,
  },

  featureGrid: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",

    "@media (max-width: 800px)": {
      gridTemplateColumns: "1fr",
    },
  },

  featureCard: {
    padding: "30px",
    textAlign: "left",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    background: "#ffffff",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 15px 35px rgba(15, 23, 42, 0.08)",
    },

    "& h3": {
      margin: "18px 0 10px",
      fontSize: "18px",
      color: "#111827",
    },

    "& p": {
      margin: 0,
      color: "#6b7280",
      lineHeight: 1.6,
      fontSize: "14px",
    },
  },

  featureIcon: {
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "11px",
    background: "#f3f4f6",
    fontSize: "20px",
  },

  cta: {
    padding: "100px 20px",
    textAlign: "center",
    background: "#1f2937",
    color: "#ffffff",

    "& h2": {
      margin: 0,
      fontSize: "42px",
      fontWeight: 800,

      "@media (max-width: 600px)": {
        fontSize: "30px",
      },
    },

    "& p": {
      maxWidth: "550px",
      margin: "15px auto 30px",
      color: "#d1d5db",
      lineHeight: 1.6,
    },
  },

  ctaButton: {
    padding: "13px 25px",
    borderRadius: "9px",
    border: "none",
    background: "#ffffff",
    color: "#1f2937",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",

    "&:hover": {
      background: "#f3f4f6",
    },
  },

  footer: {
    padding: "25px 6%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#111827",
    color: "#9ca3af",
    fontSize: "13px",

    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "10px",
    },
  },
});

export default function HomePage() {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  /* functions */
  const handleClick = () => {
    if (token) {
      navigate("/chats");
    } else {
      toast.error("please Login first");
    }
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    name: string,
  ) => {
    e.preventDefault();
    const section = document.getElementById(name);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={classes.page}>
      {/* Navbar */}
      <header className={classes.navbar}>
        <div className={classes.logo}>
          <span>✦</span>
          MiniChat AI
        </div>

        <nav className={classes.navLinks}>
          <a href="#features" onClick={(e) => scrollToSection(e, "features")}>
            Features
          </a>
          <a href="#about" onClick={(e) => scrollToSection(e, "about")}>
            About
          </a>
          <a
            onClick={() => {
              handleClick();
            }}
          >
            Chat
          </a>
        </nav>

        <button
          className={classes.navButton}
          onClick={() => {
            handleClick();
          }}
        >
          Get Started
        </button>
      </header>

      {/* Hero */}
      <main className={classes.hero}>
        <div className={classes.badge}>✦ AI-powered conversations</div>

        <h1 className={classes.title}>
          Your ideas deserve a<span> smarter chat.</span>
        </h1>

        <p className={classes.description}>
          MiniChat AI is your simple, fast and intelligent AI assistant. Ask
          questions, learn new things, generate ideas and get help whenever you
          need it.
        </p>

        <div className={classes.heroActions}>
          <button
            className={classes.primaryButton}
            onClick={() => {
              handleClick();
            }}
          >
            Start Chatting →
          </button>
        </div>

        {/* Chat Preview */}
        <div className={classes.chatPreview}>
          <div className={classes.chatTop}>
            <span className={classes.dot} />
            <span className={classes.dot} />
            <span className={classes.dot} />
          </div>

          <div className={classes.chatBody}>
            <div className={classes.userMessage}>
              What can MiniChat AI help me with?
            </div>

            <div className={classes.aiMessage}>
              MiniChat AI can help you answer questions, explain difficult
              topics, brainstorm ideas, write content, summarize information and
              much more. Think of me as your personal AI assistant.
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className={classes.features}>
        <h2 className={classes.sectionTitle}>Everything you need from an AI</h2>

        <p className={classes.sectionDescription}>
          MiniChat AI is designed to make everyday AI conversations simple,
          useful and accessible.
        </p>

        <div className={classes.featureGrid}>
          <div className={classes.featureCard}>
            <div className={classes.featureIcon}>💬</div>

            <h3>Smart Conversations</h3>

            <p>
              Ask questions naturally and have helpful conversations with an AI
              that understands your context.
            </p>
          </div>

          <div className={classes.featureCard}>
            <div className={classes.featureIcon}>✨</div>

            <h3>Create Anything</h3>

            <p>
              Brainstorm ideas, write content, improve text and turn your
              thoughts into something useful.
            </p>
          </div>

          <div className={classes.featureCard}>
            <div className={classes.featureIcon}>🧠</div>

            <h3>Learn Faster</h3>

            <p>
              Get simple explanations for complex topics and use AI as your
              personal learning assistant.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={classes.cta} id="about">
        <h2>Ready to start chatting?</h2>

        <p>
          Ask your first question and discover what MiniChat AI can do for you.
        </p>

        <button
          className={classes.ctaButton}
          onClick={() => {
            handleClick();
          }}
        >
          Start Using MiniChat AI →
        </button>
      </section>

      {/* Footer */}
      <footer className={classes.footer}>
        <span>© 2026 MiniChat AI</span>
        <span>Built for simple, intelligent conversations.</span>
      </footer>
    </div>
  );
}
