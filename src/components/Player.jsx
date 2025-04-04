import { useState } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState('');
  const [submitted, setsubmitted] = useState(false);

  function handleChange (event){
    setsubmitted(false)
    setPlayerName(event.target.value)
  }

  function handleClick (event){
    setsubmitted(true)
  }
 
  return (
    <section id="player">
      <h2>Welcome { submitted ? playerName : 'unknown entity'}</h2>
      <p>
        <input type="text" onChange={handleChange} value={playerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
