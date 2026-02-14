import { useState } from "react";
import { Bell, BellOff, Check } from "lucide-react";
import { Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { formatRelativeTime } from "@/core/utils/formatTime";
import { Notification } from "../../slice/notificationSlice";
import { useNotificationActions } from "@/core/hooks/notifications/useDeleteNotification";
import { AnimatePresence, motion } from "framer-motion";

export const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);

  const notifi = useSelector((state: RootState) => state.notification);
  const notifications = notifi.list;
  const unreadCount = notifi.unreadCount;
  const isDeleting = notifi.isDeleting

  const { handleMarkAsRead, handleMarkAllAsRead } = useNotificationActions();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-8 h-8 text-muted-foreground hover:transition-colors" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-[14px] font-bold flex items-center justify-center bg-primary text-primary-foreground border-none">
              {unreadCount}
            </Badge>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="relative w-96 p-0 bg-card border-border rounded-xl shadow-2xl"
      >
        {/* 🔥 Deleting Overlay with Animation */}
        <AnimatePresence>
          {isDeleting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-white font-medium">
                  Updating notifications...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">
            Notifications
          </h3>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-xs text-primary hover:text-primary/80 h-auto py-1 px-2"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notification List */}
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-center px-6">
              <BellOff className="h-12 w-12 text-muted-foreground animate-pulse" />

              <h4 className="mt-4 text-sm font-semibold text-foreground">
                No Notifications Yet
              </h4>

              <p className="text-xs text-muted-foreground mt-1">
                When someone interacts with you, it will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem = ({
  notification,
  onMarkAsRead,
}: NotificationItemProps) => {
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
      {/* Unread Dot */}
      <div className="pt-2 w-2 shrink-0">
        {!notification?.isRead && (
          <div className="h-2 w-2 rounded-full bg-primary" />
        )}
      </div>

      {/* Avatar */}
      <Avatar className="h-9 w-9 shrink-0">
        {notification?.senderImage && (
          <AvatarImage
            src={notification.senderImage}
            alt={notification.senderName}
          />
        )}
        <AvatarFallback className="bg-muted text-muted-foreground text-xs">
          {initials}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug">
          <span className="font-semibold">
            {notification.senderName}
          </span>{" "}
          <span className="text-muted-foreground">
            {notification.message}
          </span>
        </p>

        <span className="text-xs text-muted-foreground mt-1 block">
          {formatRelativeTime(notification.time)}
        </span>
      </div>

      {/* Mark as Read */}
      {!notification?.isRead && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMarkAsRead(notification.id);
          }}
          className="shrink-0 p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
          aria-label="Mark as read"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
