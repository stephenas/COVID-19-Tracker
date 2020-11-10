import React from "react";
import "./InfoBox.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, active, isRed, isRed1, total, ...args }) {
  return (
    <Card
      onClick={args.onClick}
      className={`infoBox__card ${active && "infoBox__card--selected"} ${
        isRed1 && "infoBox__card--redCases"
      } ${isRed && "infoBox__card--red"} 
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" className="infoBox__title">
          {title}
        </Typography>
        <h2
          className={`infoBox__cases ${isRed1 && "infoBox__cases--redCases"} ${
            isRed && "infoBox__cases--red"
          } 
      }`}
        >
          {cases}
        </h2>
        <Typography color="textSecondary" className="infoBox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
