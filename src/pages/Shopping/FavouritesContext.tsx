import React, { createContext, useContext, useState } from "react";

export interface FavouriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface FavouritesContextType {
  favourites: FavouriteItem[];
  toggleFavourite: (item: FavouriteItem) => void;
  isFavourite: (id: number) => boolean;
  clearFavourites: () => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined
);

export const useFavourites = () => {
  const ctx = useContext(FavouritesContext);
  if (!ctx)
    throw new Error("useFavourites must be used within FavouritesProvider");
  return ctx;
};

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

  const toggleFavourite = (item: FavouriteItem) => {
    console.log("Toggling favourite:", item);
    setFavourites((prev) =>
      prev.some((f) => f.id === item.id)
        ? prev.filter((f) => f.id !== item.id)
        : [...prev, item]
    );
  };

  const isFavourite = (id: number) => favourites.some((f) => f.id === id);

  const clearFavourites = () => setFavourites([]);

  return (
    <FavouritesContext.Provider
      value={{ favourites, toggleFavourite, isFavourite, clearFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
