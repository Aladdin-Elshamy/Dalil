// import React, { createContext, useContext, useState, useEffect } from 'react';

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error('useCart must be used within CartProvider');
//   return ctx;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     const savedCart = localStorage.getItem('cart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // Save to localStorage whenever cart changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
//     setCart((prev) => {
//       const existing = prev.find((i) => i.id === item.id);
//       if (existing) {
//         return prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
//         );
//       }
//       return [...prev, { ...item, quantity }];
//     });
//   };

//   const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));
  
//   const updateQuantity = (id: string, quantity: number) =>
//     setCart((prev) =>
//       prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
//     );
    
//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem('cart');
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// تعريف واجهة المنتج
export interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  discount: number;
  priceAfterDiscount: number;
  stock: number;
  images: {
    secure_url: string;
    public_id: string;
  }[];
  customid: string;
  avgRate: number;
  rateNum: number;
}

// تعريف عنصر في السلة
export interface CartItem {
  _id: string; // معرف العنصر في السلة
  product: Product;
  quantity: number;
}

// نوع السياق
interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// هوك مخصص للوصول للسياق
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// مزود السياق
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const res = await axios.get<{ msg: string; product: Product }>(
        `https://dalail-project-daoud.vercel.app/api/v1/product/get/${productId}`
      );

      const existingItem = cart.find((item) => item.product._id === productId);

      if (existingItem) {
        // تحديث الكمية إذا المنتج موجود
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        // إضافة منتج جديد للسلة
        const newItem: CartItem = {
          _id: new Date().toISOString(), // ID مؤقت
          product: res.data.product,
          quantity,
        };
        setCart((prevCart) => [...prevCart, newItem]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // تحميل السلة من localStorage عند أول تحميل (اختياري)
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // حفظ السلة في localStorage عند أي تغيير
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

