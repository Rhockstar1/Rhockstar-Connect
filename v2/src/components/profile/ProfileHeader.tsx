"use client";

import { MapPin, Briefcase, Link as LinkIcon, Calendar, CheckCircle2, Pencil } from "lucide-react";
import Image from "next/image";

interface ProfileHeaderProps {
  onEditClick: () => void;
}

export default function ProfileHeader({ onEditClick }: ProfileHeaderProps) {
  // Mock data for now until we hook up the Firestore listener
  const user = {
    fullName: "Elijah Peter",
    username: "elijah_p",
    headline: "Founder at Code Dynasty ICT Solutions | Full Stack Developer",
    location: "Lagos, Nigeria",
    website: "https://codedynasty.com",
    joined: "June 2026",
    isVerified: true,
    stats: {
      posts: 42,
      followers: 1250,
      connections: 500,
      views: 3400
    }
  };

  return (
    <div className="neo-card p-0 overflow-hidden flex flex-col mb-6">
      {/* Cover Photo */}
      <div className="h-48 w-full bg-gradient-to-r from-primary to-accent relative">
        <button className="absolute top-4 right-4 neo-button-primary bg-white/20 backdrop-blur-md text-white border-white/40 shadow-none hover:bg-white/30 text-sm py-1 px-3">
          Update Cover
        </button>
      </div>

      <div className="px-6 pb-6 relative">
        {/* Avatar */}
        <div className="absolute -top-16 left-6 rounded-full p-1 bg-surface shadow-md">
          <div className="w-32 h-32 rounded-full bg-primary-light flex items-center justify-center text-white text-4xl font-bold relative overflow-hidden border-4 border-surface">
            EP
            {/* In a real app, this would be an <Image> tag if they have a photo */}
          </div>
          <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-surface shadow-md flex items-center justify-center text-secondary hover:text-brand transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-4 pb-2">
          <button 
            onClick={onEditClick}
            className="neo-button text-sm"
          >
            Edit Profile
          </button>
        </div>

        {/* User Info */}
        <div className="mt-2 flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {user.fullName}
              {user.isVerified && <CheckCircle2 className="w-5 h-5 text-success" />}
            </h1>
            <p className="text-secondary font-medium">@{user.username}</p>
          </div>

          <p className="text-primary text-lg">{user.headline}</p>

          <div className="flex flex-wrap gap-4 text-sm text-secondary">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {user.location}
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" /> Available for work
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" /> 
              <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                {user.website.replace("https://", "")}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Joined {user.joined}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-t border-border bg-surface-raised flex px-6 py-4 justify-between text-center sm:justify-start sm:gap-12">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-primary">{user.stats.followers.toLocaleString()}</span>
          <span className="text-xs text-secondary uppercase font-medium">Followers</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-primary">{user.stats.connections.toLocaleString()}</span>
          <span className="text-xs text-secondary uppercase font-medium">Connections</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-primary">{user.stats.posts.toLocaleString()}</span>
          <span className="text-xs text-secondary uppercase font-medium">Posts</span>
        </div>
        <div className="flex flex-col hidden sm:flex">
          <span className="text-xl font-bold text-primary">{user.stats.views.toLocaleString()}</span>
          <span className="text-xs text-secondary uppercase font-medium">Profile Views</span>
        </div>
      </div>
    </div>
  );
}
