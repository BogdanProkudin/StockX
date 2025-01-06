import { useMediaQuery } from "@mui/material";
import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";
import styles from "./styles.module.scss";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "../pages/NotFound";

const ProductPageLayout = () => {
  const isLargeScreen = useMediaQuery("(min-width: 770px)");
  const { title } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const apiUrl = `https://api.sneakersapi.dev/api/v2/products?search=${title}`;
        const { data } = await axios.get(apiUrl, {
          headers: { Authorization: import.meta.env.VITE_API_KEY },
        });

        if (data.data.length === 0) {
          throw new Error("Product not found");
        }

        setProduct(data.data[0]);
      } catch (err: any) {
        setError(err.message || "Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [title]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div className={styles.headerBar}>
      <Header />
      {isLargeScreen && <NavHeader />}
      {product && (
        <div className={`productPage container`}>
          <Outlet context={product} />
        </div>
      )}
    </div>
  );
};

export default ProductPageLayout;
