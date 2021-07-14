import {
  makeStyles,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar
} from "@material-ui/core";
import { AddCircleOutline, SubjectOutlined } from "@material-ui/icons";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { format } from 'date-fns'
//reusable
const drawerWidth = 240;

//styles
const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar: theme.mixins.toolbar,
    date: {
        flex: 1
    },
    avatar: {
        marginLeft: theme.spacing(2)
    }
  };
});

export default function Layout({ children }) {
  const classes = useStyles();

  //history
  const history = useHistory();

  //location
  const location = useLocation();

  //list itens
  const menuItens = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutline color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.date}>
              Today is the { format(new Date(), 'do MMMM Y') }
          </Typography>

          <Typography>
              Pedro
          </Typography>
          <Avatar src="/foto.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>

      {/* sidedrawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            My Notes
          </Typography>
        </div>

        {/* list / links */}
        <List>
          {menuItens.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
          <div className={classes.toolbar}></div>
          {children}
        </div>
    </div>
  );
}
