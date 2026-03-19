import { showSuccessMsg } from '../services/event-bus.service.js'

const { Link } = ReactRouterDOM

export function Home() {
    return (
        <section className="home">
            {/* Hero Section */}
            <div className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Your Productivity
                        <span className="gradient-text"> Supercharged</span>
                    </h1>
                    <p className="hero-subtitle">
                        Manage your emails and notes in one beautiful, 
                        intuitive workspace. Stay organized, stay focused.
                    </p>
                    <div className="hero-cta">
                        <Link to="/note" className="btn btn-primary">
                            Get Started
                        </Link>
                        <Link to="/mail" className="btn btn-secondary">
                            Explore Mail
                        </Link>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="floating-card card-1">
                        <span className="card-icon">📝</span>
                        <span>Quick Notes</span>
                    </div>
                    <div className="floating-card card-2">
                        <span className="card-icon">✉️</span>
                        <span>Smart Mail</span>
                    </div>
                    <div className="floating-card card-3">
                        <span className="card-icon">✅</span>
                        <span>Task Done!</span>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="features">
                <h2 className="section-title">Why Choose Us</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Lightning Fast</h3>
                        <p>Instant load times with seamless navigation between all your tools.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎨</div>
                        <h3>Beautiful Design</h3>
                        <p>Clean, modern interface that makes productivity a pleasure.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure & Private</h3>
                        <p>Your data stays safe with local storage and privacy-first approach.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Fully Responsive</h3>
                        <p>Perfect experience on any device, from desktop to mobile.</p>
                    </div>
                </div>
            </section>

            {/* Apps Showcase */}
            <section className="apps-showcase">
                <h2 className="section-title">Our Apps</h2>
                <div className="apps-grid">
                    <Link to="/note" className="app-card note-app">
                        <div className="app-card-header">
                            <span className="app-icon">📒</span>
                            <h3>Appsus Notes</h3>
                        </div>
                        <div className="app-card-body">
                            <img 
                                src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=250&fit=crop" 
                                alt="Notes App Preview" 
                                className="app-preview-img"
                            />
                            <ul className="app-features">
                                <li>✓ Create text & image notes</li>
                                <li>✓ Todo lists with checkboxes</li>
                                <li>✓ Color-coded organization</li>
                                <li>✓ Pin important notes</li>
                            </ul>
                        </div>
                        <div className="app-card-footer">
                            <span className="explore-link">Explore Notes →</span>
                        </div>
                    </Link>

                    <Link to="/mail" className="app-card mail-app">
                        <div className="app-card-header">
                            <span className="app-icon">✉️</span>
                            <h3>Appsus Mail</h3>
                        </div>
                        <div className="app-card-body">
                            <img 
                                src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=250&fit=crop" 
                                alt="Mail App Preview" 
                                className="app-preview-img"
                            />
                            <ul className="app-features">
                                <li>✓ Compose & send emails</li>
                                <li>✓ Inbox management</li>
                                <li>✓ Star important messages</li>
                                <li>✓ Search & filter</li>
                            </ul>
                        </div>
                        <div className="app-card-footer">
                            <span className="explore-link">Explore Mail →</span>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-number">99%</span>
                        <span className="stat-label">Uptime</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">∞</span>
                        <span className="stat-label">Notes</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">0</span>
                        <span className="stat-label">Ads</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">100%</span>
                        <span className="stat-label">Free</span>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Get Organized?</h2>
                    <p>Start managing your notes and emails like a pro today.</p>
                    <button 
                        className="btn btn-cta"
                        onClick={() => showSuccessMsg('Welcome aboard! 🚀')}
                    >
                        Start Now — It's Free
                    </button>
                </div>
            </section>
        </section>
    )
}