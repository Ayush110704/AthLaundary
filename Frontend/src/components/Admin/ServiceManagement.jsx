import React, { useState, useEffect } from "react";
import {
  Search, Plus, Eye,Edit, Trash2, ChevronLeft, ChevronRight,Package, IndianRupee,
   Clock,CheckCircle, XCircle, Shirt, Sofa, BrushCleaning,ArrowLeft,Tag,} from "lucide-react";
import AddService from '../AddService'
import {MOCK_SERVICES, DEFAULT_CATEGORY_ITEMS} from '../../Data/LaundaryData.js'
import {Link} from 'react-router-dom'


// Detail view component


function ServiceDetail({ service, onBack }) {
  return(
  <div className=" rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <div className="flex items-center gap-4">
          <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-4xl font-bold text-blue-600">
              {service.name}
            </h1>

            <p className="text-gray-500">
              Service ID: {service.id}
            </p>
          </div>
        </div>

        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* LEFT SIDE */}
        <div className="">
          <h2 className="text-gray-600 font-semibold uppercase tracking-wide mb-4">
            Service Information
          </h2>

          <div className="space-y-4">


            <div className="bg-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Clock className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold">
                    {service.duration}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                {/* <Calendar className="text-blue-600" size={20} /> */}
                <div>
                  <p className="text-sm text-gray-500">Created Date</p>
                  <p className="font-semibold">
                    {service.createdDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">
                Status
              </p>

              <span
                className={`font-semibold ${
                  service.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {service.status}
              </span>
            </div>
          </div>
          </div>

          <div className="mt-6 ">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Items List (with price)
            </h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Item</th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {(service.items && service.items.length > 0
                    ? service.items
                    : (DEFAULT_CATEGORY_ITEMS[service.name] || DEFAULT_CATEGORY_ITEMS[service.category] || DEFAULT_CATEGORY_ITEMS["Laundry"])
                  ).map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 text-sm text-gray-800 flex items-center gap-2">
                        <Shirt className="w-4 h-4 text-blue-500" />
                        {item.name}
                      </td>
                      <td className="px-4 py-2.5 text-sm text-gray-700 text-right font-medium">₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
       

        {/* RIGHT SIDE */}
        {/* <div>
          <h2 className="text-gray-600 font-semibold uppercase tracking-wide mb-4">
            Service Analytics
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <div className="flex items-center gap-2 mt-2">
                <Package
                  className="text-blue-600"
                  size={18}
                />
                <h3 className="text-3xl font-bold text-blue-600">
                  {service.totalOrders}
                </h3>
              </div>
            </div>

            <div className="bg-green-100 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Completed
              </p>

              <div className="flex items-center gap-2 mt-2">
                <CheckCircle
                  className="text-green-600"
                  size={18}
                />
                <h3 className="text-3xl font-bold text-green-600">
                  {service.completedOrders}
                </h3>
              </div>
            </div>

            <div className="bg-red-100 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Cancelled
              </p>

              <div className="flex items-center gap-2 mt-2">
                <XCircle
                  className="text-red-600"
                  size={18}
                />
                <h3 className="text-3xl font-bold text-red-600">
                  {service.cancelledOrders}
                </h3>
              </div>
            </div>

            <div className="bg-purple-100 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Revenue
              </p>

              <div className="flex items-center gap-2 mt-2">
                <IndianRupee
                  className="text-purple-600"
                  size={18}
                />
                <h3 className="text-3xl font-bold text-purple-600">
                  ₹{service.totalEarnings}
                </h3>
              </div>
            </div>
          </div>

          {/* Additional Insights */}
          {/* <div className="mt-4 bg-yellow-100 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Success Rate
            </p>

            <h3 className="text-2xl font-bold text-yellow-600 mt-1">
              {Math.round(
                (service.completedOrders /
                  service.totalOrders) *
                  100
              )}
              %
            </h3>
          </div>

          <div className="mt-4 bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Average Revenue Per Order
            </p>

            <h3 className="text-2xl font-bold text-blue-900 mt-1">
              ₹
              {Math.round(
                service.totalEarnings /
                  service.totalOrders
              )}
            </h3>
          </div>
        </div> */} 
      </div>
    </div>
  );
}




const ServiceManagement = () => {
const API_URL = import.meta.env.VITE_API_URL;
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
     const res = await fetch(`${API_URL}/api/services`);
      const result = await res.json();
      if (result.success) {
        setServices(result.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSave = async (formData) => {
    try {
      const method = editingService ? 'PUT' : 'POST';
      const targetId = editingService ? (editingService._id || editingService.id) : '';
      const url = editingService
  ? `${API_URL}/api/services/${targetId}`
  : `${API_URL}/api/services`;
      
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        fetchServices();
      }
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] =useState(1);
  const [selectedService, setSelectedService] =useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const itemsPerPage = 5;

//stats
  const stats = {

    total: services.length,

    active: services.filter(
      (s) => s.status === "Active" ).length,

    inactive: services.filter(
      (s) => s.status === "Inactive" ).length,

    categories: new Set(
      services.map((s) => s.category) ).size,

    revenue: services.reduce((sum, s) => sum + s.price, 0 ),
  };


  // Category list

  const categories = [

    "All",

    ...new Set(
      services.map(
        (service) => service.category
      )
    ),
  ];


//service filter

  const filteredServices = services.filter((service) => {

      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase())||
          service.id.toLowerCase().includes(searchTerm.toLowerCase());


      const matchesCategory =filterCategory === "All" || service.category ===filterCategory;


      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );


 // pagination

  const totalPages = Math.ceil(filteredServices.length /itemsPerPage);

  const paginatedServices = filteredServices.slice((currentPage - 1)* itemsPerPage,

      currentPage* itemsPerPage );


// page reset

  useEffect(() => {

          setCurrentPage(1);
  }, [searchTerm, filterCategory]);


 // handlers

  const handleView = (service) => {

    setSelectedService(service);

    setShowDetail(true);

  };


  const handleBack = () => {

    setSelectedService(null);

    setShowDetail(false);

  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this service?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/services/${id}`, {
        method: "DELETE"
      });
      const result = await res.json();
      if (result.success) {
        fetchServices();
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };


const handleEdit = (service) => {
  setEditingService(service);
  setOpenModal(true);
};


 // status

  const getStatusBadge = (status) => {

    if (status === "Active") {

      return (

        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1 w-fit">

          <CheckCircle className="w-3 h-3" />

          Active

        </span>
      );
    }

    return (

      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1 w-fit">

        <XCircle className="w-3 h-3" />

        Inactive

      </span>
    );
  };


 // service detail page

  if (showDetail && selectedService) {

    return (

      <div className="min-h-screen bg-gray-50 p-6">

        <div className="max-w-7xl mx-auto">

          <ServiceDetail

            service={selectedService}

            onBack={handleBack}

          />

        </div>

      </div>
    );
  }


  // card data
  const statCards = [

    {
      title: "Total",

      value: stats.total,

      icon: Package,

      border: "border-blue-500",

      text: "text-blue-600",
    },

    {
      title: "Active",

      value: stats.active,

      icon: CheckCircle,

      border: "border-green-500",

      text: "text-green-600",
    },

    {
      title: "Inactive",

      value: stats.inactive,

      icon: XCircle,

      border: "border-red-500",

      text: "text-red-600",
    },

    {
      title: "Categories",

      value: stats.categories,

      icon: BrushCleaning,

      border: "border-yellow-500",

      text: "text-yellow-600",
    },



  ];


 //table header 

  const tableHeaders = [

    "Service ID",

    "Service",

    "Duration",

    "Status",

    "Action",
  ];

  return (

    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>

            <h1 className="text-3xl font-bold text-gray-900">

              Service Management

            </h1>

            <p className="text-gray-500">

              Manage all laundry services

            </p>

          </div>

          {/* Add Service button removed */}

          <AddService
  isOpen={openModal}
  onClose={() => {
    setOpenModal(false);
    setEditingService(null);
  }}
  serviceToEdit={editingService}
  onSave={handleSave}
/>

        </div>


        {/* STATS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {statCards.map((card, index) => {

            const Icon = card.icon;

            return (

              <div

                key={index}

                className={`bg-white border-l-4 ${card.border} rounded-xl p-5 shadow-sm`}

              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-gray-500 text-sm">

                      {card.title}

                    </p>

                    <h2 className={`text-2xl font-bold ${card.text}`}>

                      {card.value}

                    </h2>

                  </div>

                  <Icon className={`w-7 h-7 ${card.text}`} />

                </div>

              </div>

            )

          })}

        </div>


       

        {/* TABLE */}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  {tableHeaders.map((header) => (

                    <th

                      key={header}

                      className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase"

                    >

                      {header}

                    </th>

                  ))}

                </tr>

              </thead>


              <tbody>

                {paginatedServices.map((service) => (

                  <tr
                
                    key={service.id}
                   
                    className="border-t hover:bg-blue-100 transition font-semibold text-gray-900 text-md cursor-arrow"

                  >
                     
                    <td className="px-5 py-4 text-blue-600 ">

                      {service.id}

                    </td>

                    <td className="px-5 py-4 ">

                      {service.name}

                    </td>



                    <td className="px-5 py-4 ">

                      <div className="flex items-center gap-2">

                        <Clock className="w-4 h-4 text-gray-400" />

                        {service.duration}

                      </div>

                    </td>

                    <td className="px-5 py-4">

                      {getStatusBadge(service.status)}

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() => handleView(service)}
                          className="p-2 rounded hover:bg-yellow-100" >

                       
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>

                        <button
                          onClick={() => handleEdit(service)} 
                          
                          className="p-2 rounded hover:bg-yellow-100" >
                            {/* <AddService
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      /> */}

                       
                          <Edit className="w-4 h-4 text-yellow-600" />
                        </button>

                        {/* Delete action removed */}
                    </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>


          {/* EMPTY STATE */}

          {filteredServices.length === 0 && (

            <div className="text-center py-12">

              <Package className="w-14 h-14 text-gray-300 mx-auto mb-4" />

              <h2 className="text-lg font-semibold text-gray-700"> No Services Found</h2>
            
              <p className="text-gray-500">Try changing filters</p>
                
            </div>

          )}


          {/* PAGINATION */}

          {filteredServices.length > 0 && (

            <div className="flex flex-col md:flex-row justify-between items-center p-5 border-t gap-4">
              <p className="text-sm text-gray-500">
                Showing
                {" "}
                {(currentPage - 1) * itemsPerPage + 1}
                {" "}to{" "}

                {Math.min(currentPage * itemsPerPage,filteredServices.length)}
                {" "}of{" "}
                
                {filteredServices.length}
              </p>

              <div className="flex gap-2">

                <button
                  onClick={() =>setCurrentPage( Math.max( currentPage - 1, 1) ) }
                  disabled={currentPage === 1}
                  className="border rounded px-3 py-2 disabled:opacity-50">
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages },

                  (_, i) => i + 1).map((page) => (

                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded border
                           ${currentPage === page ? "bg-blue-600 text-white" : ""  }`}>
                    {page}
                  </button>
                ))}


                <button
                  onClick={() => setCurrentPage(  Math.min(currentPage + 1,totalPages))}
                  disabled={currentPage === totalPages}
                  className="border rounded px-3 py-2 disabled:opacity-50" >
                  <ChevronRight className="w-4 h-4" />
                </button>
            </div>
            </div>
          )}

        </div>
      </div>
    </div>

  );
}

export default ServiceManagement;