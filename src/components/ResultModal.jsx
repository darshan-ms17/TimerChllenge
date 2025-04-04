
export default function ResultModal({ result, targetTime, score }) {
  return (
    <dialog className="result-modal" open>
      <h2>Challenge {result}!</h2>
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      <p>Your final score is <strong>{score} clicks</strong>.</p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}

