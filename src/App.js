import React from 'react';

import { SignInPage } from './pages/sign-in/sign-in-page.component';

import { Switch, Route } from 'react-router-dom';



function App() {
  return (
    
    <div>

      <Route exact path="/" component={SignInPage} />
      
      
      
    </div>
  );
}

export default App;
