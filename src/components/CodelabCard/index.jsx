import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import ChatIcon from "@mui/icons-material/Chat";
import useStyles from "./styles";
import PropTypes from "prop-types";

import Skeleton from "@mui/material/Skeleton";

const CardComponent = ({
  title = "I made 100 more CSS loaders for your next project",
  tags = "#css #webdev #beginners #html",
  profilePic = "demoperson4.jpeg",
  org = false,
  background = "white",
  userName = "Demo Name",
  orgName = "ScoreLabz",
  date = "May 25, 2021",
  likes = 222,
  comments = 20,
  readTime = "10 min read",
  loading = false,
  logo = "/logo.jpeg"
}) => {
  const classes = useStyles();

  if (loading) {
    return (
      <Card className={classes.card} style={{ background: background }}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <CardContent>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>
        <CardActions disableSpacing>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={6}>
              <Skeleton
                animation="wave"
                height={10}
                width="30%"
                style={{ marginLeft: "1rem" }}
              />
            </Grid>
            <Grid item xs={6} container justify="flex-end">
              <Skeleton
                animation="wave"
                height={30}
                width="40%"
                style={{ marginRight: "1rem" }}
              />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
  }

  return (
    <>
      <Card
        maxWidth="sm"
        className={classes.card}
        style={{ background: background }}
        data-testId="codelabzCard"
      >
        <CardHeader
          data-testId="codelabzCardHeader"
          className={classes.cardHeader}
          avatar={
            <Grid
              container
              className={classes.organizationLogo}
              direction="column"
              justify="center"
              alignItems="center"
            >
              {org ? (
                <Grid container>
                  <Grid item className={classes.headerGrid}>
                    <img src={logo} alt="logo" className={classes.logoImg} />
                    <img
                      src={
                        profilePic.startsWith("http")
                          ? profilePic
                          : new URL(
                              `../../assets/images/${profilePic}`,
                              import.meta.url
                            ).href
                      }
                      alt=""
                      className={classes.personImg}
                    />
                  </Grid>
                </Grid>
              ) : (
                <img
                  src={
                    profilePic.startsWith("http")
                      ? profilePic
                      : new URL(
                          `../../assets/images/${profilePic}`,
                          import.meta.url
                        ).href
                  }
                  alt=""
                  className={classes.avatar}
                />
              )}
            </Grid>
          }
          title={
            org ? (
              <Typography variant="body">
                {userName} {<span style={{ color: "#7D7C7D" }}>for</span>}{" "}
                {orgName}
              </Typography>
            ) : (
              <Typography variant="body">{userName}</Typography>
            )
          }
          subheader={date}
          titleTypographyProps={{ align: "left" }}
          subheaderTypographyProps={{ align: "left" }}
        />
        <CardContent
          data-testId="codelabzCardContent"
          className={classes.cardContent}
          style={{ paddingBottom: "0rem" }}
        >
          <Grid
            container
            alignItems="left"
            justify="flex-start"
            direction="column"
            className={classes.body}
          >
            <Grid item>
              <Typography variant="h5" gutterBottom className={classes.heading}>
                {title}
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="left"
            >
              <Typography
                variant="body2"
                color="textPrimary"
                className={"mr-8 " + classes.tags}
              >
                {tags}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing className={classes.cardAction}>
          <Grid
            container
            xs={6}
            justify="left"
            direction="row"
            data-testId="codelabzCardButtonGroup"
          >
            {!org && (
              <Grid item container alignItems="center" xs="auto">
                <IconButton style={{ color: "red" }}>
                  <FavoriteIcon />
                </IconButton>
                <Typography
                  variant="body"
                  color="textPrimary"
                  className={classes.statsCount}
                >
                  {likes}
                </Typography>
              </Grid>
            )}
            <Grid item container alignItems="center" xs="auto">
              <IconButton aria-label="comment" style={{ color: "green" }}>
                <ChatIcon />
              </IconButton>
              <Typography
                variant="body"
                color="textPrimary"
                className={classes.statsCount}
              >
                {org ? "comment" : comments}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            xs={6}
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.readTime}
              >
                {readTime}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "royalblue", margin: "16px" }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.string,
  profilePic: PropTypes.string,
  org: PropTypes.bool,
  background: PropTypes.string,
  userName: PropTypes.string,
  orgName: PropTypes.string,
  date: PropTypes.string,
  likes: PropTypes.number,
  comments: PropTypes.number,
  readTime: PropTypes.string,
  loading: PropTypes.bool,
  logo: PropTypes.string
};
export default CardComponent;
