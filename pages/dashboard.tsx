import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { ProductType } from "../types/main";


const Dashboard: React.FC = () => {
  const [data, setData] = useState<ProductType>();
  const router = useRouter();

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/products");
    if (res) {
      setData(res.data);
    }
  };

  useEffect(() => {
    let token = sessionStorage.getItem("LOGIN_JWT_TOKEN");
    if (token) {
      token = JSON.parse(token);
    } else {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Main Page Redirect</h1>
      <div>
        {data ? data.map((product: { id: React.Key | null | undefined; product_name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
          // eslint-disable-next-line @next/next/link-passhref
          <div key={product.id}>
          <Link href={`/product/${product.id}`}>
            {product.product_name}
          </Link>
          </div>
        )): ""}
      </div>

      <div className="py-72">
          <Link href="/user">
             Go to User List
          </Link>
      </div>
    </div>
  );
};

export default Dashboard;
