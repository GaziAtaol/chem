import PropTypes from 'prop-types';

const getElementCode = (element) => {
  if (!element) return '';
  
  return `// Element verisi örneği
const element = ${JSON.stringify(element, null, 2)};

// Element butonunu oluşturma
<ElementButton
  element={element}
  isSelected={element.number === selectedNumber}
  onSelect={setSelectedNumber}
/>

// Element detaylarını gösterme
<ElementDetails 
  element={element} 
  categoryLabels={categoryLabels} 
/>`;
};

const getComponentCode = () => {
  return `// Ana App bileşeni
import { useMemo, useState } from 'react';
import PeriodicTable from './components/PeriodicTable.jsx';
import ElementDetails from './components/ElementDetails.jsx';

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState(1);
  
  const selectedElement = useMemo(
    () => elements.find((element) => element.number === selectedNumber),
    [selectedNumber]
  );

  return (
    <div className="app">
      <PeriodicTable
        elements={elements}
        selectedNumber={selectedNumber}
        onSelect={setSelectedNumber}
      />
      <ElementDetails 
        element={selectedElement} 
        categoryLabels={categoryLabels} 
      />
    </div>
  );
}`;
};

export default function CodeViewer({ selectedElement }) {
  const elementCode = selectedElement ? getElementCode(selectedElement) : '';
  const componentCode = getComponentCode();

  return (
    <div className="code-viewer">
      <div className="code-viewer__header">
        <h3>💻 Kod Görünümü</h3>
        <p>Seçili elementin kodunu ve React bileşenlerini görebilirsiniz.</p>
      </div>
      
      {selectedElement && (
        <div className="code-section">
          <h4>📄 Seçili Element: {selectedElement.name} ({selectedElement.symbol})</h4>
          <pre className="code-block">
            <code>{elementCode}</code>
          </pre>
        </div>
      )}
      
      <div className="code-section">
        <h4>⚛️ React Bileşeni Yapısı</h4>
        <pre className="code-block">
          <code>{componentCode}</code>
        </pre>
      </div>
      
      <div className="code-section">
        <h4>🎨 CSS Grid Kullanımı</h4>
        <pre className="code-block">
          <code>{`.periodic-table__grid {
  display: grid;
  grid-template-columns: repeat(18, minmax(0, 1fr));
  grid-auto-rows: 90px;
  gap: 8px;
}

.element-button {
  grid-column: var(--xpos);
  grid-row: var(--ypos);
}`}</code>
        </pre>
      </div>
    </div>
  );
}

CodeViewer.propTypes = {
  selectedElement: PropTypes.shape({
    number: PropTypes.number,
    symbol: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    period: PropTypes.number,
    group: PropTypes.number,
    summary: PropTypes.string,
    xpos: PropTypes.number,
    ypos: PropTypes.number
  })
};

CodeViewer.defaultProps = {
  selectedElement: null
};