export const productData = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    return [];
  }

  const products = await response.json();
  return products;
};
