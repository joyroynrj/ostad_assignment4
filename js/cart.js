export const cartItems = [];

export const addToCart = (product, quantity) => {
  const existingItem = cartItems.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ product, quantity });
  }
};

export const increaseQuantity = (productId) => {
  const cartItem = cartItems.find((item) => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  }
};

export const decreaseQuantity = (productId) => {
  const cartItem = cartItems.find((item) => item.product.id === productId);
  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      removeItem(productId);
    }
  }
};

export const removeItem = (productId) => {
  const itemIndex = cartItems.findIndex(
    (item) => item.product.id === productId
  );
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
  }
};

export const calculateTotal = () => {
  let total = 0;
  cartItems.forEach((item) => {
    const itemPrice = item.product.price;
    total += itemPrice * item.quantity;
  });
  return total;
};