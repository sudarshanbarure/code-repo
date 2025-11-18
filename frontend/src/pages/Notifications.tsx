import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle2, AlertCircle, Info } from 'lucide-react';
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

export default function Notifications() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlerts();
  }, [user]);

  const loadAlerts = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load notifications');
    } else {
      setAlerts(data || []);
    }
    setLoading(false);
  };

  const markAsRead = async (alertId: string) => {
    await supabase
      .from('alerts')
      .update({ is_read: true })
      .eq('id', alertId);
    
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, is_read: true } : a));
  };

  const markAllAsRead = async () => {
    if (!user) return;

    await supabase
      .from('alerts')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);
    
    setAlerts(alerts.map(a => ({ ...a, is_read: true })));
    toast.success('All notifications marked as read');
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertCircle;
      case 'warning': return AlertCircle;
      default: return Info;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      default: return 'info';
    }
  };

  const unreadCount = alerts.filter(a => !a.is_read).length;

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">Notifications</h1>
              <p className="text-white/80">
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button 
                variant="secondary" 
                size="sm"
                onClick={markAllAsRead}
                className="bg-white text-indigo-700 hover:bg-indigo-100 transition"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark all read
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-4">
        {loading ? (
          <Card className="p-6 text-center rounded-xl shadow-sm">
            <p className="text-gray-500">Loading notifications...</p>
          </Card>
        ) : alerts.length === 0 ? (
          <Card className="p-12 text-center rounded-xl shadow-sm">
            <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2 text-indigo-700">No notifications yet</h3>
            <p className="text-gray-500">
              We'll notify you about important updates and alerts
            </p>
          </Card>
        ) : (
          alerts.map((alert) => {
            const Icon = getSeverityIcon(alert.severity);
            return (
              <Card 
                key={alert.id} 
                className={`p-5 rounded-xl shadow-md transition hover:shadow-lg ${
                  !alert.is_read ? 'border-l-4 border-indigo-500 bg-indigo-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    alert.severity === 'critical' 
                      ? 'bg-red-100' 
                      : alert.severity === 'warning'
                      ? 'bg-yellow-100'
                      : 'bg-blue-100'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      alert.severity === 'critical'
                        ? 'text-red-600'
                        : alert.severity === 'warning'
                        ? 'text-yellow-600'
                        : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-indigo-800">{alert.title}</h3>
                      <Badge variant={getSeverityColor(alert.severity) as any}>
                        {alert.severity}
                      </Badge>
                      {!alert.is_read && (
                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(alert.created_at).toLocaleString()}</span>
                      {!alert.is_read && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-indigo-600 hover:bg-indigo-100"
                          onClick={() => markAsRead(alert.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </main>

      <BottomNav />
    </div>
  );
}
