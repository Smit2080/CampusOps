import React from 'react';
import { Logo } from './Logo';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="text-white">
              <Logo className="text-white" />
            </div>
            <p className="text-sm leading-relaxed">
              Simplifying campus services digitally. One-click hub for students, staff, and administration.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">Features</a></li>
              <li><a href="#" className="hover:text-blue-400">Security</a></li>
              <li><a href="#" className="hover:text-blue-400">Team</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400">Guides</a></li>
              <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400"><Github size={20} /></a>
              <a href="#" className="hover:text-blue-400"><Twitter size={20} /></a>
              <a href="#" className="hover:text-blue-400"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 CampusOps. All rights reserved.</p>
          <p className="text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> for the Hackathon
          </p>
        </div>
      </div>
    </footer>
  );
}
