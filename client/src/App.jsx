import React, {lazy, Suspense} from "react";
import {Switch, Route} from 'react-router-dom';
import Spinner from "components/Spinner";
import TopNavigation from "components/TopNavigation";
import HomePage from 'pages/HomePage';
import {useUser} from 'contexts/UserContext';

const FilmDesсription = lazy(() => import('pages/FilmsPage/components/FilmDesсription'))
const FilmsPage = lazy(() => import('pages/FilmsPage'))
const SignupPage = lazy(() => import('pages/SignupPage'))
const LoginPage = lazy(() => import('pages/LoginPage'))


const App = () => {
  const [message, setMessage] = React.useState('');

  const [user] = useUser();

 return (
     <Suspense fallback={<Spinner />}>
    <div className="ui container mt-3">
      <TopNavigation />
      {message && <div className="ui info message">{message}</div>}
      <Switch>
        
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/films">
          <FilmsPage user={user} />
        </Route>
        
        <Route path="/signup">
          <SignupPage setMessage={setMessage}/>
        </Route>

        <Route path="/login">
          <LoginPage  />
        </Route>

        <Route path="/film/:id">
          <FilmDesсription />
        </Route>
        
      </Switch> 
    </div>
    </Suspense>
    );
  }

export default App;
