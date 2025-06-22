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
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

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

interface FavouritesContextType {
  favouriteProducts: Product[];
  favouriteLocations: Location[];
  loading: boolean;
  fetchFavourites: () => void;
  addProductToFavourites: (productId: string) => Promise<boolean>;
  removeProductFromFavourites: (productId: string) => Promise<boolean>;
  addLocationToFavourites: (locationId: string) => Promise<boolean>;
  removeLocationFromFavourites: (locationId: string) => Promise<boolean>;
  isProductFavourite: (productId: string) => boolean;
  isLocationFavourite: (locationId: string) => boolean;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favouriteProducts, setFavouriteProducts] = useState<Product[]>([]);
  const [favouriteLocations, setFavouriteLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const token = "dalail__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzJlYzYxZDM1MTgwMDMzYzU5Y2VmMiIsImVtYWlsIjoiZGFvdWRtYWhtb3VkMzMxQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsInBob25lTnVtYmVyIjoiMDEwOTI3ODM3NzMiLCJhZGRyZXNzIjoiZGFtbmhvdXIiLCJpYXQiOjE3NDA4Mjg5NDZ9.H9NYcvad9wWyJsykbNxjgL4ShUb_5U71yjhe9mfdn78";

  const fetchFavourites = async () => {
    setLoading(true);
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
    } catch (error: any) {
      console.error('Error fetching favourites:', error);
      if (error.response?.status === 404) {
        setFavouriteProducts([]);
        setFavouriteLocations([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const addProductToFavourites = async (productId: string): Promise<boolean> => {
    try {
      await axios.post(
        `https://dalail-project-daoud.vercel.app/api/v1/wishList/add-product/${productId}`,
        {},
        {
          headers: { token, 'Content-Type': 'application/json' },
        }
      );
      await fetchFavourites();
      return true;
    } catch (error) {
      console.error('Error adding product to favourites:', error);
      return false;
    }
  };

  const removeProductFromFavourites = async (productId: string): Promise<boolean> => {
    try {
      await axios.delete(
        `https://dalail-project-daoud.vercel.app/api/v1/wishList/remove-product/${productId}`,
        {
          headers: { token, 'Content-Type': 'application/json' },
        }
      );
      setFavouriteProducts(prev => prev.filter(p => p._id !== productId));
      return true;
    } catch (error) {
      console.error('Error removing product from favourites:', error);
      return false;
    }
  };

  const addLocationToFavourites = async (locationId: string): Promise<boolean> => {
    try {
      await axios.post(
        `https://dalail-project-daoud.vercel.app/api/v1/wishList/add-location/${locationId}`,
        {},
        {
          headers: { token, 'Content-Type': 'application/json' },
        }
      );
      await fetchFavourites();
      return true;
    } catch (error) {
      console.error('Error adding location to favourites:', error);
      return false;
    }
  };

  const removeLocationFromFavourites = async (locationId: string): Promise<boolean> => {
    try {
      await axios.delete(
        `https://dalail-project-daoud.vercel.app/api/v1/wishList/remove-location/${locationId}`,
        {
          headers: { token, 'Content-Type': 'application/json' },
        }
      );
      setFavouriteLocations(prev => prev.filter(l => l._id !== locationId));
      return true;
    } catch (error) {
      console.error('Error removing location from favourites:', error);
      return false;
    }
  };

  const isProductFavourite = (productId: string): boolean =>
    favouriteProducts.some(product => product._id === productId);

  const isLocationFavourite = (locationId: string): boolean =>
    favouriteLocations.some(location => location._id === locationId);

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <FavouritesContext.Provider
      value={{
        favouriteProducts,
        favouriteLocations,
        loading,
        fetchFavourites,
        addProductToFavourites,
        removeProductFromFavourites,
        addLocationToFavourites,
        removeLocationFromFavourites,
        isProductFavourite,
        isLocationFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

