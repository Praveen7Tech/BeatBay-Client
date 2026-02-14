import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { formatRelativeTime } from "@/core/utils/formatTime";
import { Notification } from "../../slice/notificationSlice";


export const NotificationDropdown = () => {
  //const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [open, setOpen] = useState(false);

  const notifi = useSelector((state: RootState)=> state.notification)
  const notifications = notifi.list
  const unreadCount = notifi.unreadCount

  //const unreadCount = notifications.filter((n) => !n.isRead).length;

//   const markAsRead = (id: string) => {
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
//     );
//   };

//   const markAllAsRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//   };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-10 h-7 text-muted-foreground hover: transition-colors" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-0.5 -right-0.5 h-6 min-w-6 px-1 font-bold flex items-center justify-center bg-primary text-primary-foreground border-none">
              {unreadCount}
            </Badge>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-96 p-0 bg-card border-border rounded-xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              //onClick={markAllAsRead}
              className="text-xs text-primary hover:text-primary/80 h-auto py-1 px-2"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notification List */}
        <ScrollArea className="h-[400px]">
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                //onMarkAsRead={markAsRead}
              />
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
    console.log("sender", notification)
  const initials = (notification?.senderName || "??")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-secondary/10 ${
        !notification?.isRead ? "bg-primary/5" : ""
      }`}
    >
      {/* Unread dot */}
      <div className="pt-2 w-2 shrink-0">
        {!notification?.isRead && (
          <div className="h-2 w-2 rounded-full bg-primary" />
        )}
      </div>

      {/* Avatar */}
      <Avatar className="h-9 w-9 shrink-0">
        {notification?.senderImage && (
          <AvatarImage src={notification.senderImage} alt={notification.senderImage} />
        )}
        <AvatarFallback className="bg-muted text-muted-foreground text-xs">
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug">
          <span className="font-semibold">{notification.senderName}</span>{" "}
          <span className="text-muted-foreground">{notification.message}</span>
        </p>
        <span className="text-xs text-muted-foreground mt-1 block">
           {formatRelativeTime(notification.time)}
        </span>
      </div>

      {/* Mark as read */}
      {!notification?.isRead && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMarkAsRead(notification.id);
          }}
          className="shrink-0 p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
          aria-label="Mark as read"
          title="Mark as read"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
