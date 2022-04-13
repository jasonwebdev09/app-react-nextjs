
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ProductType } from "../../../types/main";

const Product: React.FC = () => {
    
  const [data, setData] = useState<ProductType>();
  const router = useRouter();
  const { id } = router.query;
  const fetchProducts = async (id: string | string[] | undefined) => {
    const res = await axios.get(`http://localhost:5000/users/${id}`);
    console.log(res)
    if (res) {
      setData(res.data);
    }
  };

  useEffect(() => {
    fetchProducts(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      This is user {id}
      <h1>{data?.first_name}</h1>
      <h1>{data?.last_name}</h1>
      <h1>{data?.username}</h1>
    </>
  );
};



export default Product;


