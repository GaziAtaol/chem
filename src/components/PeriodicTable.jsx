import PropTypes from 'prop-types';
import ElementButton from './ElementButton.jsx';

const categoryOrder = [
  'diatomic nonmetal',
  'polyatomic nonmetal',
  'noble gas',
  'alkali metal',
  'alkaline earth metal',
  'metalloid',
  'post-transition metal',
  'transition metal',
  'lanthanide',
  'actinide'
];

const categoryLabels = {
  'diatomic nonmetal': 'Diatomik Ametal',
  'polyatomic nonmetal': 'Ametal',
  'noble gas': 'Soygaz',
  'alkali metal': 'Alkali Metal',
  'alkaline earth metal': 'Toprak Alkali Metal',
  'metalloid': 'Yari Metal',
  'post-transition metal': 'Geçiş Sonrası Metal',
  'transition metal': 'Geçiş Metali',
  'lanthanide': 'Lantanit',
  'actinide': 'Aktinit'
};

export default function PeriodicTable({ elements, selectedNumber, onSelect }) {
  return (
    <div className="periodic-table">
      <div className="periodic-table__grid">
        {elements.map((element) => (
          <ElementButton
            key={element.number}
            element={element}
            isSelected={element.number === selectedNumber}
            onSelect={onSelect}
          />
        ))}
      </div>
      <div className="periodic-table__legend">
        {categoryOrder.map((category) => (
          <div key={category} className="periodic-table__legend-item">
            <span className={`legend-swatch legend-swatch--${category.replace(/\s+/g, '-')}`} />
            <span>{categoryLabels[category]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

PeriodicTable.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired
    })
  ).isRequired,
  selectedNumber: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};
