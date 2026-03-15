import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store';
import Layout from './components/Layout';
import Home from './pages/Home';
import ModuleSelect from './pages/ModuleSelect';
import QuestionBuilder from './pages/QuestionBuilder';
import WhatsMissing from './pages/WhatsMissing';
import ChainOfWhy from './pages/ChainOfWhy';

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<ModuleSelect />} />
          <Route path="/question-builder" element={<QuestionBuilder />} />
          <Route path="/whats-missing" element={<WhatsMissing />} />
          <Route path="/chain-of-why" element={<ChainOfWhy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}
