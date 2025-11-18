import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Camera, MapPin, CheckCircle2, Send, RotateCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming this utility exists or using a custom dropdown

export default function Report() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  // Define available categories
  const categories = [
    { value: 'pothole', label: 'Pothole / Road Damage' },
    { value: 'lighting', label: 'Street Lighting Outage' },
    { value: 'water_leak', label: 'Water Leak / Burst Pipe' },
    { value: 'waste', label: 'Illegal Dumping / Waste' },
    { value: 'graffiti', label: 'Graffiti / Vandalism' },
    { value: 'safety', label: 'Public Safety Hazard' },
    { value: 'other', label: 'Other Infrastructure' },
  ];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(e.target.files?.[0] || null);
  };
  
  const handlePhotoRemove = () => {
    setPhoto(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !category || !description || !address) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    setLoading(true);
    
    try {
      // 1. Upload photo first (implementation detail omitted, but conceptually necessary)
      // let photoUrl = '';
      // if (photo) {
      //   photoUrl = await uploadPhotoToStorage(photo); // placeholder function
      // }
      
      // 2. Create report
      const { data, error } = await supabase
        .from('reports')
        .insert([{
          user_id: user.id,
          category,
          description,
          location_address: address,
          status: 'submitted',
          // photo_url: photoUrl, // Placeholder for photo URL
          ticket_id: Math.random().toString(36).substring(2, 9).toUpperCase(), // Mock ticket ID
        }])
        .select()
        .single();

      if (error) throw error;

      setTicketId(data.ticket_id);
      setSubmitted(true);
      toast.success('Report submitted successfully! Thank you for helping your community.');
      
      // Reset form (done in the successful submission block)
      setCategory('');
      setDescription('');
      setAddress('');
      setPhoto(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- Submission Success View (Enhanced) ---
  if (submitted) {
    return (
      <div className="min-h-screen pb-20 bg-gray-50 flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full p-10 text-center rounded-2xl shadow-xl border border-green-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Mission Complete!</h2>
          <p className="text-gray-500 mb-6">
            Your report has been received and logged. We'll start reviewing it right away.
          </p>
          <div className="bg-green-50 p-5 rounded-xl border border-green-200 mb-8">
            <p className="text-sm text-green-700 mb-1 font-medium">Your Tracking ID</p>
            <p className="text-2xl font-mono font-extrabold text-green-800">{ticketId}</p>
          </div>
          <Button onClick={() => setSubmitted(false)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3 transition">
            Submit Another Report
          </Button>
        </Card>
        <BottomNav />
      </div>
    );
  }

  // --- Main Report Form View (Enhanced) ---
  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-6 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-1">Report a Civic Issue</h1>
          <p className="text-indigo-200">The first step to a better community starts here.</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6">
        <Card className="p-8 rounded-2xl shadow-lg bg-white">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Issue Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-lg font-semibold flex items-center gap-2">
                <span className="text-indigo-500">1.</span> What is the issue?
                <span className="text-red-500">*</span>
              </Label>
              {/* Using a custom Select component for better styling (assuming availability) */}
              <Select 
                value={category} 
                onValueChange={setCategory} 
                required
              >
                <SelectTrigger className="w-full h-12 text-base border-gray-300 focus:border-indigo-500">
                  <SelectValue placeholder="Select a specific category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 2. Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg font-semibold flex items-center gap-2">
                <span className="text-indigo-500">2.</span> Describe the details
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g., Large pothole near the main intersection, size 3 feet wide, causing traffic to swerve..."
                rows={5}
                required
                className="mt-2 text-base border-gray-300 focus:border-indigo-500"
              />
            </div>

            {/* 3. Location */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-lg font-semibold flex items-center gap-2">
                <span className="text-indigo-500">3.</span> Where is the problem?
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-indigo-500" />
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address or find current location (e.g., 123 Main St, near City Park)"
                  className="pl-10 h-12 text-base border-gray-300 focus:border-indigo-500"
                  required
                />
                {/* Geolocation Button Placeholder (UX Improvement) */}
                <Button variant="ghost" type="button" size="sm" className="absolute right-0 top-1/2 -translate-y-1/2 text-indigo-600 hover:bg-indigo-50/50">
                    Auto-Locate
                </Button>
              </div>
            </div>

            {/* 4. Photo Upload */}
            <div className="space-y-2">
              <Label htmlFor="photo" className="text-lg font-semibold flex items-center gap-2">
                <span className="text-indigo-500">4.</span> Add a Photo (Proof)
              </Label>
              <div className="relative">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  {photo ? (
                    <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                        <div className="flex items-center gap-3">
                            <Camera className="h-6 w-6 text-indigo-600" />
                            <span className="text-sm font-medium truncate">{photo.name}</span>
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={handlePhotoRemove}>
                            <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                    </div>
                  ) : (
                    <label htmlFor="photo" className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 hover:border-indigo-500 text-center rounded-xl p-10 cursor-pointer bg-indigo-50/30 transition">
                        <Camera className="h-10 w-10 mx-auto mb-2 text-indigo-600" />
                        <span className="text-lg font-medium text-indigo-700">Tap to Upload Image</span>
                        <p className="text-sm text-gray-500 mt-1">Accepts PNG, JPG. Max size 5MB.</p>
                    </label>
                  )}
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3 shadow-lg transition disabled:bg-indigo-400" 
              size="lg" 
              disabled={loading || !category || !description || !address}
            >
              {loading ? (
                <>
                  <RotateCw className="h-5 w-5 mr-2 animate-spin" />
                  Submitting Report...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Finalize and Submit
                </>
              )}
            </Button>
            <p className="text-center text-xs text-gray-400">
                By submitting this report, you agree to our community guidelines.
            </p>
          </form>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}