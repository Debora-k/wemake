import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { EyeIcon, DotIcon, HeartIcon, LockIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface IdeaCardProps {
  id: number;
  title: string;
  viewsCount?: number;
  likesCount?: number;
  createdAt?: string;
  claimed?: boolean;
  owner?: boolean;
}

export function IdeaCard({
  id,
  title,
  viewsCount,
  likesCount,
  createdAt,
  claimed,
  owner,
}: IdeaCardProps) {
  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader>
        <Link to={claimed || owner ? "" : `/ideas/${id}`}>
          <CardTitle className="text-xl">
            <span
              className={cn(
                claimed
                  ? "bg-muted-foreground break-all selection:bg-muted-foreground text-muted-foreground"
                  : ""
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      {owner ? null : (
        <CardContent className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>{viewsCount}</span>
          </div>
          <DotIcon className="w-4 h-4" />
          {createdAt ? (
            <span>{DateTime.fromISO(createdAt).toRelative()}</span>
          ) : null}
        </CardContent>
      )}
      <CardFooter className="flex justify-end gap-2">
        {!claimed && !owner ? (
          <>
            <Button variant="outline">
              <HeartIcon className="w-4 h-4" />
              <span>{likesCount}</span>
            </Button>
            <Button asChild>
              <Link to={`/ideas/${id}/claim`}>Claim idea now &rarr;</Link>
            </Button>
          </>
        ) : (
          <Button variant="outline" className="cursor-not-allowed">
            <LockIcon className="size-4" />
            Claimed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
