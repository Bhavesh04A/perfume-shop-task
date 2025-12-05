// frontend/src/utils/currency.js
export const formatCurrency = (amount) => {
    if (typeof amount !== 'number') {
        return '₹ 0.00';
    }

    // Uses the 'en-IN' locale for the Indian numbering system and 'INR' for the Rupee symbol.
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    }).format(amount);
};