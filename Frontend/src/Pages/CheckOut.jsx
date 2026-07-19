import { useState } from "react";
import { CheckCircle2, ArrowRight, MapPin, Clock, User, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import BookingApplyForm from '../Pages/BookingApplyForm';
import CheckoutAddress from '../components/CheckoutAddress';
import OrderSummary from '../components/OrderSummary';
import Schedule from '../components/Schedule';
import Payment from '../components/Payment';
import { getCheckoutData } from '../utils/checkoutStorage';
import validateStep from '../utils/validateStep';
import Swal from "sweetalert2";


const CheckOut = () => {

  const [currentStep, setCurrentStep] = useState(1);

  const [checkoutData, setCheckoutData] = useState(getCheckoutData());

  const steps = [
    { id: 1, title: "Form" },
    { id: 2, title: "Address" },
    { id: 3, title: "Schedule" },
    { id: 4, title: "Payment" },
  ];

  
  const handleNext = async () => {
  const result = validateStep(currentStep);

  if (!result.success) {
    await Swal.fire({
      icon: "warning",
      title: "Incomplete Details",
      text: result.message,
      confirmButtonColor: "#2563eb",
    });
    return;
  }

  // IF WE ARE AT STEP 4 (PAYMENT), TRIGGER RAZORPAY
  if (currentStep === 4) {
    if (checkoutData.payment.method === "cod") {
      // If COD, just save as usual
      saveOrderToDatabase(); 
    } else {
      // If Card/UPI, open Razorpay
      openRazorpay();
    }
  } else {
    // For steps 1-3, just move forward
    setCurrentStep((prev) => prev + 1);
  }
};

  return (
    <>
      <div className="w-full min-h-screen pt-18 flex justify-center mt-10">

        {/* main section */}
        <section className="w-full  ">
          <div className="max-w-6xl mx-auto p-6">

            {/* Steps div */}
            <div className="relative mb-10">
              {/* Background Line */}
              <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-700 rounded-full transition-all duration-500"
                  style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              <div className="relative flex justify-between">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold transition-all duration-300
                ${step.id < currentStep
                          ? "bg-blue-700 border-blue-700 text-white"
                          : step.id === currentStep
                            ? "bg-white border-blue-700 text-blue-700"
                            : "bg-white border-gray-300 text-gray-500"
                        }`}
                    >
                      {step.id < currentStep ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        step.id
                      )}
                    </div>

                    <p
                      className={`mt-2 text-xs md:text-sm font-medium ${step.id <= currentStep
                        ? "text-blue-700"
                        : "text-gray-500"
                        }`}
                    >
                      {step.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            {currentStep === 1 && (
              //           
              <BookingApplyForm 
               checkoutData={checkoutData}
  setCheckoutData={setCheckoutData}
  setCurrentStep={setCurrentStep}
              />
            )}

            {currentStep === 2 && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Section */}
                <CheckoutAddress
                  checkoutData={checkoutData}
                  setCheckoutData={setCheckoutData}
                />

                <OrderSummary
                  checkoutData={checkoutData}
                  Step={currentStep}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="max-w-7xl mx-auto  md:px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  w-full">

                  {/* Left */}
                  <Schedule checkoutData={checkoutData}
                    setCheckoutData={setCheckoutData} />

                  {/* Right */}
                  <OrderSummary checkoutData={checkoutData}
                    Step={currentStep} />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  {/* Left */}
                  <Payment
                   checkoutData={checkoutData}
                    setCheckoutData={setCheckoutData} />

                  {/* Right */}
                  <OrderSummary 
                  checkoutData={checkoutData}
                
                    Step={currentStep} />

                </div>
              </div>
            )}

            {/* Buttons */}
           {currentStep !== 1 && (
  <div className="flex justify-between mt-8">
    <button
      disabled={currentStep === 1}
      onClick={() => setCurrentStep((prev) => prev - 1)}
      className="px-6 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
    >
      Previous
    </button>

    <button
      disabled={currentStep === 4}
      onClick={handleNext}
      className="px-6 py-2 rounded-lg bg-blue-700 text-white disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
          </div>
        </section>





      </div>

    </>
  )
}

export default CheckOut