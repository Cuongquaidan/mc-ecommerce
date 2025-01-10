const ungroupProductBrand = (groups) => {
    const ungrouped = [];
    groups.forEach((group) => {
        group.products.forEach((product) => {
            ungrouped.push(product);
        });
    });
    return ungrouped;
};

export default ungroupProductBrand;
