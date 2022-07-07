import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#595555" : "whitesmoke",
  };
  return (
    <div className="my-die" style={styles} onClick={props.holdDice}>
      <h2 className="die-num"> {props.value}</h2>
    </div>
  );
}
