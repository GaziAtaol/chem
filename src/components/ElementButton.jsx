import PropTypes from 'prop-types';

const categoryClassMap = {
  'diatomic nonmetal': 'element-button--nonmetal',
  'polyatomic nonmetal': 'element-button--nonmetal',
  'noble gas': 'element-button--noble-gas',
  'alkali metal': 'element-button--alkali',
  'alkaline earth metal': 'element-button--alkaline-earth',
  'metalloid': 'element-button--metalloid',
  'post-transition metal': 'element-button--post-transition',
  'transition metal': 'element-button--transition',
  'lanthanide': 'element-button--lanthanide',
  'actinide': 'element-button--actinide',
  'unknown, probably transition metal': 'element-button--unknown',
  'unknown, probably metalloid': 'element-button--unknown',
  'unknown, probably post-transition metal': 'element-button--unknown'
};

export default function ElementButton({ element, isSelected, isFiltered, onSelect }) {
  const categoryClass = categoryClassMap[element.category] ?? 'element-button--default';

  return (
    <button
      type="button"
      className={`element-button ${categoryClass} ${isSelected ? 'element-button--selected' : ''} ${isFiltered ? 'element-button--filtered' : ''}`}
      onClick={() => onSelect(element.number)}
      title={`${element.number} - ${element.name}`}
      style={{ gridColumn: element.xpos, gridRow: element.ypos }}
    >
      <span className="element-button__number">{element.number}</span>
      <span className="element-button__symbol">{element.symbol}</span>
      <span className="element-button__name">{element.name}</span>
    </button>
  );
}

ElementButton.propTypes = {
  element: PropTypes.shape({
    number: PropTypes.number.isRequired,
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    xpos: PropTypes.number.isRequired,
    ypos: PropTypes.number.isRequired
  }).isRequired,
  isSelected: PropTypes.bool,
  isFiltered: PropTypes.bool,
  onSelect: PropTypes.func.isRequired
};

ElementButton.defaultProps = {
  isSelected: false,
  isFiltered: false
};
