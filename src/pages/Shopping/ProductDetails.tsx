import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useCart } from './CartContext';
import { useFavourites } from './FavouritesContext';

interface Product {
  _id: string;
  title: string;
  slug: string;
  userId: string;
  categoryId: string;
  images: Array<{ secure_url: string; public_id: string }>;
  customid: string;
  price: number;
  discount: number;
  priceAfterDiscount: number;
  stock: number;
  avgRate: number;
  rateNum: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  description?: string;
}

interface ApiResponse {
  msg: string;
  product: Product;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const { addToCart } = useCart();
  const {
    addProductToFavourites,
    removeProductFromFavourites,
    isProductFavourite,
  } = useFavourites();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          `https://dalail-project-daoud.vercel.app/api/v1/product/get/${id}`
        );
        if (res.data && res.data.product) {
          setProduct(res.data.product);
        } else {
          console.warn('⚠️ Unexpected response format:', res.data);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleFavouriteToggle = async () => {
    if (!product) return;
    try {
      if (isProductFavourite(product._id)) {
        await removeProductFromFavourites(product._id);
      } else {
        await addProductToFavourites(product._id);
      }
    } catch (error) {
      console.error('خطأ في تعديل المفضلة:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product._id, quantity);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('خطأ في إضافة المنتج للسلة:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">جاري تحميل تفاصيل المنتج...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-6xl text-gray-300 mb-4">🔍</div>
            <p className="text-xl text-gray-600">لم يتم العثور على المنتج.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Toast Notification */}
      <div
        className={`fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50 ${
          showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        ✅ تم إضافة المنتج إلى السلة بنجاح!
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Product Images Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative">
                <img
                  src={product.images?.[selectedImageIndex]?.secure_url || '/placeholder-image.jpg'}
                  alt={product.title}
                  className="w-full h-96 object-contain bg-gray-50 rounded-xl"
                />
                {product.discount > 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      خصم {product.discount}%
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-blue-500 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.secure_url}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-contain bg-gray-50"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              {/* Title and Rating */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.title}</h1>
                
                {product.avgRate > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(product.avgRate))}
                      {'☆'.repeat(5 - Math.floor(product.avgRate))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.rateNum} تقييم)
                    </span>
                  </div>
                )}

                {product.description && (
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                )}
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 p-4 rounded-xl">
                {product.discount && product.discount > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-green-600">
                        {product.priceAfterDiscount} ج.م
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {product.price} ج.م
                      </span>
                    </div>
                    <p className="text-sm text-green-600">
                      🎉 توفر {product.price - product.priceAfterDiscount} ج.م
                    </p>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-800">
                    {product.price} ج.م
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  product.stock > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${
                    product.stock > 0 ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  <span className="font-medium">
                    {product.stock > 0 ? `متوفر (${product.stock} قطعة)` : 'غير متوفر'}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-700">الكمية:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, Number(e.target.value))))}
                      className="w-16 px-3 py-2 text-center border-0 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-lg transition-all ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {product.stock === 0 ? 'غير متوفر' : '🛒 أضف إلى السلة'}
                </button>

                <button
                  onClick={handleFavouriteToggle}
                  className={`px-6 py-3 rounded-xl font-bold border-2 transition-all ${
                    isProductFavourite(product._id)
                      ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-600'
                  }`}
                >
                  {isProductFavourite(product._id) ? '❤️ محفوظ' : '🤍 أضف للمفضلة'}
                </button>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="border-t border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">معلومات المنتج</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">كود المنتج:</span>
                  <span className="font-bold text-gray-800">{product.customid}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">الفئة:</span>
                  <span className="font-bold text-gray-800">{product.categoryId}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">تاريخ الإضافة:</span>
                  <span className="font-bold text-gray-800">
                    {new Date(product.createdAt).toLocaleDateString('ar-EG')}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">آخر تحديث:</span>
                  <span className="font-bold text-gray-800">
                    {new Date(product.updatedAt).toLocaleDateString('ar-EG')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;