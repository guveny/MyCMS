// File: MyCMS/frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ManageContent from './pages/ManageContent';
import ManageUsers from './pages/ManageUsers';
import ManageThemes from './pages/ManageThemes';
import ManageContacts from './pages/ManageContacts';
import ManageBlogs from './pages/ManageBlogs';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import Profile from './pages/Profile';
import PageView from './pages/PageView';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute path="/dashboard" component={Dashboard} role="admin" />
          <ProtectedRoute path="/manage-content" component={ManageContent} role="admin" />
          <ProtectedRoute path="/manage-users" component={ManageUsers} role="admin" />
          <ProtectedRoute path="/manage-themes" component={ManageThemes} role="admin" />
          <ProtectedRoute path="/manage-contacts" component={ManageContacts} role="admin" />
          <ProtectedRoute path="/manage-blogs" component={ManageBlogs} role="admin" />
          <Route path="/create-page" component={CreatePage} />
          <Route path="/edit-page/:id" component={EditPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/page/:id" component={PageView} />
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default App;
