import PropTypes from 'prop-types';

export default function ElementDetails({ element, categoryLabels }) {
  if (!element) {
    return (
      <div className="element-details">
        <div className="element-details__empty">
          <div className="element-details__empty-icon">🔬</div>
          <h2>Element seçin</h2>
          <p>Soldaki tablodan bir elemente dokunarak detaylı bilgilerini görüntüleyin.</p>
        </div>
      </div>
    );
  }

  const readableCategory = categoryLabels[element.category] ?? element.category;

  return (
    <div className="element-details" key={element.number}>
      <div className="element-details__header">
        <div className="element-details__symbol">{element.symbol}</div>
        <div className="element-details__header-info">
          <h2>{element.name}</h2>
          <p className="element-details__meta">Atom Numarası: <strong>{element.number}</strong></p>
          <div className="element-details__category-badge">
            <span className={`category-badge category-badge--${element.category.replace(/\s+/g, '-')}`}>
              {readableCategory}
            </span>
          </div>
        </div>
      </div>
      
      <div className="element-details__properties">
        <div className="element-details__properties-grid">
          <div className="property-card">
            <div className="property-card__icon">📊</div>
            <div className="property-card__content">
              <dt>Periyot</dt>
              <dd>{element.period}</dd>
            </div>
          </div>
          
          <div className="property-card">
            <div className="property-card__icon">📋</div>
            <div className="property-card__content">
              <dt>Grup</dt>
              <dd>{element.group ?? '—'}</dd>
            </div>
          </div>
          
          <div className="property-card">
            <div className="property-card__icon">🎯</div>
            <div className="property-card__content">
              <dt>Kategori</dt>
              <dd>{readableCategory}</dd>
            </div>
          </div>
        </div>
      </div>
      
      <div className="element-details__summary">
        <h3>📖 Açıklama</h3>
        <p>{element.summary ?? 'Bu element için özet bilgisi mevcut değil.'}</p>
      </div>
    </div>
  );
}

ElementDetails.propTypes = {
  element: PropTypes.shape({
    number: PropTypes.number,
    symbol: PropTypes.string,
    name: PropTypes.string,
    period: PropTypes.number,
    group: PropTypes.number,
    category: PropTypes.string,
    summary: PropTypes.string
  }),
  categoryLabels: PropTypes.objectOf(PropTypes.string)
};

ElementDetails.defaultProps = {
  element: null,
  categoryLabels: {}
};
