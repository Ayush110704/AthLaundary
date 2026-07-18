import React , {useState , useEffect} from 'react'
import {Sun,SunMedium,Moon,CircleCheckBig,CalendarDays, ChevronLeft, ChevronRight} from 'lucide-react'
import {motion} from 'framer-motion'
import {getCheckoutData,saveCheckoutData,} from "../utils/checkoutStorage";

const Schedule = ({ checkoutData, setCheckoutData }) => {


const [selectedPickupSlot, setSelectedPickupSlot] = useState( checkoutData.schedule?.slot || "");
const [selectedDeliverySlot, setSelectedDeliverySlot] = useState(checkoutData.schedule?.deliverySlot || "");
 const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    return start;
  });

   const [selected, setSelected] = useState( checkoutData.schedule?.date ? new Date(checkoutData.schedule.date) : new Date());
   

    const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });

  const changeWeek = (direction) => {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + direction * 7);
    setStartDate(newDate);
  };
 useEffect(() => {
  setCheckoutData((prev) => {
    const update = {
      ...prev,
      schedule: {
        ...prev.schedule,
        date: selected.toLocaleDateString(),
        slot: selectedPickupSlot,
        // Ensure these match the keys we set in models/Order.js
        deliveryDate: selectedDeliverySlot?.date || "", 
        deliveryTimeSlot: selectedDeliverySlot?.time || "",
      }
    };
    saveCheckoutData(update);
    return update;
  });
}, [selected, selectedPickupSlot, selectedDeliverySlot, setCheckoutData]);
 const slots = [
  {
    id: 1,
    title: "Morning",
    time: "8 AM - 11 AM",
    endTime: 11 ,
    icon: Sun,
  },
  {
    id: 2,
    title: "Afternoon",
    time: "1 PM - 4 PM",
    endTime: 16 ,
    icon: SunMedium,
  },
  {
    id: 3,
    title: "Night",
    time: "6 PM - 9 PM",
    endTime:21,
    icon: Moon,
  },
];



const DeliverySlots = [
  {
    id: 1,
    time: "11 AM - 1 PM",
    icon: Sun,
     offset:1
  },
  {
    id: 2,
    time: "5 PM - 6 PM",
    icon: SunMedium,
    offset:2

  },
  {
    id: 3,
    time: "9 PM - 10 PM",
    icon: Moon,
    offset:3
  },

]



const isSlotPassed = (slot) => {
  const now = new Date();

  // Only disable slots for today
  if (selected.toDateString() !== now.toDateString()) {
    return false;
  }

  return now.getHours() >= slot.endTime;
};

  return (
    <>
     <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-2 md:p-6"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-5">
            Schedule Pickup
          </h2>

           <div className="w-full max-w-5xl bg-blue-50 mx-auto  rounded-2xl  shadow-2xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-blue-700" />
          <h2 className="text-xl md:text-2xl font-bold">Select Date</h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => changeWeek(-1)}
            className=" md:p-2 border rounded-lg hover:bg-blue-50"
          >
            <ChevronLeft size={15} />
          </button>

          <button
            onClick={() => changeWeek(1)}
            className=" md:p-2 border rounded-lg hover:bg-blue-50"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day,index) => (
          <div
             key={`${day}-${index}`}
            className="text-center text-xs md:text-sm font-semibold text-gray-500"
          >
            {day}
          </div>
        ))}

        {days.map((date, index) => {
          const isSelected =
            selected.toDateString() === date.toDateString();

          const isCurrentMonth =
            date.getMonth() === new Date().getMonth();

            const today = new Date();
today.setHours(0, 0, 0, 0);

const currentDate = new Date(date);
currentDate.setHours(0, 0, 0, 0);

const isPastDate = currentDate < today;

          return (
           <button
  key={index}
  disabled={isPastDate}
  onClick={() => !isPastDate && setSelected(date)}
  className={`py-3 px-2 rounded-xl flex items-center justify-center font-medium transition-all duration-300
    ${
      isPastDate
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : isSelected
        ? "bg-blue-800 text-white"
        : "hover:bg-blue-50"
    }
  `}
>
  {date.getDate()}
</button>
          );
        })}
      </div>
    </div>

          <h3 className="font-semibold mt-8 mb-4">
            Select Time Slot
          </h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
  {slots.map((slot) => {
    const Icon = slot.icon;
    const disabled = isSlotPassed(slot);

    return (
      <button
        key={slot.id}
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setSelectedPickupSlot(slot.time);
          }
        }}
        className={`relative p-5 rounded-2xl border text-left transition-all duration-300
          ${
            disabled
              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-70"
              : selectedPickupSlot === slot.time
              ? "bg-blue-900 text-white border-blue-900 hover:scale-105"
              : "bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100 hover:scale-105"
          }`}
      >
        {/* Selection Icon */}
        <div className="absolute top-3 right-3">
          <CircleCheckBig
            size={22}
            className={
              disabled
                ? "text-gray-400"
                : selectedPickupSlot === slot.time
                ? "text-white"
                : "text-gray-300"
            }
          />
        </div>

        <Icon className="h-8 w-8 mb-3" />

        <h3 className="font-semibold text-lg">
          {slot.title}
        </h3>

        <p
          className={`text-sm mt-1 ${
            disabled
              ? "text-gray-400"
              : selectedPickupSlot === slot.time
              ? "text-blue-100"
              : "text-gray-600"
          }`}
        >
          {slot.time}
        </p>

        {disabled && (
          <span className="mt-2 inline-block text-xs font-medium text-red-500">
            Slot Closed
          </span>
        )}
      </button>
    );
  })}
</div> 

<div className="mt-8">

  <h2 className="font-semibold">Schedule Delivery</h2>
  <div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
  {DeliverySlots.map((slot) => {
    
    const disabled = isSlotPassed(slot);

     const date = new Date(selected);
  date.setDate(date.getDate() + slot.offset);

  const formattedDate = date.toLocaleDateString();
  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
  });


    return (
      <button
        key={slot.id}
        disabled={disabled}
        onClick={() => {
        
            setSelectedDeliverySlot({
               time: slot.time,
               date: formattedDate,
               day: day,
            });
          
        }}
        className={`relative p-5 rounded-2xl border text-left transition-all duration-300
          ${
            
               selectedDeliverySlot?.time === slot.time
              ? "bg-blue-900 text-white border-blue-900 hover:scale-105"
              : "bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100 hover:scale-105"
          }`}
      >
        {/* Selection Icon */}
        <div className="absolute top-3 right-3">
          <CircleCheckBig
            size={22}
            className={
          
            
                selectedDeliverySlot?.time === slot.time
                ? "text-white"
                : "text-gray-300"
            }
          />
        </div>


<h3 className="font-semibold text-lg">
          {formattedDate}
        </h3>
        <h3 className="font-semibold text-lg">
          {day}
        </h3>
        <p
          className={`text-sm mt-1 ${
           
               selectedDeliverySlot?.time === slot.time
              ? "text-blue-100"
              : "text-gray-600"
          }`}
        >
          {slot.time}
        </p>

       
      </button>
    );
  })}
</div> 
    </div>
    
</div>
   
        </motion.div>
    
    </>
  )
}

export default Schedule