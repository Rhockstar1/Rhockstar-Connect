import PostComposer from "@/components/feed/PostComposer";
import PostCard from "@/components/feed/PostCard";

export default function FeedPage() {
  const dummyPosts = [
    {
      id: 1,
      user: {
        name: "Jane Doe",
        handle: "@janed",
        avatar: "JD"
      },
      content: "Just launched the new version of our app! The Neomorphic design system looks absolutely incredible. 🚀\n\nMassive shoutout to the engineering team for pulling this off in record time.",
      timeAgo: "2 hours ago",
      likes: 124,
      comments: 18
    },
    {
      id: 2,
      user: {
        name: "Marcus Johnson",
        handle: "@marcusj",
        avatar: "MJ"
      },
      content: "Looking for a Senior Frontend Developer to join my team at TechCorp. We're building the future of decentralized finance. \n\nMust have 5+ years of React/Next.js experience. DM me if you're interested! 💼",
      timeAgo: "5 hours ago",
      likes: 89,
      comments: 34
    },
    {
      id: 3,
      user: {
        name: "Sarah Chen",
        handle: "@sarahcodes",
        avatar: "SC"
      },
      content: "Does anyone else find themselves completely rewriting their CSS architecture every 6 months? Tailwind v4 is definitely a game changer though.",
      timeAgo: "1 day ago",
      likes: 256,
      comments: 42
    }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Your Feed</h1>
        <p className="text-slate-400 text-lg">Stay updated with your professional network.</p>
      </div>
      
      {/* Post Composer */}
      <PostComposer />
      
      {/* Feed Timeline */}
      <div className="flex flex-col">
        {dummyPosts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
