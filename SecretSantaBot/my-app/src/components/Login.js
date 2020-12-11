import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import firebase from "../firebase.js";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authed: false,
      desire: "",
      creating: false,
      drawState: "",
      name: "",
      userData: "",
    };
  }

  componentDidMount() {
    let ref = this;
    let db = firebase.firestore();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("hihihi", user.uid);
        let data = null;
        let docRef = db.collection("users").doc(user.uid);
        Promise.all([
          docRef.get().then(function (doc) {
            if (doc.exists) {
              data = doc.data();
              console.log("THE USER", user);
            }
          }),
        ]).then(() => {
          ref.setState({ authed: true });
          ref.setState({ userData: data });
        });
      }
    });

    db.collection("commands")
      .doc("commandCenter")
      .onSnapshot(function (doc) {
        ref.setState({ drawState: doc.data()["state"] });
      });
  }

  createUser = () => {
    this.setState({ creating: true });
    let db = firebase.firestore();
    let ref = this;
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        db.collection("users")
          .doc(user.uid)
          .set({
            desire: this.state.desire,
            name: this.state.name,
            person: "",
            personDesire: "",
          })
          .then(function () {
            ref.setState({ creating: false });
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  login = () => {
    this.setState({ creating: true });
    let ref = this;
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        ref.setState({ creating: false });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (!this.state.authed || this.state.creating) {
      return (
        <Container
          component="main"
          maxWidth="xs"
          style={{ marginTop: "200px" }}
        >
          <CssBaseline />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Poo Poo Secret Santa
            </Typography>
            <Tab.Container
              id="left-tabs-example"
              defaultActiveKey="first"
              style={{ marginTop: "25px" }}
            >
              <Row style={{ marginTop: "35px" }}>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Create Account</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Log In</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <form noValidate>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="name"
                          label="Name"
                          name="name"
                          autoComplete="name"
                          autoFocus
                          onChange={this.handleChange}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          onChange={this.handleChange}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password (10+ chars)"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          onChange={this.handleChange}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="desire"
                          label="What You Want/ Do Not Want"
                          name="desire"
                          autoComplete="email"
                          autoFocus
                          onChange={this.handleChange}
                        />

                        <Row style={{ marginTop: "25px" }}>
                          <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={this.createUser}
                          >
                            {this.state.creating
                              ? "Creating"
                              : "Create Account"}
                          </Button>
                        </Row>
                      </form>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <form noValidate>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          onChange={this.handleChange}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          onChange={this.handleChange}
                        />

                        <Row style={{ marginTop: "25px" }}>
                          <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={this.login}
                          >
                            {this.state.creating ? "Logging In" : "Log In"}
                          </Button>
                        </Row>
                      </form>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      );
    } else {
      return (
        <Container
          className="justify-content-center"
          style={{
            justifyContent: "center",
            textAlign: "center",
            marginTop: "200px",
          }}
        >
          <CircularProgress color="secondary" />
          {this.state.drawState == "wait" && (
            <h2>The drawing has not started.</h2>
          )}
          {this.state.drawState == "started" && (
            <h2>Drawing has started. Wait.</h2>
          )}
          {this.state.drawState == "release" && (
            <>
              <h2>Here's who you got. Sucks to suck.</h2>
              <h8>Person : {this.state.userData.person}</h8>
              <h8>Person : {this.state.userData.personDesire}</h8>
            </>
          )}
        </Container>
      );
    }
  }
}
