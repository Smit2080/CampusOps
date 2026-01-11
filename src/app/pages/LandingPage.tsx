import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Zap, Shield, Users, Search, BarChart3, Clock, Layout, Sparkles } from 'lucide-react';

export function LandingPage({ onNavigate }: { onNavigate: (view: string) => void }) {
  const features = [
    {
      name: 'Real-time Updates',
      description: 'Track the status of your requests instantly. No more guessing games.',
      icon: Zap,
    },
    {
      name: 'Secure & Private',
      description: 'Role-based access ensures data privacy for students and staff.',
      icon: Shield,
    },
    {
      name: 'AI Powered',
      description: 'Integrated Gemini AI helps route issues to the right department automatically.',
      icon: CheckCircle2,
    },
    {
      name: 'Community Focused',
      description: 'Built to foster a better living and learning environment for everyone.',
      icon: Users,
    },
  ];

  // Floating animation variants
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-32 lg:pt-32" id="home">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#eff6ff_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Animated floating elements */}
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-40 blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
          className="absolute top-40 right-20 w-32 h-32 bg-purple-100 rounded-full opacity-40 blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-emerald-100 rounded-full opacity-40 blur-xl"
        />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-6 cursor-default"
            >
              <Sparkles size={14} className="mr-1.5 animate-pulse" />
              New: Gemini AI Integration 🚀
            </motion.span>
            
            <motion.h1 
              className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Simplifying Campus Services, <br />
              <motion.span 
                className="text-blue-600 inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                Digitally
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              The one-stop hub for students, faculty, and administration to manage requests, issues, and services seamlessly. Powered by real-time updates and AI assistance.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex items-center justify-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={() => onNavigate('role-selection')}
                className="group rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </motion.button>
              <motion.button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-semibold leading-6 text-slate-900 hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Explore Features <span aria-hidden="true">→</span>
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Hero Image / Graphic */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 flow-root sm:mt-24 relative"
          >
            {/* Glowing pulse effect behind image */}
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-blue-400 rounded-2xl blur-3xl -z-10"
            />
            
            <motion.div 
              className="rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
               <motion.img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=2400&h=1200"
                alt="App screenshot"
                className="rounded-md shadow-2xl ring-1 ring-slate-900/10"
                width={2432}
                height={1442}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Explore Features Bar */}
      <div className="bg-blue-600 py-12" id="explore">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
             {[
               { icon: Search, label: "Smart Search" },
               { icon: Clock, label: "24/7 Access" },
               { icon: Layout, label: "Mobile First" },
               { icon: BarChart3, label: "Analytics" }
             ].map((item, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 whileHover={{ scale: 1.1, y: -5 }}
                 className="flex flex-col items-center gap-2 text-blue-100 cursor-default"
               >
                 <motion.div
                   whileHover={{ rotate: 360 }}
                   transition={{ duration: 0.5 }}
                 >
                   <item.icon size={32} className="text-white mb-2" />
                 </motion.div>
                 <span className="font-semibold">{item.label}</span>
               </motion.div>
             ))}
           </div>
        </div>
      </div>

      {/* About / Problem Solution */}
      <section className="bg-slate-50 py-24 sm:py-32" id="about">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl lg:text-center"
          >
            <motion.h2 
              className="text-base font-semibold leading-7 text-blue-600"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Why CampusOps?
            </motion.h2>
            <motion.p 
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Everything you need to run your campus smoothly
            </motion.p>
            <motion.p 
              className="mt-6 text-lg leading-8 text-slate-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Fragmented communication and manual paperwork slow down campus operations. CampusOps brings everything into one unified digital platform.
            </motion.p>
          </motion.div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl" id="features">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.name} 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="relative pl-16 group cursor-default"
                >
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <motion.div 
                      className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 group-hover:bg-blue-500 transition-colors"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </motion.div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-slate-600">{feature.description}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}