import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import LoginPage from './container/LoginPage/LoginPage';
import { Routes, Route, Link } from "react-router-dom";
import ListPage from './container/ListPage/ListPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/list" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default App;
