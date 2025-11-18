// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';
// import { Bell, MapPin, Shield, Users } from 'lucide-react';
// import heroImage from '@/assets/hero-city.jpg';

// export default function Landing() {
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: Bell,
//       title: 'Real-time Alerts',
//       description: 'Stay informed about air quality, traffic, and utility updates in your area'
//     },
//     {
//       icon: MapPin,
//       title: 'Smart Navigation',
//       description: 'Get alternative routes and real-time traffic updates for your commute'
//     },
//     {
//       icon: Shield,
//       title: 'Report Issues',
//       description: 'Quickly report and track civic issues with photo uploads and geotagging'
//     },
//     {
//       icon: Users,
//       title: 'Community Services',
//       description: 'Access local hospitals, pharmacies, shelters, and community centers'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: `url(${heroImage})` }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
//         </div>
        
//         <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
//           <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-info">
//             CitizenHub
//           </h1>
//           <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto">
//             Your personal portal for city services, real-time alerts, and community engagement
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button 
//               size="lg" 
//               onClick={() => navigate('/auth')}
//               className="text-lg px-8 py-6"
//             >
//               Get Started
//             </Button>
//             <Button 
//               size="lg" 
//               variant="outline"
//               onClick={() => navigate('/auth')}
//               className="text-lg px-8 py-6"
//             >
//               Sign In
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-4">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-4xl font-bold text-center mb-4">
//             Everything You Need in One Place
//           </h2>
//           <p className="text-center text-muted-foreground mb-12 text-lg">
//             Access vital city services and stay informed about what matters most to you
//           </p>
          
//           <div className="grid md:grid-cols-2 gap-8">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <div 
//                   key={index}
//                   className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow"
//                 >
//                   <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
//                     <Icon className="h-6 w-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
//                   <p className="text-muted-foreground">{feature.description}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 bg-primary/5">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
//           <p className="text-xl text-muted-foreground mb-8">
//             Join thousands of citizens staying connected with their community
//           </p>
//           <Button 
//             size="lg"
//             onClick={() => navigate('/auth')}
//             className="text-lg px-8 py-6"
//           >
//             Create Your Account
//           </Button>
//         </div>
//       </section>
//     </div>
//   );
// }
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-city.jpg';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bell,
      title: 'Real-time Alerts',
      description: 'Stay ahead with instant updates on air quality, traffic, and city-wide notifications.'
    },
    {
      icon: MapPin,
      title: 'Smart Navigation',
      description: 'Navigate your city with live traffic insights and alternate route suggestions.'
    },
    {
      icon: Shield,
      title: 'Report Issues',
      description: 'Snap, tag, and report civic problems directly to local authorities.'
    },
    {
      icon: Users,
      title: 'Community Services',
      description: 'Find nearby hospitals, shelters, and community centers with ease.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 text-gray-900">
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 text-white drop-shadow-xl">
            Welcome to CitizenHub
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-10">
            Your gateway to smarter, safer, and more connected urban living.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white text-lg px-10 py-6 rounded-full shadow-xl hover:scale-105 transition-transform"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/auth')}
              className="border-white text-black text-lg px-10 py-6 rounded-full hover:bg-white/10 transition"
            >
              Sign In
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-6 text-indigo-700">
              Explore Our Features
            </h2>
            <p className="text-center text-gray-600 mb-14 text-lg">
              Empowering citizens with tools to stay informed, connected, and proactive.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-indigo-50 to-pink-100 border border-indigo-200 rounded-2xl p-8 hover:shadow-2xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="h-7 w-7 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-indigo-800">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold mb-6">Join the Movement</h2>
          <p className="text-xl mb-10">
            Be part of a smarter, safer, and more connected city experience.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-white text-indigo-700 text-lg px-10 py-6 font-semibold rounded-full shadow-md hover:bg-indigo-100 transition"
          >
            Create Your Account
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
