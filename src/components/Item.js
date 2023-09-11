import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Item = ({ items }) => {
  const pathname = usePathname();

  return (
    <div className="item_parent pt-0">
      <div className="items">
        <div style={{ gap: "49px" }} className="grid-container ">
          {items?.map((item, index) => (
            <Link
              href={`/product/${item._id}`}
              key={index}
              style={{ cursor: "pointer", textDecoration: "none" }}
              className="item"
            >
              <img className="img-fluid" src={item?.images?.length && item?.images[0]} alt="" />
              <div style={{ padding: "21px 18px" }}>
                <p className={`${pathname === "/" && "text-center"} name`}>
                  {item?.title}
                </p>
                {pathname !== "/" && (
                  <>
                    <p className="price">
                      US$ {item?.price}/ <span>piece</span>
                    </p>

                    <p className="amount">{item.price} Pieces (MOQ)</p>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Item;
