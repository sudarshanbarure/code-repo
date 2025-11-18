// import { useEffect, useState } from 'react';
// import { supabase } from '@/integrations/supabase/client';
// import { useAuth } from '@/contexts/AuthContext';
// import { BottomNav } from '@/components/BottomNav';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { AlertCircle, Wind, Car, Zap, MapPin, Bell } from 'lucide-react';
// import { toast } from 'sonner';

// interface Alert {
//   id: string;
//   type: string;
//   title: string;
//   message: string;
//   severity: string;
//   zone: string;
//   is_read: boolean;
//   created_at: string;
// }

// export default function Home() {
//   const { user } = useAuth();
//   const [alerts, setAlerts] = useState<Alert[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState<any>(null);

//   useEffect(() => {
//     loadAlerts();
//     loadProfile();
//   }, [user]);

//   const loadProfile = async () => {
//     if (!user) return;
//     const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
//     setProfile(data);
//   };

//   const loadAlerts = async () => {
//     if (!user) return;
//     const { data, error } = await supabase
//       .from('alerts')
//       .select('*')
//       .eq('user_id', user.id)
//       .order('created_at', { ascending: false })
//       .limit(10);
//     if (error) toast.error('Failed to load alerts');
//     else setAlerts(data || []);
//     setLoading(false);
//   };

//   const markAsRead = async (alertId: string) => {
//     await supabase.from('alerts').update({ is_read: true }).eq('id', alertId);
//     setAlerts(alerts.map(a => a.id === alertId ? { ...a, is_read: true } : a));
//   };

//   const getAlertIcon = (type: string) => {
//     switch (type) {
//       case 'aqi': return Wind;
//       case 'traffic': return Car;
//       case 'utility': return Zap;
//       default: return AlertCircle;
//     }
//   };

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'critical': return 'destructive';
//       case 'warning': return 'warning';
//       default: return 'info';
//     }
//   };

//   useEffect(() => {
//     if (user && alerts.length === 0 && !loading) {
//       const mockAlerts = [
//         {
//           id: '1',
//           user_id: user.id,
//           type: 'aqi',
//           title: 'Air Quality Alert',
//           message: 'AQI levels are moderate in your area. Consider limiting outdoor activities.',
//           severity: 'warning',
//           zone: 'Downtown',
//           is_read: false,
//           created_at: new Date().toISOString()
//         },
//         {
//           id: '2',
//           user_id: user.id,
//           type: 'traffic',
//           title: 'Traffic Update',
//           message: 'Heavy traffic on Main St. Consider using alternate route via Oak Ave.',
//           severity: 'info',
//           zone: 'Downtown',
//           is_read: false,
//           created_at: new Date().toISOString()
//         }
//       ];
//       setAlerts(mockAlerts);
//     }
//   }, [user, alerts, loading]);

//   return (
//     <div className="min-h-screen pb-20 bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50">
      
//       {/* Header */}
//       <header className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white p-6 shadow-xl">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold mb-1 tracking-tight">
//             Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!
//           </h1>
//           <p className="text-white/80 text-sm">Here's what's happening in your area</p>
//         </div>
//       </header>

//       <main className="max-w-4xl mx-auto p-6 space-y-6">
        
//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           <Card className="p-5 text-center rounded-xl shadow-md hover:shadow-lg transition">
//             <Bell className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
//             <div className="text-2xl font-bold">{alerts.filter(a => !a.is_read).length}</div>
//             <div className="text-sm text-gray-500">New Alerts</div>
//           </Card>
//           <Card className="p-5 text-center rounded-xl shadow-md hover:shadow-lg transition">
//             <Wind className="h-6 w-6 mx-auto mb-2 text-green-500" />
//             <div className="text-2xl font-bold">Good</div>
//             <div className="text-sm text-gray-500">Air Quality</div>
//           </Card>
//           <Card className="p-5 text-center rounded-xl shadow-md hover:shadow-lg transition">
//             <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
//             <div className="text-2xl font-bold">3</div>
//             <div className="text-sm text-gray-500">Services OK</div>
//           </Card>
//         </div>

//         {/* Alerts Feed */}
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold flex items-center gap-2 text-indigo-700">
//             <Bell className="h-5 w-5" />
//             Recent Alerts
//           </h2>

