import React from 'react';

import { SignInPage } from './pages/sign-in/sign-in-page.component';
import  BrokenGlass  from './pages/broken-glass-menu/broken-glass.component';
import Survey from './components/survey/survey.component';
import userWelcome from './pages/user-welcome/user-welcome.component';
import Dashboard from './pages/dashboard/dashboard.component';

import { Switch, Route } from 'react-router-dom';




function App() {
  return (
    
    <div>

      <Route exact path="/" component={SignInPage} />
      <Route exact path='/welcome-1' component={BrokenGlass} />
      <Route exact path='/survey/id' component={Survey} />
      <Route exact path='/dear-user' component={userWelcome} />
      <Route exact path='/dashboard' component={Dashboard} />

      
    </div>
  );
}

export default App;
