// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import PostsPage from './PostsPage';
import PostDetailsPage from './PostDetailsPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes> {/* Use Routes instead of Route */}
                <Route path="/" element={<PostsPage />} />
                <Route path="/post/:id" element={<PostDetailsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
