import { Badge } from "@/components/ui/badge";

type VehicleStatus = "active" | "maintenance" | "out-of-service" | string;

interface VehicleStatusBadgeProps {
  status: VehicleStatus;
}

export function VehicleStatusBadge({ status }: VehicleStatusBadgeProps) {
  let className = "";

  switch (status?.toLowerCase()) {
    case "active":
      className = "bg-[#ecfff2] text-[#10a142] border-[#10a142]";
      break;
    case "maintenance":
      className = "bg-[#fff8df] text-[#fdcc1c] border-[#fdcc1c]";
      break;
    case "out-of-service":
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