//           {loading ? (
//             <Card className="p-6 text-center rounded-xl shadow-sm">
//               <p className="text-gray-500">Loading alerts...</p>
//             </Card>
//           ) : alerts.length === 0 ? (
//             <Card className="p-6 text-center rounded-xl shadow-sm">
//               <p className="text-gray-500">No alerts at this time</p>
//             </Card>
//           ) : (
//             alerts.map((alert) => {
//               const Icon = getAlertIcon(alert.type);
//               return (
//                 <Card key={alert.id} className={`p-5 rounded-xl shadow-md transition ${!alert.is_read ? 'border-l-4 border-indigo-500' : ''}`}>
//                   <div className="flex items-start gap-4">
//                     <div className="p-2 bg-indigo-100 rounded-lg">
//                       <Icon className="h-5 w-5 text-indigo-600" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <h3 className="font-semibold text-indigo-800">{alert.title}</h3>
//                         <Badge variant={getSeverityColor(alert.severity) as any}>
//                           {alert.severity}
//                         </Badge>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
//                       <div className="flex items-center gap-4 text-xs text-gray-500">
//                         <span className="flex items-center gap-1">
//                           <MapPin className="h-3 w-3" />
//                           {alert.zone}
//                         </span>
//                         <span>{new Date(alert.created_at).toLocaleDateString()}</span>
//                       </div>
//                       {!alert.is_read && (
//                         <Button 
//                           size="sm" 
//                           variant="ghost" 
//                           className="mt-2 text-indigo-600 hover:bg-indigo-100"
//                           onClick={() => markAsRead(alert.id)}
//                         >
//                           Mark as read
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 </Card>
//               );
//             })
//           )}
//         </div>
//       </main>

//       <BottomNav />
//     </div>
//   );
// }
import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Wind, Car, Zap, MapPin, Bell, Sun, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface Alert {
  id: string;
  type: string;
  title: string;
  message: string;
  severity: string;
  zone: string;
  is_read: boolean;
  created_at: string;
}

// Helper to format date for better readability (UX improvement)
const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  if (diffInMinutes < 24 * 60) return `${Math.floor(diffInMinutes / 60)} hours ago`;
  
  return past.toLocaleDateString();
};


