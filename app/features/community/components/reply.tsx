import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { MessageCircleIcon } from "lucide-react";
import { Form, Link } from "react-router";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";

interface ReplyProps {
  content: string;
  username: string;
  avatarUrl: string | null;
  timestamp: string;
  topLevel: boolean;
  replies?: {
    post_reply_id: number;
    reply: string;
    created_at: string;
    user: {
      name: string;
      avatar: string | null;
      username: string;
    };
  }[];
}

export function Reply({
  content,
  username,
  avatarUrl,
  timestamp,
  topLevel,
  replies,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplies = () => {
    setReplying((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-5 items-start w-2/3">
        <Avatar className="size-14">
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex items-center gap-2">
            <Link to={`users/@${username}`}>
              <h4 className="font-medium">{username}</h4>
            </Link>
            <span className="text-xs text-muted-foreground">
              {DateTime.fromISO(timestamp).toRelative()}
            </span>
          </div>
          <p className="text-muted-foreground">{content}</p>
          <Button
            variant="outline"
            className="self-end"
            onClick={toggleReplies}
          >
            <MessageCircleIcon className="size-4" />
            Reply
          </Button>
        </div>
      </div>{" "}
      {replying && (
        <Form className="flex items-start gap-5 w-3/4">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/debora-k.png" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-end gap-5 w-full">
            <Textarea
              placeholder="Add a reply"
              className="w-full resize-none"
              rows={3}
            />
            <Button>Reply</Button>
          </div>
        </Form>
      )}
      {topLevel && replies && (
        <div className="pl-20 w-full">
          {replies.map((reply) => (
            <Reply
              content={reply.reply}
              username={reply.user.name}
              avatarUrl={reply.user.avatar}
              timestamp={reply.created_at}
              topLevel={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
