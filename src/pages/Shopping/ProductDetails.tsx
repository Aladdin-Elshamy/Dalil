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
    if (isProductFavourite(product._id)) {
      await removeProductFromFavourites(product._id);
    } else {
      await addProductToFavourites(product._id);
    }
  };

  if (loading) return <p className="text-center mt-5">جاري تحميل تفاصيل المنتج...</p>;
  if (!product) return <p className="text-center mt-5">لم يتم العثور على المنتج.</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src={product.images?.[0]?.secure_url || '/placeholder-image.jpg'}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxHeight: '450px', objectFit: 'cover' }}
            />
            {product.images && product.images.length > 1 && (
              <div className="mt-3">
                <div className="row">
                  {product.images.slice(1, 4).map((image, index) => (
                    <div key={index} className="col-4">
                      <img
                        src={image.secure_url}
                        alt={`${product.title} ${index + 2}`}
                        className="img-fluid rounded"
                        style={{ height: '100px', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <h2>{product.title}</h2>
            {product.description && <p className="text-muted">{product.description}</p>}

            {product.avgRate > 0 && (
              <div className="mb-2">
                <span className="text-warning">
                  {'★'.repeat(Math.floor(product.avgRate))}
                  {'☆'.repeat(5 - Math.floor(product.avgRate))}
                </span>
                <span className="ms-2 text-muted">({product.rateNum} تقييم)</span>
              </div>
            )}

            <div className="price-section mb-3">
              {product.discount && product.discount > 0 ? (
                <>
                  <h4 className="text-muted text-decoration-line-through">
                    {product.price} ج.م
                  </h4>
                  <h3 className="text-success fw-bold">
                    {product.priceAfterDiscount} ج.م
                    <span className="badge bg-danger ms-2">خصم {product.discount}%</span>
                  </h3>
                </>
              ) : (
                <h3 className="fw-bold">{product.price} ج.م</h3>
              )}
            </div>

            <div className="mb-3">
              <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                {product.stock > 0 ? `متوفر (${product.stock} قطعة)` : 'غير متوفر'}
              </span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <label className="me-2">الكمية:</label>
              <input
                type="number"
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-control"
                style={{ width: '80px' }}
                disabled={product.stock === 0}
              />
            </div>

            <button
              className="btn btn-success me-2"
              onClick={() => addToCart(product._id, quantity)}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'غير متوفر' : 'أضف إلى السلة'}
            </button>

            <button
              className={`btn btn-outline-${isProductFavourite(product._id) ? 'secondary' : 'danger'}`}
              onClick={handleFavouriteToggle}
            >
              {isProductFavourite(product._id) ? '❤️ تمت الإضافة' : '🤍 أضف للمفضلة'}
            </button>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <h4>معلومات المنتج</h4>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>كود المنتج:</strong> {product.customid}</p>
                    <p><strong>الفئة:</strong> {product.categoryId}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>تاريخ الإضافة:</strong> {new Date(product.createdAt).toLocaleDateString('ar-EG')}</p>
                    <p><strong>آخر تحديث:</strong> {new Date(product.updatedAt).toLocaleDateString('ar-EG')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
