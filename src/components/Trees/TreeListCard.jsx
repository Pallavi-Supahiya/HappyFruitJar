function TreeListCard({ tree, onSelect }) {

    return (
        <div className="tree-card">
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

                <div className="tree-card-footer">
                    <span className="tree-price">{tree.price}</span>
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
