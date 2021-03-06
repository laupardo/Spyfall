import Layout from "../components/Layout";
import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  Box,
  Grid,
  makeStyles,
  Button,
  IconButton,
  Divider,
  TextField,
  Tooltip,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Image from "material-ui-image";
import { Add, PlayArrow } from "@material-ui/icons";
import NextLink from "../components/NextLink";
import FacebookIcon from "../public/assets/facebook.svg";
import GoogleIcon from "../public/assets/google.svg";
import { withTranslation, Router } from "../plugins/i18n";
import { connect } from "react-redux";
import { appendToString } from "../store/actions/test";
import { createMatch, joinMatch } from "../store/actions/matches";
import store from "../store";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CustomTooltip from "../components/CustomTooltip";
import { Alert } from "../components/Alert";

const useStyles = makeStyles((theme) => ({
  imageContainer: { height: "auto", width: "320px", marginTop: 45 },
  button: {
    borderRadius: "87px",
    margin: "0px 0px 32px 0px",
    width: 300,
    letterSpacing: 1.25,
  },
  socialIcon: {
    borderRadius: "50%",
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
  },
  textDivider: {
    position: "absolute",
    margin: "auto",
    backgroundColor: "#fff",
    padding: "4px 10px 4px 10px",
    top: "-13px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
    borderWidth: "0px",
    borderColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
  },
  rightBar: {
    [theme.breakpoints.up("md")]: {
      textAlign: "end",
      paddingRight: 40,
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));

const Home = function Home(props) {
  const { t, helloWorld, auth, createMatch, joinMatch, error } = props;
  const styles = useStyles();

  const handleCodeEnter = async (code) => {
    if (auth && auth.user && auth.user.user)
      try {
        await joinMatch(code, auth.user.user);
        Router.push("/waiting-room");
      } catch (error) {
        console.error(error);
      }
  };

  const handleGuestName = async (name) => {
    try {
      await createMatch(ws.current, name);
    } catch (error) {
      console.error(error);
    }
  };

  const userLoggedJoin = async (code) => {
    await joinMatch(ws.current, "", code);
  };

  const openJoinModal = async (name, code) => {
    await joinMatch(ws.current, name, code);
  };

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [matchCode, setMatchCode] = useState(undefined);
  const [guestName, setGuestName] = useState(undefined);
  const [hasWs, setHasWs] = useState(false);

  const ws = useRef(null);

  useEffect(() => {
    let HOST = "ws://spyfall.ml:3001";
    ws.current = new WebSocket(HOST);
    ws.current.onopen = (e) => {
      console.log("Ws connected");
      setHasWs(true);
    };
    ws.current.onclose = () => console.log("ws closed");

    //return () => ws.current.close();
  }, []);

  return (
    <Layout justifyContent="space-between" info={t("info")}>
      {
        // <Modal openModal={openModal} handleCloseModal={handleCloseModal} />
      }
      <Box className={styles.imageContainer}>
        <Image role="none" src="/assets/logo.png" aspectRatio={1.9} />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          align="center"
          variant="subtitle1"
          style={{ marginBottom: 40, marginTop: 50, letterSpacing: 1.25 }}
        >
          {t("title")}
        </Typography>
        {!hasWs ? (
          <CustomTooltip title="Please wait until the page finishes loading">
            <Box display="flex" flexDirection="column">
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                disabled={!hasWs}
                style={!hasWs ? { pointerEvents: "none" } : {}}
                className={styles.button}
                startIcon={<Add />}
                onClick={
                  auth.user
                    ? async () => createMatch(ws.current, auth.user.user)
                    : async () => setOpenModal(true)
                }
              >
                {t("create-match")}
              </Button>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                disabled={!hasWs}
                className={styles.button}
                style={!hasWs ? { pointerEvents: "none" } : {}}
                startIcon={<PlayArrow />}
                onClick={() => setOpen(true)}
              >
                {t("join-match")}
              </Button>
            </Box>
          </CustomTooltip>
        ) : (
          <Box display="flex" flexDirection="column">
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              className={styles.button}
              startIcon={<Add />}
              onClick={
                auth.user
                  ? async () => createMatch(ws.current, auth.user.user)
                  : async () => setOpenModal(true)
              }
            >
              {t("create-match")}
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              className={styles.button}
              startIcon={<PlayArrow />}
              onClick={() => setOpen(true)}
            >
              {t("join-match")}
            </Button>
          </Box>
        )}

        <Box
          onClick={() => Router.push("/how-to-play")}
          style={{ cursor: "pointer" }}
        >
          {t("how-to-play")}
        </Box>
      </Box>
      {!auth.user && (
        <>
          <Box
            display="flex"
            justifyContent="center"
            position="relative"
            width="60%"
            margin="30px 0px 30px 0px"
          >
            <Divider variant="fullWidth" style={{ height: 1, width: "100%" }} />
            <Typography variant="caption" className={styles.textDivider}>
              {t("or")}
            </Typography>
          </Box>

          <Typography variant="h2">{helloWorld}</Typography>

          <Box>
            <Typography
              variant="subtitle1"
              style={{ marginBottom: 20, letterSpacing: 1.25 }}
            >
              {t("login-title")}
            </Typography>

            <Box display="flex" justifyContent="center" marginBottom="120px">
              <IconButton
                aria-label="Google"
                onClick={() =>
                  location.assign("http://spyfall.ml:3001/auth/google")
                }
              >
                <GoogleIcon className={styles.socialIcon} />
              </IconButton>
              <IconButton
                aria-label="Facebook"
                onClick={() =>
                  location.assign("http://spyfall.ml:3001/auth/facebook")
                }
              >
                <FacebookIcon className={styles.socialIcon} />
              </IconButton>
            </Box>
          </Box>
        </>
      )}

      {/* Modal for Create a Match */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={styles.modal}
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        style={{ outline: "none" }}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openModal}>
          <div className={styles.paper}>
            <Typography variant="h5" style={{ marginBottom: 30 }}>
              {t("modal-create-title")}
            </Typography>
            <form
              noValidate
              autoComplete="off"
              style={{ marginBottom: 30 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <TextField
                id="outlined-basic"
                label={t("name")}
                style={{ width: "100%" }}
                variant="outlined"
                value={guestName}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key == "Enter") return handleGuestName(guestName);
                }}
                onChange={(event) => setGuestName(event.target.value)}
              />
            </form>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Button
                className={styles.button}
                color="primary"
                variant="contained"
                style={{ margin: "auto" }}
                onClick={() => handleGuestName(guestName)}
              >
                {t("create-match")}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      {/* Modal for Join a Match */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={styles.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <div className={styles.paper}>
            {auth.user ? (
              <div />
            ) : (
              <div>
                <Typography variant="h5" style={{ marginBottom: 30 }}>
                  {t("modal-create-title")}
                </Typography>
                <form
                  noValidate
                  autoComplete="off"
                  style={{ marginBottom: 30 }}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <TextField
                    id="outlined-basic-2"
                    label={t("name")}
                    style={{ width: "100%" }}
                    variant="outlined"
                    value={guestName}
                    autoFocus
                    onChange={(event) => setGuestName(event.target.value)}
                  />
                </form>
              </div>
            )}
            <Typography variant="h5" style={{ marginBottom: 30 }}>
              {t("modal-title")}
            </Typography>
            <form
              noValidate
              autoComplete="off"
              style={{ marginBottom: 30 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <TextField
                id="outlined-basic-3"
                label={t("code")}
                style={{ width: "100%" }}
                variant="outlined"
                value={matchCode}
                autoFocus={auth.user}
                onChange={(event) => setMatchCode(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key == "Enter")
                    return auth.user
                      ? userLoggedJoin(matchCode)
                      : openJoinModal(guestName, matchCode);
                }}
              />
            </form>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Button
                className={styles.button}
                color="primary"
                variant="contained"
                onClick={() =>
                  auth.user
                    ? userLoggedJoin(matchCode)
                    : openJoinModal(guestName, matchCode)
                }
              >
                {t("join-match")}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      {error && <Alert error={error} errorSeverity="error" />}
    </Layout>
  );
};

Home.getInitialProps = async ({ store }) => {
  return { namespacesRequired: ["home"] };
};

Home.propTypes = {
  auth: PropTypes.object,
  createMatch: PropTypes.func.isRequired,
  joinMatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  match: state.match,
  error: state.matches.error,
  errorSeverity: state.matches.errorSeverity,
});

const mapDispatchToProps = {
  append: appendToString,
  createMatch,
  joinMatch,
};

export default withTranslation("home")(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
