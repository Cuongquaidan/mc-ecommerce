function groupProductByBrand(products) {
    return products.reduce((acc, product) => {
        const brand = product.product.brandName;
        if (acc.some((item) => item.brand === brand)) {
            acc.find((item) => item.brand === brand).products.push(product);
        } else if (!acc.some((item) => item.brand === brand)) {
            acc.push({ brand, products: [product] });
        }
        return acc;
    }, []);
}

export default groupProductByBrand;
