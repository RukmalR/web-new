import React, { useState } from 'react';
import { ArrowLeft, Filter, Star, MapPin, Phone, MessageCircle, User, Award, Package, Eye } from 'lucide-react';
import { materialItems, materialCategories, sriLankanDistricts } from '../data/services';
import { MaterialItem } from '../types';

interface MaterialListingPageProps {
  onBack: () => void;
}

export const MaterialListingPage: React.FC<MaterialListingPageProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(null);

  // Filter materials based on selected filters
  const filteredMaterials = materialItems.filter(item => {
    const categoryMatch = selectedCategory ? item.category === selectedCategory : true;
    const districtMatch = selectedDistrict ? item.supplier.district === selectedDistrict : true;
    return categoryMatch && districtMatch;
  });

  // Get unique categories for filter
  const availableCategories = [...new Set(materialItems.map(m => m.category))];

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleMessage = (phone: string, supplierName: string, materialName: string) => {
    const message = `Hi ${supplierName}, I'm interested in your ${materialName}. Can you provide more details about availability and pricing?`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Material detail view
  if (selectedMaterial) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedMaterial(null)}
              className="flex items-center text-white hover:text-blue-200 transition-colors mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Materials
            </button>
            <h1 className="text-4xl font-bold text-white">{selectedMaterial.name}</h1>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <img 
                  src={selectedMaterial.image} 
                  alt={selectedMaterial.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg mb-6"
                />
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Material Details</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedMaterial.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600">Price per {selectedMaterial.unit}</div>
                      <div className="text-2xl font-bold text-blue-600">Rs. {selectedMaterial.pricePerUnit.toLocaleString()}</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600">Availability</div>
                      <div className="text-lg font-semibold text-green-600">
                        {selectedMaterial.available ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Supplier Information</h2>
                    <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-blue-500 fill-current mr-1" />
                      <span className="font-semibold text-blue-700">{selectedMaterial.supplier.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{selectedMaterial.supplier.name}</div>
                        <div className="text-sm text-gray-600">Material Supplier</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-lg mr-4">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Location</div>
                        <div className="text-gray-600">{selectedMaterial.supplier.location}, {selectedMaterial.supplier.district}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-lg mr-4">
                        <Phone className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Contact Number</div>
                        <div className="text-gray-600">{selectedMaterial.supplier.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-orange-100 p-2 rounded-lg mr-4">
                        <Award className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Total Orders</div>
                        <div className="text-gray-600">{selectedMaterial.supplier.totalOrders} completed</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Supplier</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleCall(selectedMaterial.supplier.phone)}
                      className="flex items-center justify-center bg-green-500 text-white py-4 px-6 rounded-xl hover:bg-green-600 transition-colors font-semibold shadow-lg"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </button>
                    <button
                      onClick={() => handleMessage(selectedMaterial.supplier.phone, selectedMaterial.supplier.name, selectedMaterial.name)}
                      className="flex items-center justify-center bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-semibold shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Message
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Connect directly with the supplier. Negotiate your own terms and pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-white hover:text-blue-200 transition-colors mb-8 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>

          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              🧱 Construction Materials
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Source quality construction materials from verified suppliers across Sri Lanka.
            </p>
          </div>
        </div>
      </section>

      {/* Material Categories Overview */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Material Categories</h2>
            <p className="text-gray-600 text-lg">Choose from our comprehensive range of construction materials</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {materialCategories.map((category) => (
              <div key={category.id} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-xs">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Material Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter Materials
              </h3>
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedDistrict('');
                }}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">All Districts</option>
                  {sriLankanDistricts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Material Type</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">All Material Types</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredMaterials.length} materials
              {selectedDistrict && ` in ${selectedDistrict} district`}
              {selectedCategory && ` in ${selectedCategory} category`}
            </p>
          </div>

          {/* Material Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMaterials.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{item.supplier.rating}</span>
                    </div>
                  </div>
                  {item.available && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Available
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                  
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 text-sm">{item.supplier.name}</span>
                      <span className="text-xs text-gray-500">{item.supplier.totalOrders} orders</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {item.supplier.location}, {item.supplier.district}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        Rs. {item.pricePerUnit.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">per {item.unit}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMaterial(item)}
                    className="w-full flex items-center justify-center bg-blue-500 text-white py-3 px-4 rounded-xl hover:bg-blue-600 transition-colors font-semibold"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMaterials.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No materials found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to find materials that match your requirements.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};