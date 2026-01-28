import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ProfileSection() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 bg-white p-8 border border-zinc-200 rounded-sm shadow-sm">
      <SectionHeading>Public Profile</SectionHeading>
      
      <div className="space-y-8">
        <div>
          <label className="block text-xs font-bold uppercase mb-3 tracking-wider text-zinc-500">Profile Picture</label>
          <div className="w-32 h-32 border border-zinc-200 rounded-sm flex items-center justify-center cursor-pointer hover:bg-zinc-50 transition-all bg-zinc-50/50 group relative overflow-hidden">
            <div className="text-center p-4">
              <span className="text-zinc-400 font-bold text-[10px] block uppercase">Change Photo</span>
            </div>
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <Input 
            label="Username"
            defaultValue="phupham"
            placeholder="Username"
          />
          <Input 
            label="Display Name"
            defaultValue="Phu Pham"
            placeholder="Display Name"
          />
          <div className="md:col-span-2">
            <Input 
              label="Email Address"
              type="email"
              defaultValue="contact@lfweb.com"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-100">
          <Button>
            Update Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
