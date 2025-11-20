import { type PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Tasks', to: '/' },
  { label: 'Audit Logs', to: '/logs' },
];

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand__logo">🗂️</span>
          <div>
            <p className="brand__title">Task Manager</p>
          </div>
        </div>
        <nav className="sidebar__nav">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="main-panel">
        <header className="topbar">
          <div>
            <h1>Task Manager Dashboard</h1>
            <p>Manage tasks, track actions, and stay audit-ready.</p>
          </div>
        </header>

        <main className="content-area">{children}</main>
      </div>
    </div>
  );
}
