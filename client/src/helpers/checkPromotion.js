const checkPromotion = (promotionDetails, product) => {
    const promotionDetail = promotionDetails.find(
        (item) => item.product._id === product._id
    );

    return promotionDetail ? promotionDetail : null;
};

export default checkPromotion;
