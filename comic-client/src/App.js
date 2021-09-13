import React from 'react';
import Header from './components/header/header';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Homepage from './components/homepage/homepage';
import ComicIssuePage from './components/comic-issue/comic-issue-page';
import Search from './components/search/search';
import SignPage from './components/sign/sign-page';
import ProfilePage from './components/profile/profile-page';
import EditProfilePage from './components/edit-profile/edit-profile-page';
import Library from './components/library/library';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ComicReviewCreationPage from './components/comic-review-creation/comic-review-creation-page';
import SignoutPage from './components/signout/signout-page';
import SignDependentRoute from './components/router/sign-dependent-route';
import ComicReviewPage from './components/comic-review/comic-review-page';
import ComicReviewUpdatePage from './components/comic-review-creation/comic-review-update-page';
// import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#202020',
      },
      secondary: {
        main: '#e23636',
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/comic/:comicId" component={ComicIssuePage} />
          <SignDependentRoute
            forSigned
            exact
            path="/comic/:comicId/reviews/create"
            component={ComicReviewCreationPage}
          />
          <SignDependentRoute exact path="/sign/:form" component={SignPage} />
          <SignDependentRoute
            forSigned
            exact
            path="/signout"
            component={SignoutPage}
          />
          <Route exact path="/profile/:nickname" component={ProfilePage} />
          <Route exact path="/profile/:nickname/library" component={Library} />
          <SignDependentRoute
            forSigned
            exact
            path="/edit-profile"
            component={EditProfilePage}
          />
          <Route exact path="/reviews/:reviewId" component={ComicReviewPage} />
          <SignDependentRoute
            forSigned
            exact
            path="/reviews/:reviewId/update"
            component={ComicReviewUpdatePage}
          />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
