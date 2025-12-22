import React from "react";
import { useIntl } from "react-intl";
import Typography from "../../../components/Typography";
import useTheme from "../../../misc/hooks/useTheme";
import { createUseStyles } from "react-jss";
import { ANIME_DETAILS_MODES } from "../../../misc/constants/animeDetailsModes";
import Button from "../../../components/Button";
import Edit from "../../../components/icons/Edit";
import useChangePage from "../../../misc/hooks/useChangePage";
import pagesURLs from "../../../constants/pagesURLs";
import * as pages from "../../../constants/pages";

const getClasses = createUseStyles((theme) => ({
  detailsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "20px auto",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  toggleBtn: {
    minWidth: "80px",
    height: "28px",
    textAlign: "right",
  }
}));

const DetailsHeader = ({ mode, setMode }) => {
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  const { formatMessage } = useIntl();
  const changePage = useChangePage();

  return (
    <div className={classes.detailsHeader}>
      <div>
        {
          mode === ANIME_DETAILS_MODES.VIEW || mode === ANIME_DETAILS_MODES.CREATE
            ? <Button
              onClick={() => changePage({
                pathname: pagesURLs[pages.animeList],
              })}
              sx={{
                border: "none !important",
              }}
            >
              <Typography color="#fff">
                {
                  formatMessage({ id: 'backBtn' })
                }
              </Typography>
            </Button>
            : null
        }
      </div>
      <div className={classes.right}>
        <Typography color="#000">{formatMessage({ id: 'mode' })}: {mode}</Typography>
        <div className={classes.toggleBtn}>
          {
            mode === ANIME_DETAILS_MODES.VIEW
              ? <Button
                onClick={() => setMode(ANIME_DETAILS_MODES.UPDATE)}
                sx={{
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  minWidth: "initial",
                  background: "transparent !important",
                  border: "none !important",
                }}>
                <Edit color="#51b051" />
              </Button>
              : (mode === ANIME_DETAILS_MODES.UPDATE
                ? <Button
                  sx={{
                    border: "none !important",
                  }}
                  onClick={() => setMode(ANIME_DETAILS_MODES.VIEW)}
                >
                  <Typography color="#fff">
                    {formatMessage({ id: 'cancelBtn' })}
                  </Typography>
                </Button>
                : <Button
                  sx={{
                    border: "none !important",
                  }}
                  onClick={() => changePage({
                    pathname: pagesURLs[pages.animeList],
                  })}
                >
                  <Typography color="#fff">
                    {formatMessage({ id: 'cancelBtn' })}
                  </Typography>
                </Button>
              )
          }
        </div>
      </div>
    </div>
  );
}

export default DetailsHeader;