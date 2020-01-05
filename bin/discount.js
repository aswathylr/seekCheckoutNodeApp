exports.findDiscountedPrice = function (itemsInCart, actualPrice, itemsInDeal) {
    return (itemsInCart * actualPrice) / itemsInDeal
}