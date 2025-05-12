
import React, { useState } from "react";
import { Heart, MessageCircle, Share, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBenchLikes } from "@/hooks/useBenchLikes";
import { useAuth } from "@/contexts/AuthContext";

type BenchCardProps = {
  id: string;
  imageUrl: string;
  description: string;
  location: string;
  likes: number;
  comments: number;
  username: string;
  userAvatar: string;
  createdAt: string;
  isLiked: boolean;
  onLikeToggle?: (benchId: string, isLiked: boolean) => void;
};

const BenchCard = ({
  id,
  imageUrl,
  description,
  location,
  likes,
  comments,
  username,
  userAvatar,
  createdAt,
  isLiked,
  onLikeToggle,
}: BenchCardProps) => {
  const { toggleLike, isLiking } = useBenchLikes();
  const { user } = useAuth();
  const [optimisticLiked, setOptimisticLiked] = useState(isLiked);
  const [optimisticLikes, setOptimisticLikes] = useState(likes);
  
  const handleLikeClick = async () => {
    if (!user) return;
    
    // Optimistic UI update
    const newLikedState = !optimisticLiked;
    setOptimisticLiked(newLikedState);
    setOptimisticLikes(prev => newLikedState ? prev + 1 : prev - 1);
    
    // Call the API
    const result = await toggleLike(id, optimisticLiked);
    
    if (result.success) {
      // Notify parent component about the change
      if (onLikeToggle) {
        onLikeToggle(id, result.liked);
      }
    } else {
      // Revert optimistic update if the API call failed
      setOptimisticLiked(optimisticLiked);
      setOptimisticLikes(likes);
    }
  };

  return (
    <div className="bench-card mb-6 animate-fade-in">
      <div className="p-3 flex items-center space-x-2">
        <div 
          className="w-8 h-8 rounded-full bg-cover bg-center" 
          style={{ backgroundImage: `url(${userAvatar})` }}
        />
        <div className="flex-1">
          <p className="font-medium text-sm">{username}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin size={12} className="mr-1" />
            <span>{location}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <span className="sr-only">Menu</span>
          <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 1.5C2 2.05228 1.55228 2.5 1 2.5C0.447715 2.5 0 2.05228 0 1.5C0 0.947715 0.447715 0.5 1 0.5C1.55228 0.5 2 0.947715 2 1.5Z" fill="currentColor" />
            <path d="M8 1.5C8 2.05228 7.55228 2.5 7 2.5C6.44772 2.5 6 2.05228 6 1.5C6 0.947715 6.44772 0.5 7 0.5C7.55228 0.5 8 0.947715 8 1.5Z" fill="currentColor" />
            <path d="M14 1.5C14 2.05228 13.5523 2.5 13 2.5C12.4477 2.5 12 2.05228 12 1.5C12 0.947715 12.4477 0.5 13 0.5C13.5523 0.5 14 0.947715 14 1.5Z" fill="currentColor" />
          </svg>
        </Button>
      </div>
      <div className="aspect-square bg-muted">
        <img
          src={imageUrl}
          alt="Bench"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 ${optimisticLiked ? 'text-red-500' : 'text-park-charcoal hover:text-park-teal'}`}
            onClick={handleLikeClick}
            disabled={isLiking || !user}
          >
            <Heart size={24} fill={optimisticLiked ? "currentColor" : "none"} />
            <span className="sr-only">Like</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-park-charcoal hover:text-park-teal">
            <MessageCircle size={24} />
            <span className="sr-only">Comment</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-park-charcoal hover:text-park-teal">
            <Share size={24} />
            <span className="sr-only">Share</span>
          </Button>
        </div>
        <p className="font-medium text-sm mt-2">{optimisticLikes} likes</p>
        <div className="mt-1">
          <span className="font-medium text-sm">{username}</span>{" "}
          <span className="text-sm">{description}</span>
        </div>
        {comments > 0 && (
          <button className="text-muted-foreground text-sm mt-1">
            View all {comments} comments
          </button>
        )}
        <p className="text-xs text-muted-foreground mt-2">{createdAt}</p>
      </div>
    </div>
  );
};

export default BenchCard;
