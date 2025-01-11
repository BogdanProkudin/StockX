import { useMediaQuery } from "@mui/material";
import Header from "../components/Header/Header";
import NavHeader from "../components/SecondHeader/NavHeader";
import styles from "./styles.module.scss";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import { useAppSelector } from "../redux/hook";

const ProductPageLayout = () => {
  const isLargeScreen = useMediaQuery("(min-width: 770px)");
  const { title } = useParams();
  const [product, setProduct] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isRedirectFromHome = useAppSelector(
    (state) => state.searchSlice.redirectFromMainPage,
  );
  useEffect(() => {
    const onProductClickFetch = async () => {
      try {
        window.scrollTo(0, 0);
        const cachedData = sessionStorage.getItem(window.location.pathname);

        if (cachedData) {
          const parsedCachedData = await JSON.parse(cachedData).data[0];
          setProduct(parsedCachedData);
          return;
        }
        setIsLoading(true);
        setError(null);

        const apiUrl = `http://localhost:3003/getProduct/${title}`;
        const { data } = await axios.get(apiUrl, {
          headers: { Authorization: import.meta.env.VITE_API_KEY },
        });
        if (data instanceof Object) {
          sessionStorage.clear();
          sessionStorage.setItem(
            window.location.pathname,
            JSON.stringify(data),
          );
          setProduct(data.data[0]);
          return;
        }
        const parsedData = JSON.parse(data).data[0];
        console.log(parsedData, "daga");

        if (parsedData.length === 0 || data.length === 0) {
          throw new Error("Product not found");
        }
        sessionStorage.clear();
        sessionStorage.setItem(window.location.pathname, data);
        setProduct(parsedData);
      } catch (err: any) {
        console.log("err", err);

        setError(err.message || "Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    };

    {
      isRedirectFromHome && onProductClickFetch();
    }
  }, [title, isRedirectFromHome]);
  useEffect(() => {
    const onReloadPageFetch = async () => {
      try {
        const cachedData = sessionStorage.getItem(window.location.pathname);

        if (cachedData) {
          const parsedCachedData = await JSON.parse(cachedData).data[0];
          setProduct(parsedCachedData);
          return;
        }
        setIsLoading(true);
        setError(null);

        const apiUrl = `http://localhost:3003/getProduct/${title}`;
        const { data } = await axios.get(apiUrl, {
          headers: { Authorization: import.meta.env.VITE_API_KEY },
        });
        if (data instanceof Object) {
          sessionStorage.clear();
          sessionStorage.setItem(
            window.location.pathname,
            JSON.stringify(data),
          );
          setProduct(data.data[0]);
          return;
        }
        const parsedData = JSON.parse(data).data[0];

        if (parsedData.length === 0 || data.length === 0) {
          throw new Error("Product not found");
        }
        sessionStorage.clear();
        sessionStorage.setItem(window.location.pathname, data);
        setProduct(parsedData);
      } catch (err: any) {
        console.log("err", err);

        setError(err.message || "Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    };

    {
      !isRedirectFromHome && onReloadPageFetch();
    }
  }, [title, isRedirectFromHome]);

  if (error) {
    console.log("error", error);

    return <NotFound error={error} />;
  }

  return (
    <div className={styles.headerBar}>
      {product && <Header />}
      {isLargeScreen && product && <NavHeader />}

      {isRedirectFromHome && (
        <div className={`productPage container`}>
          <Outlet context={{ product: product, isLoading: isLoading }} />
        </div>
      )}
      {!isRedirectFromHome && product && (
        <div className={`productPage container`}>
          <Outlet context={{ product: product, isLoading: isLoading }} />
        </div>
      )}
    </div>
  );
};

export default ProductPageLayout;
