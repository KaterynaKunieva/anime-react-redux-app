import React from 'react';
import { createUseStyles } from 'react-jss';
import { useIntl } from 'react-intl';
import useTheme from 'misc/hooks/useTheme';
import Button from 'components/Button';
import Typography from 'components/Typography';
import PageContainer from 'pageProviders/components/PageContainer';

const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
  },
  content: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: `${theme.spacing(3)}px`,
    maxWidth: '400px',
  },
}));

function Login(props) {
  const { formatMessage } = useIntl();
  const { theme } = useTheme();
  const classes = useStyles({ theme });

  const handleGoogleLogin = () => {
    const currentPath = window.location.pathname + window.location.search;
    window.location.href = `/oauth/authenticate?redirectTo=${encodeURIComponent(currentPath)}`;
  };

  return (
    <PageContainer>
      <div className={classes.container}>
        <div className={classes.content}>
          <Typography variant="h4">
            {formatMessage({ id: "welcome.title" })}
          </Typography>
          <Typography variant="body1">
            {formatMessage({ id: "welcome.text" })}
          </Typography>
          <Button
            colorVariant="primary"
            onClick={handleGoogleLogin}
            variant="contained"
          >
            <strong>
              {formatMessage({ id: "welcome.btn" })}
            </strong>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}

export default Login;