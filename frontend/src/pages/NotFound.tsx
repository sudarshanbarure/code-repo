import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Frown, ArrowLeft, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming a Button component is available

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log the error path for internal tracking/debugging
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    // Optionally, send a report to an error tracking service here (e.g., Sentry, Toast)
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-4">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        
        {/* 🚨 Status Icon */}
        <div className="flex justify-center mb-6">
          <Frown className="h-16 w-16 text-red-500 animate-bounce-slow" />
        </div>

        {/* 🛑 Status Code & Title */}
        <h1 className="mb-2 text-6xl font-extrabold text-indigo-700">
          404
        </h1>
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        
        {/* 📝 Descriptive Message */}
        <p className="mb-8 text-lg text-gray-600">
          We looked everywhere, but it seems the page at <code className="bg-gray-100 p-1 rounded text-sm font-mono text-indigo-600">{location.pathname}</code> does not exist or has been moved.
        </p>

        {/* 💡 Helpful Suggestion (UX) */}
        <div className="mb-8 p-3 bg-yellow-50 text-yellow-800 rounded-lg flex items-start text-sm">
            <Lightbulb className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
            <p>
                **Tip:** Double-check the URL for typos, or try using the navigation links below.
            </p>
        </div>

        {/* 🏠 Call to Action (Improved UX) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild // Use asChild if you have a routing Link component
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-3 rounded-xl transition hover:scale-[1.03] shadow-md"
          >
            <Link to="/">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Go to Homepage
            </Link>
          </Button>
          
          {/* Secondary Action */}
          <Button 
            asChild
            variant="outline"
            className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-lg px-8 py-3 rounded-xl transition"
          >
            <Link to="/services">
                View Services
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default NotFound;