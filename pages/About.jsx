
export function About() {
    return (
        <section className="about-page">
            {/* Floating decorative emojis */}
            <span className="floating-emojis emoji-1">💻</span>
            <span className="floating-emojis emoji-2">🚀</span>
            <span className="floating-emojis emoji-3">⭐</span>
            <span className="floating-emojis emoji-4">🔥</span>
            <span className="floating-emojis emoji-5">💎</span>

            <h1 className="about-title">✨ The Legend Has Arrived ✨</h1>

            {/* Hero Section with Photo */}
            <div className="hero-section">
                <div className="photo-container">
                    <div className="glow-border"></div>
                    <div className="photo-frame">
                        <img 
                            src="img/rinat.png" 
                            alt="The One and Only Rinat" 
                            className="hero-photo"
                        />
                    </div>
                </div>
                <h2 className="hero-name">
                    <span>Rinat</span> • Code Wizard Supreme
                </h2>
                <p className="hero-subtitle">Turning coffee into code since day one</p>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid">
                <div className="skill-card">
                    <span className="skill-icon">🧠</span>
                    <h3 className="skill-title">Supreme Intelligence</h3>
                    <p className="skill-desc">Makes Einstein look like he needed a tutor. Once debugged code just by THINKING about it really hard.</p>
                </div>

                <div className="skill-card">
                    <span className="skill-icon">💻</span>
                    <h3 className="skill-title">Legendary Coding</h3>
                    <p className="skill-desc">Writes code so beautiful, museums want to display it. Linters personally send thank-you flowers.</p>
                </div>

                <div className="skill-card">
                    <span className="skill-icon">⚡</span>
                    <h3 className="skill-title">Lightning Speed</h3>
                    <p className="skill-desc">Types so fast, keyboards unionize for breaks. Completes sprints before the planning meeting ends.</p>
                </div>

                <div className="skill-card">
                    <span className="skill-icon">🎨</span>
                    <h3 className="skill-title">Design Mastery</h3>
                    <p className="skill-desc">CSS bends to their will. Pixels march in perfect formation. Figma sends job offers weekly.</p>
                </div>

                <div className="skill-card">
                    <span className="skill-icon">🦸</span>
                    <h3 className="skill-title">Bug Destroyer</h3>
                    <p className="skill-desc">Stack Overflow actually asks THEM for help. Has fixed bugs in code that wasn't even written yet.</p>
                </div>

                <div className="skill-card">
                    <span className="skill-icon">☕</span>
                    <h3 className="skill-title">Coffee Consumer</h3>
                    <p className="skill-desc">Single-handedly props up Colombia's GDP. Blood type: Espresso++. Veins run on pure caffeine.</p>
                </div>

                <div className="skill-card">
                    <span className="skill-icon">🌙</span>
                    <h3 className="skill-title">Sleep? Never Heard of It</h3>
                    <p className="skill-desc">The moon asks for permission to set. Dreams in JavaScript. Counts commits instead of sheep.</p>
                </div>

                <div className="skill-card">
                    <span className="skill-icon">🤝</span>
                    <h3 className="skill-title">Team Player Extraordinaire</h3>
                    <p className="skill-desc">Makes code reviews feel like therapy. Merge conflicts see them coming and resolve themselves.</p>
                </div>
            </div>

            {/* Quote Section */}
            <div className="quote-section">
                <p className="quote-text">
                    "I don't always write code, but when I do, it compiles on the first try... 
                    okay maybe second... fine, third time's the charm. 
                    Actually, it always worked, I was just testing the compiler!"
                </p>
            </div>

            {/* Warning Section */}
            <div className="warning-section">
                <p className="warning-text">
                    ⚠️ WARNING: Prolonged exposure to this developer may cause severe imposter syndrome, 
                    uncontrollable admiration, and spontaneous standing ovations.
                </p>
            </div>
        </section>
    )
}
