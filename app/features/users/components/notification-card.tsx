import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Link } from "react-router";

interface NotificationCardProps {
  avatarUrl: string;
  avatarFallback: string;
  username: string;
  type: "follow" | "review" | "reply";
  productName?: string;
  postTitle?: string;
  timestamp: string;
  seen: boolean;
  payloadId?: number;
}

export function NotificationCard({
  avatarUrl,
  avatarFallback,
  username,
  type,
  productName,
  postTitle,
  timestamp,
  seen,
  payloadId,
}: NotificationCardProps) {
  const getMessage = (type: "follow" | "review" | "reply") => {
    switch (type) {
      case "follow":
        return " followed you";
      case "review":
        return " reviewed your product: ";
      case "reply":
        return " replied to your post: ";
    }
  };
  return (
    <Card className={cn("min-w-[450px]", seen ? "" : "bg-yellow-200/50")}>
      <CardHeader className="flex flex-row gap-4 items-start">
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span className="font-medium">{username}</span>
            <span> {getMessage(type)}</span>
            {productName && (
              <Button variant={"ghost"} asChild className="text-lg">
                <Link to={`/products/${payloadId}`}>{productName}</Link>
              </Button>
            )}
            {postTitle && (
              <Button variant={"ghost"} asChild className="text-lg">
                <Link to={`/community/${payloadId}`}>{postTitle}</Link>
              </Button>
            )}
          </CardTitle>
          <small className="text-muted-foreground text-sm">{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="icon" onClick={() => {}}>
          <EyeIcon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
