
import axios from "axios";
import Link from "next/link";
import { useState, useEffect, Key, ReactChild, ReactFragment, ReactPortal } from "react";

const Product: React.FC = () => {
    
  const [data, setData] = useState<any>();
  const fetchProducts = async () => {
    const res = await axios.get(`http://localhost:5000/users`);
    console.log(res)
    if (res) {
      setData(res.data);
    }
  };

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
        {data ? data.map((user: { _id: any; first_name: any; last_name: any; username: any }) => (
          // eslint-disable-next-line @next/next/link-passhref
          <div key={user._id}>
          <Link href={`/user/${user._id}`}>
            {user.first_name}
          </Link>
          </div>
        )): ""}
      </div>
  );
};



export default Product;


