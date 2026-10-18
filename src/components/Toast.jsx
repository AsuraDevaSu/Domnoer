export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-alert">
      <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#34d399' }}>
        check_circle
      </span>
      <span>{message}</span>
    </div>
  );
}
