import { Badge } from "@/components/ui/badge";

type DeliveryStatus =
  | "scheduled"
  | "in-transit"
  | "delivered"
  | "cancelled"
  | string;

interface DeliveryStatusBadgeProps {
  status: DeliveryStatus;
}

export function DeliveryStatusBadge({ status }: DeliveryStatusBadgeProps) {
  let className = "";

  switch (status?.toLowerCase()) {
    case "delivered":
      className = "bg-[#ecfff2] text-[#10a142] border-[#10a142]";
      break;
    case "in-transit":
      className = "bg-[#e8f5ff] text-[#0089ff] border-[#0089ff]";
      break;
    case "scheduled":
      className = "bg-[#fff8df] text-[#fdcc1c] border-[#fdcc1c]";
      break;
    case "cancelled":
      className = "bg-[#ffe4e4] text-[#ed3237] border-[#ed3237]";
      break;
    default:
      className = "bg-[#f9efff] text-[#a601ff] border-[#a601ff]";
  }

  return (
    <Badge variant="outline" className={className}>
      {status || "Unknown"}
    </Badge>
  );
}
