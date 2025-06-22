// import React, { createContext, useContext, useState } from "react";

// export interface FavouriteItem {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
// }

// interface FavouritesContextType {
//   favourites: FavouriteItem[];
//   toggleFavourite: (item: FavouriteItem) => void;
//   isFavourite: (id: number) => boolean;
//   clearFavourites: () => void;
// }

// const FavouritesContext = createContext<FavouritesContextType | undefined>(
//   undefined
// );

// export const useFavourites = () => {
//   const ctx = useContext(FavouritesContext);
//   if (!ctx)
//     throw new Error("useFavourites must be used within FavouritesProvider");
//   return ctx;
// };

// export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

//   const toggleFavourite = (item: FavouriteItem) => {
//     console.log("Toggling favourite:", item);
//     setFavourites((prev) =>
//       prev.some((f) => f.id === item.id)
//         ? prev.filter((f) => f.id !== item.id)
//         : [...prev, item]
//     );
//   };

//   const isFavourite = (id: number) => favourites.some((f) => f.id === id);

//   const clearFavourites = () => setFavourites([]);

//   return (
//     <FavouritesContext.Provider
//       value={{ favourites, toggleFavourite, isFavourite, clearFavourites }}
//     >
//       {children}
//     </FavouritesContext.Provider>
//   );
// };
// src/pages/User/FavouritesContext.tsx
// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import axios from 'axios';

// export interface Product {
//   _id: string;
//   title: string;
//   slug: string;
//   price: number;
//   discount: number;
//   priceAfterDiscount: number;
//   stock: number;
//   images: {
//     secure_url: string;
//     public_id: string;
//   }[];
//   customid: string;
//   avgRate: number;
//   rateNum: number;
// }

// export interface Location {
//   _id: string;
//   title: string;
//   slug: string;
//   description: string;
//   images: {
//     secure_url: string;
//     public_id: string;
//   }[];
//   customId: string;
//   locationLink: string;
//   timeWorked: string;
//   avgRate: number;
//   rateNum: number;
// }

// export interface WishlistItem {
//   productId?: Product;
//   locationId?: Location;
//   _id: string;
// }

// interface WishlistResponse {
//   message: string;
//   wishlist: {
//     _id: string;
//     userId: string;
//     products: WishlistItem[];
//     locations: WishlistItem[];
//     createdAt: string;
//     updatedAt: string;
//   };
// }

// interface FavouritesContextType {
//   favouriteProducts: Product[];
//   favouriteLocations: Location[];
//   loading: boolean;
//   fetchFavourites: () => void;
//   addProductToFavourites: (productId: string) => Promise<boolean>;
//   removeProductFromFavourites: (productId: string) => Promise<boolean>;
//   addLocationToFavourites: (locationId: string) => Promise<boolean>;
//   removeLocationFromFavourites: (locationId: string) => Promise<boolean>;
//   isProductFavourite: (productId: string) => boolean;
//   isLocationFavourite: (locationId: string) => boolean;
// }

// const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

// export const useFavourites = (): FavouritesContextType => {
//   const context = useContext(FavouritesContext);
//   if (!context) {
//     throw new Error('useFavourites must be used within a FavouritesProvider');
//   }
//   return context;
// };

// export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [favouriteProducts, setFavouriteProducts] = useState<Product[]>([]);
//   const [favouriteLocations, setFavouriteLocations] = useState<Location[]>([]);
//   const [loading, setLoading] = useState(false);

//   const token = "dalail__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzJlYzYxZDM1MTgwMDMzYzU5Y2VmMiIsImVtYWlsIjoiZGFvdWRtYWhtb3VkMzMxQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsInBob25lTnVtYmVyIjoiMDEwOTI3ODM3NzMiLCJhZGRyZXNzIjoiZGFtbmhvdXIiLCJpYXQiOjE3NDA4Mjg5NDZ9.H9NYcvad9wWyJsykbNxjgL4ShUb_5U71yjhe9mfdn78";

//   const fetchFavourites = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get<WishlistResponse>(
//         'https://dalail-project-daoud.vercel.app/api/v1/wishList/my-wishlist',
//         {
//           headers: {
//             token: token,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       const products = response.data.wishlist.products
//         .map(item => item.productId)
//         .filter(Boolean) as Product[];
//       const locations = response.data.wishlist.locations
//         .map(item => item.locationId)
//         .filter(Boolean) as Location[];

//       setFavouriteProducts(products);
//       setFavouriteLocations(locations);
//     } catch (error: any) {
//       console.error('Error fetching favourites:', error);
//       if (error.response?.status === 404) {
//         setFavouriteProducts([]);
//         setFavouriteLocations([]);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addProductToFavourites = async (productId: string): Promise<boolean> => {
//     try {
//       await axios.post(
//         `https://dalail-project-daoud.vercel.app/api/v1/wishList/add-product/${productId}`,
//         {},
//         {
//           headers: { token, 'Content-Type': 'application/json' },
//         }
//       );
//       await fetchFavourites();
//       return true;
//     } catch (error) {
//       console.error('Error adding product to favourites:', error);
//       return false;
//     }
//   };

//   const removeProductFromFavourites = async (productId: string): Promise<boolean> => {
//     try {
//       await axios.delete(
//         `https://dalail-project-daoud.vercel.app/api/v1/wishList/remove-product/${productId}`,
//         {
//           headers: { token, 'Content-Type': 'application/json' },
//         }
//       );
//       setFavouriteProducts(prev => prev.filter(p => p._id !== productId));
//       return true;
//     } catch (error) {
//       console.error('Error removing product from favourites:', error);
//       return false;
//     }
//   };

//   const addLocationToFavourites = async (locationId: string): Promise<boolean> => {
//     try {
//       await axios.post(
//         `https://dalail-project-daoud.vercel.app/api/v1/wishList/add-location/${locationId}`,
//         {},
//         {
//           headers: { token, 'Content-Type': 'application/json' },
//         }
//       );
//       await fetchFavourites();
//       return true;
//     } catch (error) {
//       console.error('Error adding location to favourites:', error);
//       return false;
//     }
//   };

//   const removeLocationFromFavourites = async (locationId: string): Promise<boolean> => {
//     try {
//       await axios.delete(
//         `https://dalail-project-daoud.vercel.app/api/v1/wishList/remove-location/${locationId}`,
//         {
//           headers: { token, 'Content-Type': 'application/json' },
//         }
//       );
//       setFavouriteLocations(prev => prev.filter(l => l._id !== locationId));
//       return true;
//     } catch (error) {
//       console.error('Error removing location from favourites:', error);
//       return false;
//     }
//   };

//   const isProductFavourite = (productId: string): boolean =>
//     favouriteProducts.some(product => product._id === productId);

//   const isLocationFavourite = (locationId: string): boolean =>
//     favouriteLocations.some(location => location._id === locationId);

//   useEffect(() => {
//     fetchFavourites();
//   }, []);

//   return (
//     <FavouritesContext.Provider
//       value={{
//         favouriteProducts,
//         favouriteLocations,
//         loading,
//         fetchFavourites,
//         addProductToFavourites,
//         removeProductFromFavourites,
//         addLocationToFavourites,
//         removeLocationFromFavourites,
//         isProductFavourite,
//         isLocationFavourite,
//       }}
//     >
//       {children}
//     </FavouritesContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from 'axios';

// Legacy interface for backward compatibility
export interface FavouriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

// New interfaces for API integration
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

export interface Location {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: {
    secure_url: string;
    public_id: string;
  }[];
  customId: string;
  locationLink: string;
  timeWorked: string;
  avgRate: number;
  rateNum: number;
}

export interface WishlistItem {
  productId?: Product;
  locationId?: Location;
  _id: string;
}

interface WishlistResponse {
  message: string;
  wishlist: {
    _id: string;
    userId: string;
    products: WishlistItem[];
    locations: WishlistItem[];
    createdAt: string;
    updatedAt: string;
  };
}

// Enhanced context interface combining old and new functionality
interface FavouritesContextType {
  // Legacy properties for backward compatibility
  favourites: FavouriteItem[];
  toggleFavourite: (item: FavouriteItem) => void;
  isFavourite: (id: number) => boolean;
  clearFavourites: () => void;
  
  // New API-integrated properties
  favouriteProducts: Product[];
  favouriteLocations: Location[];
  loading: boolean;
  error: string | null;
  fetchFavourites: () => Promise<void>;
  addProductToFavourites: (productId: string) => Promise<boolean>;
  removeProductFromFavourites: (productId: string) => Promise<boolean>;
  addLocationToFavourites: (locationId: string) => Promise<boolean>;
  removeLocationFromFavourites: (locationId: string) => Promise<boolean>;
  isProductFavourite: (productId: string) => boolean;
  isLocationFavourite: (locationId: string) => boolean;
  
  // Enhanced methods
  refreshFavourites: () => Promise<void>;
  getFavouriteCount: () => number;
  clearAllFavourites: () => Promise<void>;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within FavouritesProvider");
  }
  return context;
};

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Legacy state for backward compatibility
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);
  
  // New API-integrated state
  const [favouriteProducts, setFavouriteProducts] = useState<Product[]>([]);
  const [favouriteLocations, setFavouriteLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const token = "dalail__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzJlYzYxZDM1MTgwMDMzYzU5Y2VmMiIsImVtYWlsIjoiZGFvdWRtYWhtb3VkMzMxQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsInBob25lTnVtYmVyIjoiMDEwOTI3ODM3NzMiLCJhZGRyZXNzIjoiZGFtbmhvdXIiLCJpYXQiOjE3NDA4Mjg5NDZ9.H9NYcvad9wWyJsykbNxjgL4ShUb_5U71yjhe9mfdn78";

  // Legacy methods for backward compatibility
  const toggleFavourite = (item: FavouriteItem) => {
    console.log("Toggling favourite:", item);
    setFavourites((prev) =>
      prev.some((f) => f.id === item.id)
        ? prev.filter((f) => f.id !== item.id)
        : [...prev, item]
    );
  };

  const isFavourite = (id: number): boolean => {
    return favourites.some((f) => f.id === id);
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  // New API methods
  const fetchFavourites = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<WishlistResponse>(
        'https://dalail-project-daoud.vercel.app/api/v1/wishList/my-wishlist',
        {
          headers: {
            token: token,
            'Content-Type': 'application/json',
          },
        }
      );

      const products = response.data.wishlist.products
        .map(item => item.productId)
        .filter(Boolean) as Product[];
      const locations = response.data.wishlist.locations
        .map(item => item.locationId)
        .filter(Boolean) as Location[];

      setFavouriteProducts(products);
      setFavouriteLocations(locations);

      console.log('Favourites fetched successfully:', { products: products.length, locations: locations.length });
    } catch (error: any) {
      console.error('Error fetching favourites:', error);
      const errorMessage = error.response?.data?.message || 'حدث خطأ في تحميل المفضلة';
      setError(errorMessage);
      
      if (error.response?.status === 404) {
        // No wishlist found, initialize empty arrays
        setFavouriteProducts([]);
        setFavouriteLocations([]);
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const addProductToFavourites = async (productId: string): Promise<boolean> => {
    setError(null);
    try {
      const response = await axios.post(
        `https://dalail-project-daoud.vercel.app/api/v1/wishList/add-product/${productId}`,
        {},
        {
          headers: { 
            token, 
            'Content-Type': 'application/json' 
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        await fetchFavourites(); // Refresh the list
        console.log(`Product ${productId} added to favourites successfully`);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Error adding product to favourites:', error);
      const errorMessage = error.response?.data?.message || 'حدث خطأ في إضافة المنتج للمفضلة';
      setError(errorMessage);
      return false;
    }
  };

  const removeProductFromFavourites = async (productId: string): Promise<boolean> => {
    setError(null);
    try {
      const response = await axios.delete(
        `https://dalail-project-daoud.vercel.app/api/v1/wishList/remove-product/${productId}`,
        {
          headers: { 
            token, 
            'Content-Type': 'application/json' 
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        // Update local state immediately for better UX
        setFavouriteProducts(prev => prev.filter(p => p._id !== productId));
        console.log(`Product ${productId} removed from favourites successfully`);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Error removing product from favourites:', error);
      const errorMessage = error.response?.data?.message || 'حدث خطأ في حذف المنتج من المفضلة';
      setError(errorMessage);
      return false;
    }
  };

  const addLocationToFavourites = async (locationId: string): Promise<boolean> => {
    setError(null);
    try {
      const response = await axios.post(
        `https://dalail-project-daoud.vercel.app/api/v1/wishList/add-location/${locationId}`,
        {},
        {
          headers: { 
            token, 
            'Content-Type': 'application/json' 
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        await fetchFavourites(); // Refresh the list
        console.log(`Location ${locationId} added to favourites successfully`);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Error adding location to favourites:', error);
      const errorMessage = error.response?.data?.message || 'حدث خطأ في إضافة الموقع للمفضلة';
      setError(errorMessage);
      return false;
    }
  };

  const removeLocationFromFavourites = async (locationId: string): Promise<boolean> => {
    setError(null);
    try {
      const response = await axios.delete(
        `https://dalail-project-daoud.vercel.app/api/v1/wishList/remove-location/${locationId}`,
        {
          headers: { 
            token, 
            'Content-Type': 'application/json' 
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        // Update local state immediately for better UX
        setFavouriteLocations(prev => prev.filter(l => l._id !== locationId));
        console.log(`Location ${locationId} removed from favourites successfully`);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Error removing location from favourites:', error);
      const errorMessage = error.response?.data?.message || 'حدث خطأ في حذف الموقع من المفضلة';
      setError(errorMessage);
      return false;
    }
  };

  const isProductFavourite = (productId: string): boolean => {
    return favouriteProducts.some(product => product._id === productId);
  };

  const isLocationFavourite = (locationId: string): boolean => {
    return favouriteLocations.some(location => location._id === locationId);
  };

  // Enhanced methods
  const refreshFavourites = async (): Promise<void> => {
    await fetchFavourites();
  };

  const getFavouriteCount = (): number => {
    return favouriteProducts.length + favouriteLocations.length + favourites.length;
  };

  const clearAllFavourites = async (): Promise<void> => {
    setError(null);
    try {
      // Clear legacy favourites
      clearFavourites();
      
      // Clear API favourites
      const productPromises = favouriteProducts.map(product => 
        removeProductFromFavourites(product._id)
      );
      const locationPromises = favouriteLocations.map(location => 
        removeLocationFromFavourites(location._id)
      );

      await Promise.all([...productPromises, ...locationPromises]);
      
      // Clear local state
      setFavouriteProducts([]);
      setFavouriteLocations([]);
      
      console.log('All favourites cleared successfully');
    } catch (error: any) {
      console.error('Error clearing all favourites:', error);
      setError('حدث خطأ في مسح جميع المفضلة');
    }
  };

  // Initialize favourites on mount
  useEffect(() => {
    fetchFavourites();
  }, []);

  // Error auto-clear
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // Clear error after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  const contextValue: FavouritesContextType = {
    // Legacy properties
    favourites,
    toggleFavourite,
    isFavourite,
    clearFavourites,
    
    // New API properties
    favouriteProducts,
    favouriteLocations,
    loading,
    error,
    fetchFavourites,
    addProductToFavourites,
    removeProductFromFavourites,
    addLocationToFavourites,
    removeLocationFromFavourites,
    isProductFavourite,
    isLocationFavourite,
    
    // Enhanced methods
    refreshFavourites,
    getFavouriteCount,
    clearAllFavourites,
  };

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
};