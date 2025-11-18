import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, LogOut, FileText, Settings, ChevronRight, MapPin, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define the shape of the Report data for type safety
interface Report {
    id: string;
    ticket_id: string;
    status: 'pending' | 'in_progress' | 'resolved';
    category: string;
    created_at: string;
}

export default function Profile() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
    loadReports();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    setProfile(data);
  };

  const loadReports = async () => {
    if (!user) return;
    setLoadingReports(true);
    
    const { data } = await supabase
      .from('reports')
      .select('id, ticket_id, status, category, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);
    
    setReports((data as Report[]) || []);
    setLoadingReports(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  // Helper function to get color based on status
  const getStatusStyle = (status: Report['status']) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700 font-semibold';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700 font-semibold';
      case 'pending':
      default: return 'bg-blue-100 text-blue-700 font-semibold';
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };


  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      
      {/* 👤 Header - Strong, clean, and distinct */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white p-6 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-1">My Profile</h1>
          <p className="text-indigo-200">Account and Activity Management</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Profile Info Card - Elevated and visual */}
        <Card className="p-6 rounded-xl shadow-lg bg-white border border-gray-100">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
            {/* Avatar Placeholder */}
            <div className="w-20 h-20 bg-indigo-50 border-2 border-indigo-200 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-10 w-10 text-indigo-600" />
            </div>
            {/* User Details */}
            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-gray-900 truncate">
                {profile?.full_name || 'Citizen'}
              </h2>
              <p className="text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          {/* User Metrics / Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile?.home_zone && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                <div>
                  <span className="text-xs text-gray-500 block">Home Zone</span>
                  <span className="font-semibold text-gray-800">{profile.home_zone}</span>
                </div>
              </div>
            )}
            {profile?.commute_pattern && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-500 flex-shrink-0" />
                <div>
                  <span className="text-xs text-gray-500 block">Commute Pattern</span>
                  <span className="font-semibold text-gray-800">{profile.commute_pattern}</span>
                </div>
              </div>
            )}
            {profile?.age && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-pink-500 flex-shrink-0" />
                <div>
                  <span className="text-xs text-gray-500 block">Age</span>
                  <span className="font-semibold text-gray-800">{profile.age}</span>
                </div>
              </div>
            )}
          </div>

        </Card>

        {/* Recent Reports Card - Structured and action-oriented */}
        <Card className="p-6 rounded-xl shadow-lg bg-white">
          <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="h-6 w-6 text-indigo-600" />
              Recent Activity
            </h3>
            {/* Action to see all reports */}
            <Button variant="link" size="sm" className="text-indigo-600 font-medium hover:text-indigo-700">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          {loadingReports ? (
              <p className="text-gray-500 text-center py-4">Loading reports...</p>
          ) : reports.length === 0 ? (
            <p className="text-gray-500 text-center py-4">You haven't submitted any reports yet.</p>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <div 
                  key={report.id} 
                  className="p-4 bg-white hover:bg-indigo-50 rounded-lg border border-gray-100 transition duration-200 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 truncate">{report.category}</span>
                        <span className="text-xs text-gray-400">TICKET ID: {report.ticket_id}</span>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      {/* Status Badge */}
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${getStatusStyle(report.status)}`}>
                        {report.status.replace('_', ' ')}
                      </span>
                      {/* Date */}
                      <span className="text-xs text-gray-400 mt-1">
                        {formatDate(report.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Actions - Clear, full-width buttons */}
        <div className="space-y-3 pt-2">
          <Button 
            variant="outline" 
            className="w-full justify-start py-6 text-lg border-gray-300 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
            onClick={() => toast.info('Account settings page coming soon!')}
          >
            <Settings className="h-5 w-5 mr-3" />
            Account Settings
            <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
          </Button>
          <Button 
            variant="destructive" 
            className="w-full justify-start py-6 text-lg bg-red-600 hover:bg-red-700 transition"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}