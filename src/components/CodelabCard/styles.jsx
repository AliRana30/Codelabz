import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "45vw"
    },
    [theme.breakpoints.up("md")]: {
      width: "50vw"
    },
    position: "relative",
    maxWidth: "100%",
    textAlign: "left",
    minHeight: "20vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  heading: {
    fontWeight: 700,
    marginTop: theme.spacing(-1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem"
    }
  },
  body: {
    padding: theme.spacing(0, 4, 0, 7),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2)
    }
  },
  tags: {
    fontWeight: "500",
    color: theme.palette.text.secondary
  },
  avatar: {
    height: "2.5rem",
    width: "2.5rem",
    border: `1.5px solid ${theme.palette.divider}`,
    borderRadius: "50%"
  },
  cardContent: {
    paddingTop: theme.spacing(2)
  },
  cardAction: {
    padding: theme.spacing(0, 0, 0, 7.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2)
    }
  },
  button: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5, 1)
    }
  },
  logo: {
    width: "2.5rem",
    height: "2rem",
    zIndex: "1"
  },
  organizationLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: theme.spacing(1),
    width: "auto"
  },
  cardHeader: {
    padding: theme.spacing(2, 2, 0, 2)
  },
  statsCount: {
    [theme.breakpoints.down(600)]: {
      display: "none"
    }
  },
  readTime: {
    whiteSpace: "nowrap",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  headerGrid: {
    display: "flex",
    alignItems: "center",
    position: "relative"
  },
  personImg: {
    zIndex: 2,
    height: "2.5rem",
    width: "2.5rem",
    border: `1.5px solid ${theme.palette.common.black}`,
    borderRadius: "50%"
  },
  logoImg: {
    height: "1.2rem",
    position: "absolute",
    right: -5,
    bottom: -5,
    zIndex: 3,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "50%",
    padding: "2px"
  }
}));

export default useStyles;
