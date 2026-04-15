import { useGame } from "../state/GameContext.jsx";

export default function GameControls({ user }) {
  const { dispatch, state } = useGame();

  const disabledReset = !user || state.status === "idle";
  const disabledHint = !user || state.status !== "playing";

  return (
    <div className="button-group">
      <button
        className="cta-button"
        onClick={() => dispatch({ type: "RESET" })}
        disabled={disabledReset}
      >
        Reset
      </button>

      <button
        className="cta-button"
        onClick={() => dispatch({ type: "HINT" })}
        disabled={disabledHint}
      >
        Hint
      </button>
    </div>
  );
}