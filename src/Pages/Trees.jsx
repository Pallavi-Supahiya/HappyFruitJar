import { useState, useMemo } from 'react';
import Section from "../components/UI/Section";
import TreeListCard from "../components/Trees/TreeListCard";
import TreeDetailModal from "../components/Trees/TreeDetailModal";
import SubscriptionModal from "../components/SubscriptionModal";
import { treesData } from "../data/trees";
import "../styles/Trees.css";

function Trees() {
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showInStockOnly, setShowInStockOnly] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
    const [selectedTree, setSelectedTree] = useState(null);

    // Available filters (Dynamic)
    const filters = useMemo(() => {
        const types = [...new Set(treesData.map(t => t.type))].sort();
        return ['All', ...types];
    }, []);

    // Filter Logic
    const filteredTrees = useMemo(() => {
        return treesData.filter(tree => {
            const matchesType = filter === 'All' || tree.type === filter;
            const matchesSearch = tree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tree.region.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesAvailability = showInStockOnly ? tree.isAvailable : true;

            return matchesType && matchesSearch && matchesAvailability;
        });
    }, [filter, searchQuery, showInStockOnly]);

    const handleTreeSelect = (tree) => {
        setSelectedTree(tree);
        setModalOpen(true);
    };

    return (
        <div className="trees-page">
            <Section title="Tree Subscriptions" subtitle="Find the perfect fruit tree for you and your family to adopt.">

                {/* Intro Text */}
                <div className="trees-intro">
                    <p>Browse our selection of premium fruit trees from across the country. Filter by fruit type or search to find your match.</p>
                </div>

                {/* Search & Filter */}
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search specific trees or regions..."
                        className="tree-search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="filter-bar">
                    <label className="filter-pill checkbox-pill" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: showInStockOnly ? '#e8f5e9' : 'white', border: showInStockOnly ? '1px solid #8BC34A' : '1px solid #eee' }}>
                        <input
                            type="checkbox"
                            checked={showInStockOnly}
                            onChange={(e) => setShowInStockOnly(e.target.checked)}
                            style={{ accentColor: '#8BC34A' }}
                        />
                        In Stock Only
                    </label>
                    <div className="divider" style={{ width: '1px', height: '24px', background: '#ddd', margin: '0 8px' }}></div>
                    {filters.map(f => (
                        <button
                            key={f}
                            className={`filter-pill ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {filteredTrees.length > 0 ? (
                    <div className="trees-grid">
                        {filteredTrees.map(tree => (
                            <TreeListCard
                                key={tree.id}
                                tree={tree}
                                onSelect={handleTreeSelect}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                        <h3>No trees found matching your criteria.</h3>
                        <p>Try clearing your filters or search query.</p>
                        <button
                            className="filter-pill"
                            style={{ marginTop: '20px', background: '#eee' }}
                            onClick={() => { setFilter('All'); setSearchQuery(''); }}
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

            </Section>

            {/* Detail Modal */}
            <TreeDetailModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                tree={selectedTree}
                onGetStarted={() => {
                    setModalOpen(false); // Close detail modal first? Or keep open? User flow suggestion: close detail, open sub.
                    // Actually usually stacking modals is bad on mobile.
                    // Let's close detail modal then open subscription.
                    // Or I can keep selectedTree state and maybe pass it to subscription modal later if needed.
                    // For now, simple open.
                    setTimeout(() => setSubscriptionModalOpen(true), 200); // Small delay for smooth transition
                }}
            />

            <SubscriptionModal
                isOpen={subscriptionModalOpen}
                onClose={() => setSubscriptionModalOpen(false)}
            />
        </div>
    );
}

export default Trees;
