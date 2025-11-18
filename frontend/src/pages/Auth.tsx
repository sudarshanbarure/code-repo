// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { toast } from 'sonner';
// import { z } from 'zod';

// const loginSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters')
// });

// const signupSchema = loginSchema.extend({
//   fullName: z.string().min(2, 'Name must be at least 2 characters'),
//   age: z.number().min(13, 'You must be at least 13 years old'),
//   commutePattern: z.string().min(1, 'Please select your commute pattern')
// });

// export default function Auth() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const { signUp, signIn } = useAuth();
//   const navigate = useNavigate();

//   // Login form state
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // Signup form state
//   const [signupEmail, setSignupEmail] = useState('');
//   const [signupPassword, setSignupPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [age, setAge] = useState('');
//   const [commutePattern, setCommutePattern] = useState('');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       loginSchema.parse({ email, password });
//       setLoading(true);

//       const { error } = await signIn(email, password);

//       if (error) {
//         toast.error(error.message);
//       } else {
//         toast.success('Welcome back!');
//         navigate('/home');
//       }
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         toast.error(error.errors[0].message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       const ageNum = parseInt(age);
//       signupSchema.parse({ 
//         email: signupEmail, 
//         password: signupPassword, 
//         fullName,
//         age: ageNum,
//         commutePattern 
//       });

//       setLoading(true);

//       const { error } = await signUp(signupEmail, signupPassword, {
//         full_name: fullName,
//         age: ageNum,
//         commute_pattern: commutePattern,
//         home_zone: 'Downtown' // Default zone
//       });

//       if (error) {
//         toast.error(error.message);
//       } else {
//         toast.success('Account created successfully!');
//         navigate('/home');
//       }
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         toast.error(error.errors[0].message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-info/5">
//       <Card className="w-full max-w-md p-6 shadow-xl">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold mb-2">CitizenHub</h1>
//           <p className="text-muted-foreground">Access your city services</p>
//         </div>

//         <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(v) => setIsLogin(v === 'login')}>
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="login">Sign In</TabsTrigger>
//             <TabsTrigger value="signup">Sign Up</TabsTrigger>
//           </TabsList>

//           <TabsContent value="login">
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="your@email.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? 'Signing in...' : 'Sign In'}
//               </Button>
//             </form>
//           </TabsContent>

//           <TabsContent value="signup">
//             <form onSubmit={handleSignup} className="space-y-4">
//               <div>
//                 <Label htmlFor="fullName">Full Name</Label>
//                 <Input
//                   id="fullName"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   placeholder="John Doe"
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="signupEmail">Email</Label>
//                 <Input
//                   id="signupEmail"
//                   type="email"
//                   value={signupEmail}
//                   onChange={(e) => setSignupEmail(e.target.value)}
//                   placeholder="your@email.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="signupPassword">Password</Label>
//                 <Input
//                   id="signupPassword"
//                   type="password"
//                   value={signupPassword}
//                   onChange={(e) => setSignupPassword(e.target.value)}
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="age">Age</Label>
//                 <Input
//                   id="age"
//                   type="number"
//                   value={age}
//                   onChange={(e) => setAge(e.target.value)}
//                   placeholder="25"
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="commute">Commute Pattern</Label>
//                 <select
//                   id="commute"
//                   value={commutePattern}
//                   onChange={(e) => setCommutePattern(e.target.value)}
//                   className="w-full h-10 px-3 rounded-md border border-input bg-background"
//                   required
//                 >
//                   <option value="">Select...</option>
//                   <option value="Public Transit">Public Transit</option>
//                   <option value="Car">Car</option>
//                   <option value="Bike">Bike</option>
//                   <option value="Walk">Walk</option>
//                 </select>
//               </div>
//               <Button type="submit" className="w-full" disabled={loading}>
//                 {loading ? 'Creating account...' : 'Create Account'}
//               </Button>
//             </form>
//           </TabsContent>
//         </Tabs>
//       </Card>
//     </div>
//   );
// }
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(13, 'You must be at least 13 years old'),
  commutePattern: z.string().min(1, 'Please select your commute pattern')
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [commutePattern, setCommutePattern] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loginSchema.parse({ email, password });
      setLoading(true);
      const { error } = await signIn(email, password);
      if (error) toast.error(error.message);
      else {
        toast.success('Welcome back!');
        navigate('/home');
      }
    } catch (error) {
      if (error instanceof z.ZodError) toast.error(error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ageNum = parseInt(age);
      signupSchema.parse({ email: signupEmail, password: signupPassword, fullName, age: ageNum, commutePattern });
      setLoading(true);
      const { error } = await signUp(signupEmail, signupPassword, {
        full_name: fullName,
        age: ageNum,
        commute_pattern: commutePattern,
        home_zone: 'Downtown'
      });
      if (error) toast.error(error.message);
      else {
        toast.success('Account created successfully!');
        navigate('/home');
      }
    } catch (error) {
      if (error instanceof z.ZodError) toast.error(error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/city-bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <Card className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/80 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 tracking-tight">CitizenHub</h1>
          <p className="text-gray-600 text-sm">Access your city services</p>
        </div>

        <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(v) => setIsLogin(v === 'login')}>
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-indigo-100 rounded-full p-1">
            <TabsTrigger value="login" className="rounded-full py-2 text-indigo-700 font-semibold">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="rounded-full py-2 text-indigo-700 font-semibold">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="rounded-lg shadow-sm"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-lg shadow-sm"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-2 rounded-full hover:scale-105 transition-transform" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="rounded-lg shadow-sm"
                  required
                />
              </div>
              <div>
                <Label htmlFor="signupEmail">Email</Label>
                <Input
                  id="signupEmail"
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="rounded-lg shadow-sm"
                  required
                />
              </div>
              <div>
                <Label htmlFor="signupPassword">Password</Label>
                <Input
                  id="signupPassword"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-lg shadow-sm"
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  className="rounded-lg shadow-sm"
                  required
                />
              </div>
              <div>
                <Label htmlFor="commute">Commute Pattern</Label>
                <select
                  id="commute"
                  value={commutePattern}
                  onChange={(e) => setCommutePattern(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white shadow-sm"
                  required
                >
                  <option value="">Select...</option>
                  <option value="Public Transit">Public Transit</option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Walk">Walk</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold py-2 rounded-full hover:scale-105 transition-transform" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
