import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Clock, Hospital, Home, Pill, Users, Search, BarChart3, ListChecks } from 'lucide-react';
// Assuming you have a Chart component for the graph (we'll mock it for now)
// import { Chart } from '@/components/ui/chart'; 

interface Service {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  hours: string;
  is_24_7: boolean;
}

// --- MOCK CHART COMPONENT (For illustration) ---
const ServicesChart = ({ services }: { services: Service[] }) => {
    const categoryCounts = useMemo(() => {
        return services.reduce((acc, service) => {
            acc[service.category] = (acc[service.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [services]);

    const chartData = Object.entries(categoryCounts)
        .sort(([, countA], [, countB]) => countB - countA);

    if (chartData.length === 0) return null;

    return (
        <Card className="p-6 rounded-xl shadow-lg bg-white">
            <h3 className="text-xl font-bold mb-4 text-indigo-700 flex items-center gap-2">
                <BarChart3 className="h-5 w-5"/> Service Distribution
            </h3>
            <div className="space-y-3">
                {chartData.map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between text-sm">
                        <span className="capitalize text-gray-700">{category}</span>
                        <div className="flex items-center gap-2 w-3/4">
                            <div className="flex-1 h-2 rounded-full bg-gray-200">
                                <div 
                                    className="h-2 rounded-full bg-indigo-500 transition-all duration-500" 
                                    style={{ width: `${(count / chartData[0][1]) * 100}%` }}
                                ></div>
                            </div>
                            <span className="font-bold text-indigo-600 w-6 text-right">{count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
// ----------------------------------------------

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for initial presentation and development
  useEffect(() => {
    // This is where you would call loadServices in a real app
    // For a better visual, let's include mock data if the loadServices fails or returns empty
    const mockServices = [
        { id: '1', name: 'City General Hospital', category: 'hospital', address: '123 Main St, Central', phone: '(555) 123-4567', hours: 'Open 24 Hours', is_24_7: true },
        { id: '2', name: 'Downtown Pharmacy', category: 'pharmacy', address: '45 Oak Ave, Downtown', phone: '(555) 987-6543', hours: '9:00 AM - 7:00 PM', is_24_7: false },
        { id: '3', name: 'Community Wellness Center', category: 'community', address: '789 Pine Ln, East Side', phone: '(555) 345-1200', hours: '10:00 AM - 4:00 PM (M-F)', is_24_7: false },
        { id: '4', name: 'Emergency Family Shelter', category: 'shelter', address: '101 Bay Rd, West Side', phone: '(555) 222-3333', hours: 'Open 24 Hours', is_24_7: true },
        { id: '5', name: '24HR Pharmacy', category: 'pharmacy', address: '202 Market St, Central', phone: '(555) 444-5555', hours: 'Open 24 Hours', is_24_7: true },
        { id: '6', name: 'St. Jude Medical', category: 'hospital', address: '500 North Ave, North Side', phone: '(555) 600-7000', hours: 'Open 24 Hours', is_24_7: true },
        { id: '7', name: 'South End Soup Kitchen', category: 'community', address: '333 South Blvd, South End', phone: '(555) 888-9999', hours: '11:00 AM - 1:00 PM (Daily)', is_24_7: false },
    ];
    setServices(mockServices);
    setLoading(false);
  }, []);

  // Removed the actual supabase call hook to prevent running against a potentially unset client
  // You would restore the original useEffect hook to load data from Supabase in a real application.

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hospital': return Hospital;
      case 'pharmacy': return Pill;
      case 'shelter': return Home;
      case 'community': return Users;
      default: return MapPin;
    }
  };

  const categories = useMemo(() => ([
    { id: 'all', label: 'All Services', Icon: ListChecks },
    { id: 'hospital', label: 'Hospitals', Icon: Hospital },
    { id: 'pharmacy', label: 'Pharmacies', Icon: Pill },
    { id: 'shelter', label: 'Shelters', Icon: Home },
    { id: 'community', label: 'Community', Icon: Users }
  ]), []);
  
  // Filtering and Searching Logic
  const filteredServices = useMemo(() => {
    let list = filter === 'all' 
      ? services 
      : services.filter(s => s.category === filter);
      
    if (searchTerm) {
        const lowerCaseSearch = searchTerm.toLowerCase();
        list = list.filter(s => 
            s.name.toLowerCase().includes(lowerCaseSearch) ||
            s.address.toLowerCase().includes(lowerCaseSearch) ||
            s.category.toLowerCase().includes(lowerCaseSearch)
        );
    }
    return list;
  }, [services, filter, searchTerm]);

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      
      {/* Header - Fixed and prominent */}
      <header className="bg-indigo-700 text-white p-6 shadow-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight">Local Resources</h1>
          <p className="text-indigo-200">Find essential community services instantly.</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">

        {/* Search Bar - High UX priority for resource finding */}
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
                type="text"
                placeholder="Search by name, address, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-xl shadow-md focus:border-indigo-500 focus:ring-indigo-500 transition"
            />
        </div>

        {/* Category Filters - More visually engaging */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 border-b border-gray-200">
          {categories.map((cat) => {
              const CatIcon = cat.Icon;
              const isActive = filter === cat.id;
              return (
                <Button
                  key={cat.id}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(cat.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition hover:scale-[1.03] ${isActive ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
                >
                  <CatIcon className="h-4 w-4 mr-1.5" />
                  {cat.label}
                </Button>
              );
          })}
        </div>
        
        {/* Service Distribution Graph (New Feature) */}
        <ServicesChart services={services} />

        {/* Services List Title */}
        <h2 className="text-xl font-bold text-indigo-700 mt-6">
            Showing {filteredServices.length} {filter === 'all' ? 'total services' : `${categories.find(c => c.id === filter)?.label}`}
        </h2>

        {/* Services List */}
        {loading ? (
          <Card className="p-6 text-center rounded-xl shadow-sm">
            <p className="text-gray-500 flex items-center justify-center gap-2"><div className="animate-spin h-4 w-4 border-t-2 border-indigo-500 rounded-full"></div> Retrieving services...</p>
          </Card>
        ) : filteredServices.length === 0 ? (
          <Card className="p-6 text-center rounded-xl shadow-sm">
            <p className="text-gray-500">No services found for "{searchTerm}" in this category.</p>
            <Button variant="link" onClick={() => { setFilter('all'); setSearchTerm(''); }} className="mt-2">
                Clear Filter and Search
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service) => {
              const Icon = getCategoryIcon(service.category);
              return (
                <Card 
                  key={service.id} 
                  className="p-5 rounded-xl shadow-lg bg-white border border-gray-100 transition hover:shadow-xl hover:border-indigo-200"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon Block */}
                    <div className="p-3 bg-indigo-50 rounded-xl flex-shrink-0 border border-indigo-100">
                      <Icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    
                    {/* Content Block */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-extrabold text-xl text-gray-900 truncate">{service.name}</h3>
                        {service.is_24_7 && (
                          <Badge className="bg-green-500 text-white text-xs px-2 py-0.5 ml-2 font-bold flex-shrink-0">
                            24/7
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-1.5 text-sm text-gray-600">
                        {/* Address */}
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                          <span className="truncate">{service.address}</span>
                        </div>
                        
                        {/* Phone */}
                        {service.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                            <a 
                              href={`tel:${service.phone}`}
                              className="text-indigo-600 font-medium hover:underline"
                            >
                              {service.phone}
                            </a>
                          </div>
                        )}
                        
                        {/* Hours */}
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                          <span className="font-medium">{service.hours}</span>
                        </div>
                      </div>

                      {/* Action Buttons - More prominent & easy to tap */}
                      <div className="flex gap-3 mt-4">
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => window.open(`tel:${service.phone}`)}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 shadow-md transition hover:scale-[1.02]"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call Now
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(service.address)}`)}
                          className="flex-1 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition hover:scale-[1.02]"
                        >
                          <MapPin className="h-4 w-4 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}