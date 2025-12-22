import { useIntl } from 'react-intl';
import React from 'react';
import Typography from 'components/Typography';
import useChangePage from 'misc/hooks/useChangePage';
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";

function Default() {
  const { formatMessage } = useIntl();
  const changePage = useChangePage();

  return (
    <>
      <Typography>
        {formatMessage({ id: 'title' })}:&nbsp;
        <a href="/"
          onClick={
            (e) => {
              e.preventDefault();
              changePage({ pathname: pagesURLs[pages.animeList] });
            }
          }
          style={{ color: "inherit", fontWeight: "600" }}
        >
          {formatMessage({ id: 'linkText' })}
        </a>
      </Typography>
    </>
  );
}

export default Default;
