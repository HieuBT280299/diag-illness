import { makeStyles } from "@material-ui/core";
import React from "react";
import { Jumbotron as Jumbo } from "reactstrap";
import styled from "styled-components";
import HospitalCsvUpload from "../UploadCsv/HospitalCsvUpload";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 64,
    backgroundColor: theme.palette.background.paper,
    minHeight: "100vh",
    width: "100%",
  },
  container: {
    backgroundColor: "#ddd",
  },
}));

const Jumbotron = styled(Jumbo)`
  &&& {
    padding: 70px 30px 70px 30px;
    margin: 0px auto;
    background: none;

    h2 {
      font-family: "Bebas Neue", cursive;
      color: #21211e;
      font-size: 60px;
      font-weight: 700;
      text-transform: capitalize;
      margin-top: 0;
    }

    h4 {
      font-family: "Open Sans", sans-serif;
      color: #21211e;
      font-weight: 300;
      line-height: 30px;
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      margin-top: 50px;
    }
  }
`;

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Jumbotron className="d-none d-sm-block">
        <div className="container">
          <div className="row row-header">
            <div>
              <h2>My page</h2>
              <h4>My page description</h4>
            </div>
          </div>
        </div>
      </Jumbotron>
    </div>
  );
};

export default React.memo(Home);
