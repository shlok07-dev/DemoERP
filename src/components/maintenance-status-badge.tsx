import { Badge } from "@/components/ui/badge";

type MaintenanceStatus = "upcoming" | "due-soon" | "overdue" | string;

interface MaintenanceStatusBadgeProps {
  status: MaintenanceStatus;
}

export function MaintenanceStatusBadge({
  status,
}: MaintenanceStatusBadgeProps) {
  let className = "";

  switch (status?.toLowerCase()) {
    case "upcoming":
      className = "bg-[#ecfff2] text-[#10a142] border-[#10a142]";
      break;
    case "due-soon":
      className = "bg-[#fff8df] text-[#fdcc1c] border-[#fdcc1c]";
      break;
    case "overdue":
      className = "bg-[#ffe4e4] text-[#ed3237] border-[#ed3237]";
      break;
    default:
      className = "bg-[#e8f5ff] text-[#0089ff] border-[#0089ff]";
  }

  return (
    <Badge variant="outline" className={className}>
      {status || "Unknown"}
    </Badge>
  );
}