export default function Home() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  // --- Data Loading Logic (Unchanged for correctness) ---

  useEffect(() => {
    loadAlerts();
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    setProfile(data);
  };

  const loadAlerts = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);
    if (error) toast.error('Failed to load alerts');
    else setAlerts(data || []);
    setLoading(false);
  };

  const markAsRead = async (alertId: string) => {
    await supabase.from('alerts').update({ is_read: true }).eq('id', alertId);
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, is_read: true } : a));
  };

  // --- Mock Data for Empty State (Optional but good for presentation) ---
  useEffect(() => {
    if (user && alerts.length === 0 && !loading) {
      const mockAlerts = [
        {
          id: '1', user_id: user.id, type: 'aqi', title: 'Air Quality Alert',
          message: 'AQI levels are **Moderate (105)** in your area. Consider limiting outdoor activities.',
          severity: 'warning', zone: 'Downtown Sector', is_read: false, created_at: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
        },
        {
          id: '2', user_id: user.id, type: 'traffic', title: 'Heavy Congestion',
          message: 'Major accident on **Main St. (Route 12)**. Use alternate route via Oak Ave. Expect 20 min delay.',
          severity: 'critical', zone: 'North Side', is_read: false, created_at: new Date(Date.now() - 600000).toISOString() // 10 minutes ago
        },
        {
          id: '3', user_id: user.id, type: 'utility', title: 'Planned Power Outage',
          message: 'Essential maintenance in the **South End** starting tomorrow, 6 AM.',
          severity: 'info', zone: 'South End', is_read: true, created_at: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
        }
      ];
      setAlerts(mockAlerts);
    }
  }, [user, alerts, loading]);
  
  // --- UI/Styling Helpers ---

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'aqi': return Wind;
      case 'traffic': return Car;
      case 'utility': return Zap;
      default: return AlertCircle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 hover:bg-red-600 text-white';
      case 'warning': return 'bg-yellow-500 hover:bg-yellow-600 text-black';
      case 'info': return 'bg-blue-500 hover:bg-blue-600 text-white';
      default: return 'bg-gray-400 hover:bg-gray-500 text-white';
    }
  };
  
  // Use useMemo for computed values (UX improvement: faster rendering)
  const unreadAlertCount = useMemo(() => alerts.filter(a => !a.is_read).length, [alerts]);

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      
      {/* Header - Stronger, more focused branding */}
      <header className="bg-indigo-700 text-white p-6 shadow-2xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter">
              CitySense
            </h1>
            <p className="text-indigo-200 text-sm mt-0.5">Your real-time urban assistant</p>
          </div>
          <div className="text-right">
             <p className="text-indigo-200 text-sm">Hello,</p>
             <h2 className="text-xl font-bold">{profile?.full_name || 'Resident'}!</h2>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
        
        {/* Quick Stats - More modern, descriptive titles */}
        <section className="pt-2">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Your Dashboard Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Card 1: New Alerts */}
            <Card className="p-4 flex flex-col items-start rounded-xl shadow-lg border border-indigo-100 bg-white transform hover:scale-[1.02] transition duration-300">
              <Bell className="h-6 w-6 text-indigo-500 mb-2" />
              <div className="text-3xl font-extrabold text-indigo-700">{unreadAlertCount}</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Unread Alerts</div>
            </Card>
            {/* Card 2: Air Quality (Mock Data) */}
            <Card className="p-4 flex flex-col items-start rounded-xl shadow-lg border border-green-100 bg-white transform hover:scale-[1.02] transition duration-300">
              <Wind className="h-6 w-6 text-green-500 mb-2" />
              <div className="text-3xl font-extrabold text-green-700">Good (45)</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Air Quality Index</div>
            </Card>
            {/* Card 3: Traffic (Mock Data) */}
            <Card className="p-4 flex flex-col items-start rounded-xl shadow-lg border border-yellow-100 bg-white transform hover:scale-[1.02] transition duration-300 hidden sm:flex">
              <Car className="h-6 w-6 text-yellow-600 mb-2" />
              <div className="text-3xl font-extrabold text-yellow-700">Low</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Current Traffic Level</div>
            </Card>
            {/* Card 4: Weather/Sun (Mock Data) */}
            <Card className="p-4 flex flex-col items-start rounded-xl shadow-lg border border-blue-100 bg-white transform hover:scale-[1.02] transition duration-300 hidden md:flex">
              <Sun className="h-6 w-6 text-blue-500 mb-2" />
              <div className="text-3xl font-extrabold text-blue-700">75°F</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Current Temperature</div>
            </Card>
          </div>
        </section>

        <hr className="border-t border-gray-200" />

        {/* Alerts Feed */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-700">
            <TrendingUp className="h-5 w-5" />
            Live Activity Feed
          </h2>

          {/* Loading/Empty State */}
          {loading ? (
            <Card className="p-6 text-center rounded-xl shadow-sm border-2 border-dashed border-gray-200">
              <p className="text-gray-500 flex items-center justify-center gap-2"><div className="animate-spin h-4 w-4 border-t-2 border-indigo-500 rounded-full"></div> Fetching critical updates...</p>
            </Card>
          ) : alerts.length === 0 ? (
            <Card className="p-6 text-center rounded-xl shadow-sm border-2 border-dashed border-gray-200">
              <p className="text-gray-500">All clear! No recent alerts at this time.</p>
            </Card>
          ) : (
            
            // Alert Cards
            <div className="space-y-3">
              {alerts.map((alert) => {
                const Icon = getAlertIcon(alert.type);
                const isUnread = !alert.is_read;
                const cardClass = isUnread 
                  ? 'border-l-4 border-red-500 bg-white shadow-xl hover:shadow-2xl' // Highlight unread
                  : 'border-l-4 border-gray-100 bg-gray-50 shadow-md hover:bg-white'; // Subdued read alerts

                return (
                  <Card key={alert.id} className={`p-5 rounded-xl transition duration-300 ${cardClass}`}>
                    <div className="flex items-start gap-4">
                      {/* Icon with colored background */}
                      <div className={`p-3 rounded-full ${isUnread ? 'bg-red-100' : 'bg-indigo-100'} flex-shrink-0`}>
                        <Icon className={`h-6 w-6 ${isUnread ? 'text-red-600' : 'text-indigo-600'}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          {/* Title and Severity Badge */}
                          <h3 className={`font-bold text-lg ${isUnread ? 'text-gray-900' : 'text-gray-600'} truncate`}>
                            {alert.title}
                          </h3>
                          <Badge className={`uppercase text-xs font-semibold px-2 py-0.5 ml-2 ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </Badge>
                        </div>
                        
                        {/* Message with more contrast */}
                        <p className={`text-sm ${isUnread ? 'text-gray-700 font-medium' : 'text-gray-500'} mb-2`}>
                          {alert.message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                        </p>
                        
                        {/* Meta Data */}
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1 font-medium text-gray-500">
                            <MapPin className="h-3 w-3" />
                            {alert.zone}
                          </span>
                          <span className="text-xs text-gray-400">
                            <Bell className="h-3 w-3 inline mr-1"/>
                            {formatTimeAgo(alert.created_at)}
                          </span>
                        </div>
                        
                        {/* Mark as Read Button */}
                        {isUnread && (
                          <Button 
                            size="sm" 
                            variant="link" // Use link variant for less distraction
                            className="mt-2 text-red-500 hover:text-red-700 h-6 p-0"
                            onClick={() => markAsRead(alert.id)}
                          >
                            Dismiss Alert
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Bottom Nav (Unchanged as it's an external component) */}
      <BottomNav />
    </div>
  );
}