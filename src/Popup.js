// Popup.js
import React from "react";

function Popup({ onClose, player }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Player {player} wins!</h2>
        <button onClick={onClose}>Play Again</button>
      </div>
    </div>
  );
}

export default Popup;
