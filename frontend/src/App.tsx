import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TasksPage } from './pages/TasksPage';
import { LogsPage } from './pages/LogsPage';
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
