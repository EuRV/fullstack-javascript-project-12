import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-bootstrap';

import Panel from './components/Panel';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import PrivateRoute from './components/PrivatePage';
import Chat from './components/chat/Chat';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <Panel />
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  </div>
);

export default App;
