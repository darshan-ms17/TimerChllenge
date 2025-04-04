import Player from './components/Player.jsx';
import TimerChange from './components/TimerChange.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChange title="Easy" targetTime={20}/>
        <TimerChange title="Not Easy" targetTime={50}/>
        <TimerChange title="Getting Tough" targetTime={100}/>
        <TimerChange title="Pros Only" targetTime={150}/>
      </div>
    </>
  );
}

export default App;
