import React from 'react';
import { createRoot } from 'react-dom/client';
import { LoanForm } from './components/LoanForm';

const App = () => {
    return (
        <div className="container py-5">
            <header className="mb-5 text-center">
                <h1 className="display-4 fw-bold text-primary mb-2">Helios Capital</h1>
                <p className="lead text-light-emphasis">Advanced Photovoltaic Asset Financing Initiation</p>
            </header>

            <main>
                <LoanForm />
            </main>

            <footer className="mt-5 text-center text-muted small">
                <p>Helios Capital &copy; 2024. All rights reserved. <br /> Access restricted to authorized underwriting personnel.</p>
                <div className="mt-2">
                    <a href="/admin.html" className="text-decoration-none me-3 text-secondary">Admin Console</a>
                    <a href="/help.html" className="text-decoration-none me-3 text-secondary">Documentation</a>
                    <a href="/tech.html" className="text-decoration-none text-secondary">System Arch</a>
                </div>
            </footer>
        </div>
    );
};

const rootId = document.getElementById('root');
if (rootId) {
    const root = createRoot(rootId);
    root.render(<App />);
}
