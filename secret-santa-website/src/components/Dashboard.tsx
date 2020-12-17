import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../scripts/auth";
import {
  getUser,
  User,
  addListener,
  startDrawing,
  resetDrawing,
} from "../scripts/db";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<User>({
    name: "",
    desire: "",
    email: "",
    dislike: "",
    personDesire: "",
    personDislike: "",
  });
  const [command, setCommand] = useState<string>("not started");
  const { currentUser } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/SecretSanta/login");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    if (currentUser) {
      getUser(currentUser.uid).then((user) => {
        setUserData(user.data() as User);
      });
    }
  }, [currentUser, userData]);

  useEffect(() => {
    addListener("commands/commandCenter", (snap) => {
      setCommand(snap.data()?.state);
    });
  }, [command]);

  if (command === "not started") {
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Name:</strong> {userData.name}
            <br></br>
            <strong>Email:</strong> {userData.email}
            <br></br>
            <strong>Desires:</strong> {userData.desire}
            <br></br>
            <strong>Dislikes:</strong> {userData.dislike}
            {userData.userType === "admin" && (
              <>
                <br></br>
                <div className="w-100 text-center mt-2">
                  <Button
                    className="w-100"
                    onClick={startDrawing}
                    variant="primary"
                  >
                    Start Drawing
                  </Button>
                </div>
              </>
            )}
            <Link to="/SecretSanta/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </>
    );
  } else if (command === "started") {
    return (
      <>
        <Card>
          <Card.Body>
            <div className="text-center mt-2">
              <CircularProgress color="secondary" />
            </div>
            <div className="w-100 text-center mt-2">
              <h2>Pairing...</h2>
              {userData.userType === "admin" && (
                <>
                  <br></br>
                  <Button
                    onClick={resetDrawing}
                    variant="danger"
                    className="w-100"
                  >
                    Cancel Drawing
                  </Button>
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Name:</strong> {userData.name}
            <br></br>
            <strong>Email:</strong> {userData.email}
            <br></br>
            <strong>Desires:</strong> {userData.desire}
            <br></br>
            <strong>Dislikes:</strong> {userData.dislike}
            <br></br>
            <strong>Person:</strong> {userData.person}
            <br></br>
            <strong>Person Desire:</strong> {userData.personDesire}
            <br></br>
            <strong>Person Dislike:</strong> {userData.personDislike}
            {userData.userType === "admin" && (
              <>
                <br></br>
                <div className="w-100 text-center mt-2">
                  <Button
                    onClick={resetDrawing}
                    variant="danger"
                    className="w-100"
                  >
                    Reset Drawing
                  </Button>
                </div>
              </>
            )}
            <Link to="/SecretSanta/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </>
    );
  }
}
