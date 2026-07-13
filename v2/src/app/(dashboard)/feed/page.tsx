export default function FeedPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div className="neo-card">
        <h1 className="text-2xl font-bold mb-2">Feed</h1>
        <p className="text-secondary">Welcome to your dashboard feed.</p>
      </div>
      
      {/* Post Composer Placeholder */}
      <div className="neo-card-sm flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-light flex-shrink-0" />
          <input 
            type="text" 
            className="neo-input" 
            placeholder="What's on your mind, Elijah?" 
          />
        </div>
        <div className="flex justify-end pt-2 border-t border-border mt-2">
          <button className="neo-button neo-button-primary text-sm">Post</button>
        </div>
      </div>
      
      {/* Post Placeholder */}
      <div className="neo-card-sm flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-semibold">Jane Doe</span>
            <span className="text-xs text-tertiary">2 hours ago</span>
          </div>
        </div>
        <p className="text-primary">
          Just launched the new version of our app! The neomorphic design system looks incredible. 🚀
        </p>
        <div className="flex gap-4 pt-3 border-t border-border text-sm text-secondary font-medium">
          <button className="hover:text-brand transition-colors">Like</button>
          <button className="hover:text-brand transition-colors">Comment</button>
          <button className="hover:text-brand transition-colors">Share</button>
        </div>
      </div>
    </div>
  );
}
