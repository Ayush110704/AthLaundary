import React ,{useState,useEffect}from 'react';
import {motion} from 'framer-motion';
import {ShoppingBag } from 'lucide-react';
import {getCheckoutData,saveCheckoutData,} from "../utils/checkoutStorage";
import AddressForm from './AddressForm';

const CheckoutAddress = ({ checkoutData, setCheckoutData }) => {
const API_URL = import.meta.env.VITE_API_URL;


    const [selectedAddress, setSelectedAddress] = useState( checkoutData.address?._id || checkoutData.address?.id || '');
    const [openModal, setOpenModal] = useState(false);
    const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const loadAddresses = async () => {
      const user = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(localStorage.getItem('freshUser')) || {};
      const email = user.Email || user.email;
      if (!email) return;
      
      try {
        const res = await fetch(
  `${API_URL}/api/addresses?email=${encodeURIComponent(email)}`);
        const json = await res.json();
        if (json.success && json.data) {
          setAddresses(json.data);
          
          if (!selectedAddress && json.data.length > 0) {
            const defaultAddr = json.data.find(addr => addr.isDefault);
            const selectId = defaultAddr ? (defaultAddr._id || defaultAddr.id) : (json.data[0]._id || json.data[0].id);
            setSelectedAddress(selectId);
          }
        }
      } catch (err) {
        console.error('Failed to load addresses:', err);
      }
    };
    loadAddresses();
  }, []);

useEffect(() => {
  const selected = addresses.find(
    (address) => (address._id || address.id) === selectedAddress
  );

  if (!selected) return;

  const updateCheckoutData = {
    ...checkoutData,
    address: {
      ...selected,
      id: selected._id || selected.id,
      name: selected.fullName || selected.name,
      address: selected.addressLine1 || selected.address,
      type: selected.type || "Address"
    }
  };

  setCheckoutData(updateCheckoutData);
  saveCheckoutData(updateCheckoutData);
  console.log("Selected Address Saved:", updateCheckoutData);
}, [selectedAddress, addresses]);

const handleSaveAddress = async (newAddress) => {
  const user = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(localStorage.getItem('freshUser')) || {};
  const email = user.Email || user.email;
  if (!email) return;

  try {
    const res = await fetch(`${API_URL}/api/addresses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newAddress, email })
    });
    const json = await res.json();
    if (json.success && json.data) {
      setAddresses((prev) => [...prev, json.data]);
      setSelectedAddress(json.data._id || json.data.id);
      setOpenModal(false);
    }
  } catch (err) {
    console.error('Failed to save address:', err);
  }
};


  return (
    <>

  {/* Left Section */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="lg:col-span-2"
  >
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 md:p-8">
     
     <div className='w-full flex justify-between items-center'>
      <div>
       <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
        Select Address
      </h2>

      <p className="text-gray-500 mt-2 text-sm md:text-base">
        Tell us what needs clinical-grade care today.
      </p>
      </div>
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
      onClick={() => setOpenModal(true)}
    className=" rounded-2xl border-2 b py-2 px-2 font-semibold text-blue-700 transition-all duration-500 hover:bg-blue-800 hover:text-white"
  >
    +  New Address
  </motion.button>
  <AddressForm
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
  onSave={handleSaveAddress}
/>
  </div>
      {/* address div */}
    
<div className="mt-8 space-y-4">
  {addresses.map((item) => {
    const itemId = item._id || item.id;
    const isSelected = selectedAddress === itemId;
    return (
      <motion.div
        key={itemId}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setSelectedAddress(itemId)}
        className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300
        ${
          isSelected
            ? "border-blue-700 bg-blue-50 shadow-lg"
            : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            {/* Radio */}
            <div className="mt-1">
              <div
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all
                ${
                  isSelected
                    ? "border-blue-700"
                    : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-700"></div>
                )}
              </div>
            </div>

            {/* Address Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.type || "Address"}
                </h3>

                {(item.isDefault || item.default) && (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Default
                  </span>
                )}
              </div>

              <p className="mt-2 font-medium text-gray-800">
                {item.fullName || item.name}
              </p>

              <p className="text-sm text-gray-600">
                {item.phone}
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {item.addressLine1 || item.address}
                {item.watermark && `, ${item.watermark}`}
                {item.city && `, ${item.city}`}
                {item.state && `, ${item.state}`}
                {item.pincode && ` - ${item.pincode}`}
              </p>
            </div>
          </div>

          {/* Selected Badge */}
          {isSelected && (
            <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white">
              Selected
            </span>
          )}
        </div>
      </motion.div>
    );
  })}
  </div>

    </div>
  </motion.div>
  </>
  )
}

export default CheckoutAddress