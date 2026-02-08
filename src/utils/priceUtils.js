/**
 * Calculates the discounted price based on the offer object.
 * @param {string} priceStr - The raw price string (e.g., "₹5,499 / season")
 * @param {object|null} offer - The offer object { type: "PERCENT", value: number }
 * @returns {object} - { original, discounted, hasDiscount, saveAmount }
 */
export const getPriceDetails = (priceStr, offer) => {
    // 1. Validate Input
    if (typeof priceStr !== 'string') {
        return {
            original: priceStr || '',
            discounted: null,
            hasDiscount: false,
            saveAmount: 0
        };
    }

    // 2. Extract numeric value
    const numericPrice = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);

    if (!offer || offer.type !== 'PERCENT' || !offer.value) {
        return {
            original: priceStr,
            discounted: null,
            hasDiscount: false,
            saveAmount: 0
        };
    }

    // 2. Calculate Discount
    const discountAmount = (numericPrice * offer.value) / 100;
    const finalPrice = Math.round(numericPrice - discountAmount);

    // 3. Format Currency (Indian Rupee)
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    });

    return {
        original: priceStr, // Keep original string with "/ season"
        discounted: `${formatter.format(finalPrice)} / season`,
        hasDiscount: true,
        discountValue: offer.value,
        saveAmount: Math.round(discountAmount)
    };
};
