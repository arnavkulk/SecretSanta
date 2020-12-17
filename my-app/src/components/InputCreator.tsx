import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Row, Col } from "react-bootstrap";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // width: "25ch",
    },
  },
}));

const centerCol: CSSProperties = {
  justifyContent: "center",
  flexDirection: "column",
  display: "flex",
  marginTop: "25px",
};

export default function InputCreator(props) {
  const classes = useStyles();
  const { titles, types, errors, struct, names, rows } = props;

  let inputs = [];

  let globalIndex = 0;
  for (let i = 0; i < struct.length; i++) {
    let layout = struct[i];
    let multinelineprops = {};
    if (types[globalIndex] === "textarea") {
      multinelineprops = {
        multiline: true,
        rows: rows[globalIndex],
        maxRows: rows[globalIndex],
      };
    }
    let sizing = 12 / layout;
    for (let k = 0; k < layout; k++) {
      inputs.push(
        <Col md={sizing} style={centerCol}>
          <TextField
            id="outlined-basic"
            label={titles[globalIndex]}
            variant="outlined"
            error={errors[globalIndex]}
            type={types[globalIndex]}
            onChange={props.callback}
            name={names[globalIndex]}
            value={props.values[names[globalIndex]]}
            {...multinelineprops}
            required
            onBlur={props.onBlur}
            onFocus={props.onFocus}
          />
        </Col>
      );

      globalIndex++;
    }
  }
  return (
    <Container fluid={true}>
      <form className={classes.root} noValidate autoComplete="off">
        <Row className="justify-content-center">{inputs}</Row>
      </form>
    </Container>
  );
}
