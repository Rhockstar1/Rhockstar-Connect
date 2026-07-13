"use client";

import { useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import EditProfileModal from "@/components/profile/EditProfileModal";
import { Plus } from "lucide-react";

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 relative">
      <ProfileHeader onEditClick={() => setIsEditModalOpen(true)} />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* About Section */}
          <div className="neo-card flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">About Me</h2>
              <button className="text-brand hover:bg-brand/10 p-2 rounded-full transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <p className="text-secondary leading-relaxed">
              Passionate full-stack developer with 5+ years of experience building scalable web applications. 
              Currently focused on creating the next generation of social networking platforms. 
              Always eager to learn new technologies and collaborate with brilliant minds.
            </p>
          </div>

          {/* Experience Section Placeholder */}
          <div className="neo-card flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Experience</h2>
              <button className="text-brand hover:bg-brand/10 p-2 rounded-full transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 border-b border-border pb-4">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex-shrink-0" />
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg">Founder & Lead Developer</h3>
                  <p className="text-brand font-medium">Code Dynasty ICT Solutions</p>
                  <p className="text-tertiary text-sm">Jan 2024 - Present • Lagos, Nigeria</p>
                  <p className="text-secondary mt-2 text-sm">Leading a team of developers to build innovative web and mobile solutions for clients worldwide.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Education Section Placeholder */}
          <div className="neo-card flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Education</h2>
              <button className="text-brand hover:bg-brand/10 p-2 rounded-full transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-surface-raised border border-border rounded-lg flex-shrink-0" />
              <div className="flex flex-col">
                <h3 className="font-bold text-lg">University of Technology</h3>
                <p className="text-primary font-medium">B.Sc. Computer Science</p>
                <p className="text-tertiary text-sm">2020 - 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar Content) */}
        <div className="flex flex-col gap-6">
          {/* Skills Section */}
          <div className="neo-card flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Skills</h2>
              <button className="text-brand hover:bg-brand/10 p-1 rounded-full transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Firebase', 'Tailwind CSS'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-surface-raised border border-border rounded-full text-sm font-medium text-secondary">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div className="neo-card flex flex-col gap-4">
            <h2 className="text-lg font-bold">Languages</h2>
            <div className="flex flex-col gap-2 text-secondary text-sm">
              <div className="flex justify-between">
                <span className="font-medium">English</span>
                <span className="text-tertiary">Native</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Yoruba</span>
                <span className="text-tertiary">Native</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
}
