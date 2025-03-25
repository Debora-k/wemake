import { Link } from "react-router";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { ChevronUpIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface PostCardProps {
  id: number;
  title: string;
  author: string;
  authorAvatar: string | null;
  category: string;
  createdAt: string;
  expended?: boolean;
  votesCount?: number;
  isUpvoted?: boolean;
}

export function PostCard({
  id,
  title,
  author,
  authorAvatar,
  category,
  createdAt,
  expended = false,
  votesCount = 0,
  isUpvoted = false,
}: PostCardProps) {
  return (
    <Link to={`/community/${id}`} className="block">
      <Card
        className={cn(
          "bg-transparent hover:bg-card/50 transition-colors",
          expended ? "flex flex-row items-center justify-between" : ""
        )}
      >
        <CardHeader className="flex flex-row items-center gap-2">
          <Avatar className="size-12">
            <AvatarFallback>{author[0]}</AvatarFallback>
            {authorAvatar && <AvatarImage src={authorAvatar} />}
          </Avatar>
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
              <span>
                {author} on {category}
              </span>
              <span>{DateTime.fromISO(createdAt).toRelative()}</span>
            </div>
          </div>
        </CardHeader>
        {!expended && (
          <CardFooter className="flex justify-end">
            <Button variant="link">Reply &rarr;</Button>
          </CardFooter>
        )}
        {expended && (
          <CardFooter className="flex justify-end pb-0">
            <Button
              variant="outline"
              className={cn(
                "flex flex-col h-14",
                isUpvoted ? "border-primary text-primary" : ""
              )}
            >
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{votesCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
