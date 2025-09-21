import PropTypes from 'prop-types';

export default function ElementDetails({ element, categoryLabels }) {
  if (!element) {
    return (
      <div className="element-details">
        <h2>Element seçin</h2>
        <p>Soldaki tablodan bir elemente dokunarak bilgilerini görüntüleyin.</p>
      </div>
    );
  }

  const readableCategory = categoryLabels[element.category] ?? element.category;

  return (
    <div className="element-details" key={element.number}>
      <div className="element-details__header">
        <div className="element-details__symbol">{element.symbol}</div>
        <div>
          <h2>{element.name}</h2>
          <p className="element-details__meta">Atom Numarası: {element.number}</p>
        </div>
      </div>
      <dl className="element-details__list">
        <div>
          <dt>Kategori</dt>
          <dd>{readableCategory}</dd>
        </div>
        <div>
          <dt>Periyot</dt>
          <dd>{element.period}</dd>
        </div>
        <div>
          <dt>Grup</dt>
          <dd>{element.group ?? '—'}</dd>
        </div>
      </dl>
      <p className="element-details__summary">
        {element.summary ?? 'Bu element için özet bilgisi mevcut değil.'}
      </p>
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
