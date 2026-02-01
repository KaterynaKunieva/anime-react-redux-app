import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { addAxiosInterceptors } from 'misc/requests';
import * as pages from 'constants/pages';
import Login from 'pageProviders/Login';
import DefaultPage from 'pageProviders/Default';
import Loading from 'components/Loading';
import Notification from 'components/Notification';
import PageContainer from 'pageProviders/components/PageContainer';
import pageURLs from 'constants/pagesURLs';
import AnimeListPage from 'pageProviders/AnimeList';
import AnimeDetailsPage from 'pageProviders/AnimeDetails';
import ThemeProvider from 'misc/providers/ThemeProvider';

import actionsUser from '../actions/user';
import Header from '../components/Header';
import IntlProvider from '../components/IntlProvider';
import MissedPage from '../components/MissedPage';
import SearchParamsConfigurator from '../components/SearchParamsConfigurator';

function App() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    componentDidMount: false,
    notificationMessage: null,
    notificationIsVisible: false,
  });

  const {
    isAuthorized,
    isFetchingUser,
  } = useSelector(({ user }) => user);

  useEffect(() => {
    addAxiosInterceptors({
      onSignOut: () => dispatch(actionsUser.fetchSignOut()),
    });

    dispatch(actionsUser.fetchUser());

    setState(prevState => ({
      ...prevState,
      componentDidMount: true,
    }));
  }, [dispatch]);

  const showNotification = (notificationMessage) => {
    setState(prevState => ({
      ...prevState,
      notificationMessage,
      notificationIsVisible: true,
    }))
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <SearchParamsConfigurator />
        {state.componentDidMount && (
          <IntlProvider>
            <Header onLogout={() => dispatch(actionsUser.fetchSignOut())} />

            {isFetchingUser && (
              <PageContainer>
                <Loading />
              </PageContainer>
            )}

            {!isFetchingUser && (
              <>
                {!isAuthorized ? (
                  <Login />
                ) : (
                  <Routes>
                    <Route
                      element={<DefaultPage />}
                      path={`${pageURLs[pages.defaultPage]}`}
                    />
                    <Route
                      element={<AnimeListPage showNotification={showNotification} />}
                      path={pageURLs[pages.animeList]}
                    />
                    <Route
                      element={<AnimeDetailsPage showNotification={showNotification} />}
                      path={pageURLs[pages.animeNew]}
                    />
                    <Route
                      element={
                        <AnimeDetailsPage
                          defaultPage={pageURLs[pages.defaultPage]}
                          showNotification={showNotification}
                        />
                      }
                      path={pageURLs[pages.animeDetails]}
                    />
                    <Route
                      element={<MissedPage redirectPage={`${pageURLs[pages.defaultPage]}`} />}
                      path="*"
                    />
                  </Routes>
                )}
              </>
            )}

            <Notification
              message={state.notificationMessage}
              isVisible={state.notificationIsVisible}
              setIsVisible={(isVisible) => setState(prevState => ({
                ...prevState,
                notificationIsVisible: isVisible
              }))}
            />
          </IntlProvider>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;