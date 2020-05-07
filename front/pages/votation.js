import Layout from "../components/Layout";
import {
  Typography,
  Box,
  makeStyles,
  Button,
  Avatar,
  Card,
  CardContent,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import moment from "moment/moment";
import { NavigationSharp } from "@material-ui/icons";
import { withTranslation } from "../plugins/i18n";

import { Router } from "../plugins/i18n";

const useStyles = makeStyles((theme) => ({
  imageContainer: { height: "auto", width: "320px", marginTop: 45 },
  button: {
    borderRadius: "87px",
    width: 220,
    letterSpacing: 1.25,
    padding: "10px 30px 10px 30px",
    borderRadius: "87px",
    color: "white",
    marginTop: 50,
    marginBottom: 50,
    color: theme.palette.getContrastText(theme.palette.success.main),
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: "#1B7D46",
    },
  },
  card: {
    margin: "5px 5px 5px 5px",
    width: 150,
    height: 80,
    flex: "0 0 45%",
  },
}));

const Countdown = ({ finishTime, t }) => {
  const getTimeLeft = () => {
    const initTime = moment(new Date(finishTime));
    const sub = initTime.subtract(moment(new Date()));
    return sub.valueOf();
  };

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timeLeft - 1000 > 0) setTimeLeft((prev) => prev - 1000);
      if (timeLeft <= 10000) setIsFinishing(true);
    }, 1000);

    return () => clearInterval(countdown);
  }, [finishTime, timeLeft]);

  return (
    <Typography
      variant="h4"
      color={isFinishing ? "error" : "textPrimary"}
      align="center"
    >
      {moment(timeLeft).minutes()} {t("minutes")} {moment(timeLeft).seconds()}{" "}
      {t("seconds")}
    </Typography>
  );
};

const Votation = function ({
  t,
  role = "spy",
  finishTime = "Mon May 04 2020 07:00:00 GMT-0500",
}) {
  const styles = useStyles();
  const createTable = () => {
    let table = [];
    for (let i = 0; i < 12; i++) {
      table.push(
        <Card className={styles.card}>
          <CardContent>
            <Box display="flex" justifyContent="left" alignItems="center" flexWrap="wrap">
              <Box margin="0px 10px 0px 10px">
                <Avatar align="center">H</Avatar>
              </Box>

              <Typography align="center" variant="subtitle1">
                {t("votation")}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      );
    }
    return table;
  };
  return (
    <Layout secondary={true}>
      <Box display="flex" flexDirection="column" alignItems="left">
        <Typography
          align="left"
          variant="h4"
          style={{ marginBottom: 5, marginTop: 50, letterSpacing: 1.25 }}
        >
          {t("votation")}
        </Typography>
      </Box>
      <Box style={{ marginBottom: 20 }}>
        <Countdown finishTime={finishTime} t={t} />
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        flexWrap="wrap"
        margin="0px 20% 0px 20%"
      >
        {createTable()}
      </Box>
      <Box display="flex" flexDirection="row">
        <Button
          variant="contained"
          size="medium"
          color="success"
          className={styles.button}
          startIcon={<NavigationSharp />}
          onClick={() => Router.push("/publish-votation")}
        >
          {t("vote")}
        </Button>
      </Box>
    </Layout>
  );
};

Votation.getInitialProps = async () => ({
  namespacesRequired: ["votation"],
});

export default withTranslation("votation")(Votation);
