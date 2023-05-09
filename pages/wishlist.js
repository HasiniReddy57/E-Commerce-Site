import useCookies from "react-cookie/cjs/useCookies";
import jwt from "jsonwebtoken";
import WishListCard from "@/components/WishListCard";
import { useEffect, useState, useRef } from "react";
import SigninPrompt from "@/components/SigninPrompt";
import NavBar from "@/components/navbar";
import dynamic from "next/dynamic";

function wishlist() {
  const [reload, setReload] = useState(false);
  const [wishlist, setwishlist] = useState([]);

  const userdata = useRef([]);
  const [cookie, setCookie, deleteCookie] = useCookies(["user"]);

  const user_decoded = jwt.decode(cookie.user);

  const [user, setUser] = useState(user_decoded);

  useEffect(() => {
    async function fetchdata() {
      userdata.current = await fetch(
        `http://localhost:3000/api/getUser?email=${user.email}`
      ).then((res) => res.json());

      setwishlist(userdata.current.wishlist);
    }
    if (user) {
      fetchdata();
    }
    fetchdata();
  }, [reload]);

  return (
    <>
      <NavBar reload={reload} />
      {user != null ? (
        <div className={`bg-light text-dark d-flex`}>
          <div className="d-flex flex-wrap gap-3 p-5 m-3 flex-fill">
            {wishlist.length == 0 ? (
              <div className="text-success d-flex flex-column align-items-center flex-fill">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"></img>
                <h3> Your wishlist is empty</h3>
              </div>
            ) : (
              wishlist.map((product) => (
                <WishListCard
                  key={product.id}
                  props={product}
                  user={userdata.current}
                  setReload={setReload}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <SigninPrompt />
      )}
    </>
  );
}
export default dynamic(() => Promise.resolve(wishlist), { ssr: false });
