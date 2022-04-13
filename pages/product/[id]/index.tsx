
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ProductType } from "../../../types/main";

const Product: React.FC = () => {
    
  const [data, setData] = useState<ProductType>();
  const router = useRouter();
  const { id } = router.query;
  const fetchProducts = async (id: string | string[] | undefined) => {
    const res = await axios.get(`http://localhost:5000/products/${id}`);
    console.log(res.data[0])
    if (res) {
      setData(res.data[0]);
    }
  };

  useEffect(() => {
    fetchProducts(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      This is product {id}
      <h1>{data?.product_name}</h1>
      <h1>{data?.quantity}</h1>
      <h1>{data?.status}</h1>
    </>
  );
};



export default Product;


