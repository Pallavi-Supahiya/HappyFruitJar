import { getPriceDetails } from '../../utils/priceUtils';

function TreeListCard({ tree, onSelect }) {
    const { original, discounted, hasDiscount, discountValue } = getPriceDetails(tree.price, tree.offer);

    return (
        <div className="tree-card" style={{ position: 'relative' }}>
            {hasDiscount && (
                <div className="discount-badge" style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#D32F2F',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    zIndex: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                    {discountValue}% OFF
                </div>
            )}
            <div className="tree-card-image-wrapper">
                <img src={tree.image} alt={tree.name} className="tree-card-image" />
            </div>

            <div className="tree-card-content">
                <span className="tree-brand-tag">{tree.type}</span>
                <h3 className="tree-title">{tree.name}</h3>

                <div className="tree-specs">
                    <div className="spec-item" title="Region">
                        <span className="spec-icon">📍</span> {tree.region}
                    </div>
                </div>

                <div className="tree-specs">
                    <div className="spec-item" title="Harvest Window">
                        <span className="spec-icon">🗓️</span> {tree.harvestWindow}
                    </div>
                    <div className="spec-item" title="Estimated Yield">
                        <span className="spec-icon">⚖️</span> {tree.yield}
                    </div>
                </div>

                <div className="tree-card-footer" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="tree-price-container" style={{ height: '54px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        {hasDiscount ? (
                            <>
                                <span className="tree-price-original" style={{ textDecoration: 'line-through', color: '#888', fontSize: '0.9rem', margin: 0, lineHeight: 1.2 }}>
                                    {original}
                                </span>
                                <span className="tree-price-discounted" style={{ color: '#2E3D2F', fontWeight: 'bold', fontSize: '1.1rem', margin: 0, lineHeight: 1.2 }}>
                                    {discounted}
                                </span>
                            </>
                        ) : (
                            <span className="tree-price">{original}</span>
                        )}
                    </div>
                    <button
                        className="tree-link"
                        onClick={() => onSelect(tree)}
                    >
                        Know More →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TreeListCard;
