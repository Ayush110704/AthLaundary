import React , {useState,useEffect} from 'react'
import {CreditCard,ChevronDown,ChevronUp,Smartphone,Wallet} from 'lucide-react'
import {motion,AnimatePresence} from 'framer-motion'
import {getCheckoutData,saveCheckoutData,} from "../utils/checkoutStorage";

const Payment = ({ checkoutData, setCheckoutData }) => {

     const [selectedMethod, setSelectedMethod] = useState("");
     const [openSection, setOpenSection] = useState("");
     const [paymentData, setPaymentData] = useState({
  method: "",
  cardNumber: "",
  cardHolder: "",
  expiry: "",
  cvv: "",
  upiId: "",
});

  const toggleSection = (section) => {
  if (openSection === section) {
    setOpenSection("");
  } else {
    setOpenSection(section);
    setSelectedMethod(section);

    setPaymentData((prev) => ({
      ...prev,
      method: section,
    }));
  }
};



const handleChange = (e) => {
  const { name, value } = e.target;

  setPaymentData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

useEffect(() => {
  setCheckoutData((prev) => {
    const update = { ...prev, payment: paymentData };
    saveCheckoutData(update);
    return update;
  }
  );
}, [paymentData, setCheckoutData]);

  return (
    <>
     <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Payment Method
          </h2>

          {/* CARD */}
        <div className="border rounded-xl overflow-hidden mb-4">

  <div
    className={`flex items-center justify-between p-4 cursor-pointer transition ${
      selectedMethod === "card"
        ? "bg-blue-50 border-blue-700"
        : "hover:bg-gray-50"
    }`}
    onClick={() => toggleSection("card")}
  >
    <div className="flex items-center gap-3">
      <input
        type="radio"
        checked={selectedMethod === "card"}
        readOnly
        className="accent-blue-700"
      />

      <CreditCard className="text-blue-700" />

      <span className="font-semibold">
        Credit / Debit Card
      </span>
    </div>

    
      
    
  </div>

 

</div>

          {/* UPI */}
         <div className="border rounded-xl overflow-hidden mb-4">
  <button
    onClick={() => toggleSection("upi")}
    className={`w-full flex items-center justify-between p-4 transition
      ${
        selectedMethod === "upi"
          ? "bg-blue-50 border-blue-700"
          : "hover:bg-gray-50"
      }`}
  >
    <div className="flex items-center gap-3">
      <input
        type="radio"
        checked={selectedMethod === "upi"}
        readOnly
        className="accent-blue-700"
      />

      <Smartphone className="text-blue-700" />

      <span className="font-semibold">
        UPI Payment
      </span>
    </div>

</button>
 

  
</div>

          {/* COD */}
          <div
onClick={() => {
  setSelectedMethod("cod");
  setOpenSection("");

  setPaymentData((prev) => ({
    ...prev,
    method: "cod",
  }));
}}
  className={`border rounded-xl p-4 cursor-pointer transition
    ${
      selectedMethod === "cod"
        ? "bg-blue-50 border-blue-700"
        : "hover:bg-gray-50"
    }`}
>
  <div className="flex items-center gap-3">
    <input
      type="radio"
      checked={selectedMethod === "cod"}
      readOnly
      className="accent-blue-700"
    />

    <Wallet className="text-blue-700" />

    <div>
      <h3 className="font-semibold">
        Cash on Delivery
      </h3>

      <p className="text-sm text-gray-500">
        Pay after delivery.
      </p>
    </div>
  </div>
</div>
        </motion.div>
    </>
  )
}

export default Payment
