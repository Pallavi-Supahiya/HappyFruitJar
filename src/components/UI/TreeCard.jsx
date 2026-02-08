import "../../styles/Plans.css";

import { getPriceDetails } from '../../utils/priceUtils';

function TreeCard({ image, name, price, region, harvest, window, onRent, offer }) {
    // Note: 'offer' prop needs to be passed from Home.jsx. Assuming Home.jsx maps treesData which includes offer.
    // However, Home.jsx map currently does:
    // <TreeCard ... price={tree.price} ... />
    // It doesn't pass the whole tree or the offer. 
    // I need to update Home.jsx to pass 'offer={tree.offer}' or 'tree={tree}'.
    // For now, I will update TreeCard to accept 'offer' and handle the display.
    // I will *also* need to update Home.jsx next.

    // Actually, looking at Home.jsx map:
    // <TreeCard ... price={tree.price} ... />
    // It passes individual props. I need to update Home.jsx to pass offer.

    // Let's assume offer is passed.
    const { original, discounted, hasDiscount, discountValue } = getPriceDetails(price, offer);

    return (
        <div className="plan-card" style={{ position: 'relative' }}>
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
            <img src={image} alt={name} className="plan-image" />
            <div className="plan-content">
                <h3>{name}</h3>

                <div className="price-container" style={{ height: '54px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {hasDiscount ? (
                        <>
                            <p className="price" style={{ textDecoration: 'line-through', color: '#888', margin: '0 0 2px 0', fontSize: '0.9rem', lineHeight: '1.2' }}>{original}</p>
                            <p className="price" style={{ color: '#2E3D2F', fontWeight: 'bold', margin: '0', fontSize: '1.2rem', lineHeight: '1.2' }}>{discounted}</p>
                        </>
                    ) : (
                        <p className="price" style={{ margin: 0 }}>{original}</p>
                    )}
                </div>

                {region && <p className="price" style={{ fontSize: '0.9rem', color: '#666' }}>Region – {region}</p>}
                {window && <p className="price" style={{ fontSize: '0.9rem', color: '#666' }}>Harvest window: {window}</p>}
                <button onClick={onRent} style={{ position: 'relative', zIndex: 10 }}>Explore Tree</button>
            </div>
        </div>
    );
}

export default TreeCard;
