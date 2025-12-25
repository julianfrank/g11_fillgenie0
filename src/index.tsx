import React from 'react';
import { createRoot } from 'react-dom/client';
import { LoanForm } from './components/LoanForm';
import { AdminConsole } from './components/AdminConsole';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);

// Simple client-side routing based on filename
const isPage = (name: string) => window.location.pathname.endsWith(name);

if (isPage('admin.html')) {
    root.render(<AdminConsole />);
} else {
    // Default App (Customer Form)
    root.render(
        <div className="container py-5">
            <header className="mb-5 text-center">
                <h1 className="display-4 fw-bold text-primary mb-2 letter-spacing-2">Demo Form</h1>
                <p className="lead text-light-emphasis letter-spacing-1 text-uppercase small">Complex Form Demo</p>
                <div className="mt-2">
                    <a href="./admin.html" className="text-decoration-none me-3 text-secondary">Admin Console</a>
                    <a href="./help.html" className="text-decoration-none me-3 text-secondary">Documentation</a>
                    <a href="./tech.html" className="text-decoration-none text-secondary">System Arch</a>
                </div>
            </header>

            <main>
                <LoanForm />
            </main>

            <footer className="mt-5 text-center text-muted small">


                <p>Julian Frank &copy; 2026. Some rights reserved 😉</p>
            </footer>
        </div>
    );
}
