import { useGame } from "../state/GameContext.jsx";

export default function GameControls({ user }) {
  const { dispatch, state } = useGame();

  const disabledReset = !user || state.status === "idle";

  return (
    <div className="button-group">
      <button
        className="cta-button"
        onClick={() => dispatch({ type: "RESET" })}
        disabled={disabledReset}
      >
        Reset
      </button>
    </div>
  );
}
