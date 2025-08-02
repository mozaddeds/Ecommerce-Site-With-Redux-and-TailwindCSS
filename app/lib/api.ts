export const productData = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    console.error("Failed to fetch products:", response.statusText);
    return [];
  }

  const products = await response.json();
  return products;
};
