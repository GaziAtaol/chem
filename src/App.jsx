import { useMemo, useState } from 'react';
import PeriodicTable from './components/PeriodicTable.jsx';
import ElementDetails from './components/ElementDetails.jsx';
import CodeViewer from './components/CodeViewer.jsx';
import { elements } from './data/elements.js';

const categoryLabels = {
  'diatomic nonmetal': 'Diatomik Ametal',
  'noble gas': 'Soygaz',
  'alkali metal': 'Alkali Metal',
  'alkaline earth metal': 'Toprak Alkali Metal',
  'metalloid': 'Yari Metal',
  'polyatomic nonmetal': 'Ametal',
  'post-transition metal': 'Geçiş Sonrası Metal',
  'transition metal': 'Geçiş Metali',
  'lanthanide': 'Lantanit',
  'actinide': 'Aktinit',
  'unknown, probably transition metal': 'Bilinmeyen / Muhtemel Geçiş Metali',
  'unknown, probably metalloid': 'Bilinmeyen / Muhtemel Yari Metal',
  'unknown, probably post-transition metal': 'Bilinmeyen / Muhtemel Geçiş Sonrası Metal'
};

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [showCode, setShowCode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const selectedElement = useMemo(
    () => elements.find((element) => element.number === selectedNumber),
    [selectedNumber]
  );

  const filteredElements = useMemo(() => {
    return elements.filter((element) => {
      const matchesSearch = searchTerm === '' || 
        element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === '' || element.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filterCategory]);

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>Kimya Çalışma Alanı</h1>
          <p>Periyodik tablodaki herhangi bir elementi seçerek temel bilgilerini keşfedin.</p>
        </div>
        <button 
          className="code-toggle"
          onClick={() => setShowCode(!showCode)}
          title={showCode ? "Kod görünümünü gizle" : "Kod görünümünü göster"}
        >
          {showCode ? "📱 Normal Görünüm" : "💻 Kod Görünümü"}
        </button>
      </header>

      <main className={`app__main ${showCode ? 'app__main--with-code' : ''}`}>
        <section className="app__table">
          <div className="search-controls">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Element ara (isim veya sembol)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="search-clear"
                  title="Aramayı temizle"
                >
                  ✕
                </button>
              )}
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="category-filter"
            >
              <option value="">Tüm kategoriler</option>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <PeriodicTable
            elements={filteredElements}
            allElements={elements}
            selectedNumber={selectedNumber}
            onSelect={setSelectedNumber}
            searchTerm={searchTerm}
            filterCategory={filterCategory}
          />
        </section>
        <aside className="app__info">
          <ElementDetails element={selectedElement} categoryLabels={categoryLabels} />
        </aside>
        {showCode && (
          <section className="app__code">
            <CodeViewer selectedElement={selectedElement} />
          </section>
        )}
      </main>
    </div>
  );
}
