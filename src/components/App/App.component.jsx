import React, { useState, useContext } from 'react';
import SearchContext from '../../context/search-context';
import CurrentVideoContext from '../../context/current-video-context';
import SessionDetailsContext from '../../context/session-details-context';
import AuthProvider from '../../Providers/Auth';
import { ThemeContext } from '../../context/theme-context';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../globalStyles';
import { lightTheme, darkTheme } from '../../Themes';

import Header from '../Header';
import MainContainer from '../MainContainer';
import VideosContainer from '../VideosContainer';
import VideoDetailsView from '../VideoDetailsView';

import NotFound from '../../pages/NotFound/NotFound';
import LoginPage from '../../pages/Login/Login.page';
import FavouriteVideosView from '../../pages/Favourites/FavouriteVideosView.page';

function App() {
  const theme = useContext(ThemeContext);
  const { state: { darkMode = false } = {} } = theme;

  const [searchQuery, setSearchQuery] = useState('wizeline');
  const value = { searchQuery, setSearchQuery };

  const [videoDetails, setVideoDetails] = useState({
    id: '',
    title: '',
    description: '',
    imgsrc: '',
  });
  const videoValue = {
    videoDetails,
    setVideoDetails,
  };

  const [sessionDetails, setSessionDetails] = useState({
    id: '',
    name: '',
    avatarUrl: '',
  });
  const sessionValue = {
    sessionDetails,
    setSessionDetails,
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={darkMode === false ? lightTheme : darkTheme}>
          <>
            <GlobalStyles />
            <SessionDetailsContext.Provider value={sessionValue}>
              <CurrentVideoContext.Provider value={videoValue}>
                <SearchContext.Provider value={value}>
                  <Header />
                  <MainContainer>
                    <Switch>
                      <Route exact path="/">
                        <VideosContainer />
                      </Route>
                      <Route path="/video/:videoId">
                        <VideoDetailsView />
                      </Route>
                      <Route path="/login">
                        <LoginPage />
                      </Route>
                      <Route path="/favourites">
                        <FavouriteVideosView />
                      </Route>
                      <Route path="*">
                        <NotFound />
                      </Route>
                    </Switch>
                  </MainContainer>
                </SearchContext.Provider>
              </CurrentVideoContext.Provider>
            </SessionDetailsContext.Provider>
          </>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
