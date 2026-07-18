import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { DEFAULT_CATEGORY_ITEMS } from "../Data/LaundaryData.js";

const AddService = ({ isOpen, onClose, serviceToEdit = null, onSave }) => {

  const initialForm = {
    id: "",
    name: "",
    category: "Laundry",
    price: "",
    duration: "",
    status: "Active",
    description: "",
    image: null,
    items: [],
  };

  const [formData, setFormData] = useState(initialForm);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");

  useEffect(() => {
    if (serviceToEdit) {
      const itemsList = serviceToEdit.items && serviceToEdit.items.length > 0
        ? serviceToEdit.items
        : (DEFAULT_CATEGORY_ITEMS[serviceToEdit.category] || DEFAULT_CATEGORY_ITEMS["Laundry"]);
      
      setFormData({
        id: serviceToEdit.id || "",
        name: serviceToEdit.name || "",
        category: serviceToEdit.category || "Laundry",
        price: serviceToEdit.price || "",
        duration: serviceToEdit.duration || "",
        status: serviceToEdit.status || "Active",
        description: serviceToEdit.description || "",
        image: serviceToEdit.image || null,
        items: itemsList,
      });
      setSelectedItemName(itemsList[0]?.name || "");
    } else {
      const itemsList = DEFAULT_CATEGORY_ITEMS["Laundry"] || [];
      setFormData({
        ...initialForm,
        items: itemsList,
      });
      setSelectedItemName(itemsList[0]?.name || "");
    }
  }, [serviceToEdit, isOpen]);

  const handleNameChange = (nameVal) => {
    const matchedCat = Object.keys(DEFAULT_CATEGORY_ITEMS).find(
      (cat) => cat.toLowerCase() === nameVal.toLowerCase()
    );

    const newItems = matchedCat ? DEFAULT_CATEGORY_ITEMS[matchedCat] : formData.items;

    setFormData({
      ...formData,
      name: nameVal,
      category: nameVal,
      items: newItems,
    });

    if (matchedCat) {
      setSelectedItemName(newItems[0]?.name || "");
    }
  };


  const handleCreateItem = () => {
    if (!newItemName.trim() || !newItemPrice) {
      alert("Please fill in both item name and price.");
      return;
    }
    const newItem = {
      name: newItemName.trim(),
      price: Number(newItemPrice),
    };
    const updatedItems = [...formData.items, newItem];
    setFormData({
      ...formData,
      items: updatedItems,
    });
    setSelectedItemName(newItem.name);
    setNewItemName("");
    setNewItemPrice("");
  };

  const handleDeleteItem = () => {
    if (!selectedItemName) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete the item "${selectedItemName}"?`);
    if (!confirmDelete) return;

    const updatedItems = formData.items.filter((item) => item.name !== selectedItemName);
    setFormData({
      ...formData,
      items: updatedItems,
    });
    setSelectedItemName(updatedItems[0]?.name || "");
  };

  const handlePriceChange = (newPrice) => {
    if (selectedItemName) {
      const updatedItems = formData.items.map((item) => {
        if (item.name === selectedItemName) {
          return { ...item, price: Number(newPrice) || 0 };
        }
        return item;
      });
      setFormData({
        ...formData,
        price: newPrice,
        items: updatedItems,
      });
    } else {
      setFormData({
        ...formData,
        price: newPrice,
      });
    }
  };

  const getDisplayPrice = () => {
    if (selectedItemName) {
      const selectedItem = formData.items.find((item) => item.name === selectedItemName);
      return selectedItem ? selectedItem.price : formData.price;
    }
    return formData.price;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      category: formData.name || formData.category || "Laundry"
    };

    if (serviceToEdit) {
      onSave({
        ...finalData,
        id: serviceToEdit.id,
      });
    } else {
      onSave({
        ...finalData,
        id: formData.id,
      });
    }

    onClose();
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 md:p-5"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 md:px-6 py-4 border-b">
              <h2 className="text-xl md:text-2xl font-bold text-blue-900">
                 {serviceToEdit ? "Edit Service" : "Add New Service"}
              </h2>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form className="p-4 md:p-6 space-y-5" onSubmit={handleSubmit}>
              {/* Service ID */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Service Id
                </label>

                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="e.g. SRV007"
                />
              </div>

              {/* Service Name */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Service Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="e.g. Laundry"
                  required
                />
              </div>

              {/* Select Item Name */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Select Item Name
                </label>

                <div className="flex gap-2">
                  <select 
                    value={selectedItemName}
                    onChange={(e) => setSelectedItemName(e.target.value)}
                    className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
                  >
                    {formData.items?.map((item, idx) => (
                      <option key={idx} value={item.name}>
                        {item.name} (₹{item.price})
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleDeleteItem}
                    disabled={!selectedItemName}
                    className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-600 font-semibold rounded-xl transition flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete selected item"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Price, Duration & Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Price (₹)
                  </label>

                  <input
                    type="text"
                    value={getDisplayPrice()}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Service Duration
                  </label>

                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Status
                  </label>

                  <select 
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Create Item Panel (moved to bottom) */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">Create Item</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-600">Item Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Silk Shirt"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-xs font-medium text-gray-600">Item Price (₹)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 150"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCreateItem}
                    className="w-full py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition shadow-sm"
                  >
                    Create Item
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  
                  className="w-full sm:w-auto px-6 py-3 bg-blue-900 text-white rounded-xl font-medium hover:bg-blue-800 transition"
                >
                  {serviceToEdit ? "Update Service" : "Save Service"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddService;