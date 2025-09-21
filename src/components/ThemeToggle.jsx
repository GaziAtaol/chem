import PropTypes from 'prop-types';

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired
};