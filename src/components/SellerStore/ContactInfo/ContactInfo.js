import { AuthContext } from "@/components/context/AuthContext";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";
import React, { useContext } from "react";

const ContactInfo = () => {
  const { user } = useContext(AuthContext)
  const { data } = useGetStoreInfoBySellerIdQuery(user?._id)

  return (
    <div className="contact_info">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <label>Email Address</label>
            <input type="email" placeholder="Contact Seller for Details"
              disabled
              readOnly
              defaultValue={data?.data?.user?.email}
            />
          </div>
          <div className="col-12 col-md-6">
            <label>
              Telephone No <span>(Contact seller for details)</span> :{" "}
            </label>
            <input type="tel" placeholder="123456789 "
              disabled
              readOnly
              defaultValue={data?.data?.user?.phoneNumber}
            />
          </div>
          <div className="col-12 col-md-6">
            <label>Province</label>
            <input type="text" placeholder="Kronoberg "
              disabled
              readOnly
              defaultValue={data?.data?.company_address?.province}
            />
          </div>
          <div className="col-12 col-md-6">
            <label>City</label>
            <input type="text" placeholder="Stockholm "
              disabled
              readOnly
              defaultValue={data?.data?.company_address?.city}
            />
          </div>
          <div className="col-12 col-md-6">
            <label>Address</label>
            <input type="text" placeholder="Storgatan29 "
              disabled
              readOnly
              defaultValue={data?.data?.company_address?.address}
            />
          </div>
          <div className="col-12 col-md-6">
            <label>Postalcode</label>
            <input type="number" placeholder="36258 "
              disabled
              readOnly
              defaultValue={data?.data?.company_address?.postal_code}
            />
          </div>
        </div>
        <div className="social_media">
          <h5>Social Media</h5>
          <div className="d-flex justify-content-between">
            <p>
              Facebook :<span> Facebook.jajdjhgkdasl </span>
            </p>
            <p>
              Instagram :<span> instagram.hskdkjshkjdn</span>
            </p>
            <p>
              Twitter :<span> twitter.bajdbkjsd</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
