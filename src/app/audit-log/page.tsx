"use client";

import { useState, useEffect, useMemo, type ReactNode } from "react";
import {
  Eye,
  FileEdit,
  Info,
  Plus,
  Search,
  Trash2,
  Download,
  FilterX,
  ChevronDown,
} from "lucide-react";
import { format, isValid, parseISO } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Type definition for audit log - updated to match the actual schema
type ChangeDetail = {
  from: any;
  to: any;
};

type AuditLog = {
  id: string | number;
  userId: string | number;
  action: string;
  tableName: string;
  recordId: string | number;
  oldData: any;
  newData: any;
  changedFields: Record<string, ChangeDetail>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  requestId?: string;
  createdAt?: string;
  updatedAt?: string;
  reason?: string | null;
  metadata?: any;
  [key: string]: any; // Allow for any additional fields from the API
};

// Define sort direction type
type SortDirection = "asc" | "desc" | null;

// Define sort state type
type SortState = {
  column: string | null;
  direction: SortDirection;
};

// Define column widths for consistency
const columnWidths = {
  action: "w-[100px]",
  recordId: "w-[120px]",
  userId: "w-[120px]",
  tableName: "w-[150px]",
  timestamp: "w-[180px]",
  details: "w-[100px]",
};

export default function AuditLogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawApiResponse, setRawApiResponse] = useState<any>(null);
  const [tableFilter, setTableFilter] = useState<string | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  // Fetch audit logs from API
  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/fetchAuditLog");

        if (!response.ok) {
          throw new Error(`Error fetching audit logs: ${response.statusText}`);
        }

        const data = await response.json();
        setRawApiResponse(data);
        setLogs(data);
        console.log("API Response:", data);
      } catch (err) {
        console.error("Failed to fetch audit logs:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch audit logs"
        );
        setLogs([]); // Set empty array instead of mock data
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  // Export logs as CSV
  const exportLogsAsCsv = (): void => {
    // Define the CSV headers
    const headers = [
      "id",
      "action",
      "tableName",
      "recordId",
      "userId",
      "timestamp",
      "ipAddress",
      "reason",
    ];

    // Create CSV content
    let csvContent = headers.join(",") + "\n";

    // Add each log as a row
    logs.forEach((log) => {
      const row = [
        log.id,
        log.action,
        log.tableName,
        log.recordId,
        log.userId,
        formatTimestamp(log.timestamp),
        log.ipAddress || "",
        log.reason || "",
      ]
        .map((value) => {
          // Escape quotes and wrap in quotes if the value contains a comma
          const stringValue = String(value || "");
          return stringValue.includes(",")
            ? `"${stringValue.replace(/"/g, '""')}"`
            : stringValue;
        })
        .join(",");

      csvContent += row + "\n";
    });

    // Create a download link
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const exportFileDefaultName = `audit-logs-${
      new Date().toISOString().split("T")[0]
    }.csv`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", encodedUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Handle sorting - updated for immediate sorting on first click
  const handleSort = (column: string) => {
    setSortState((prevState) => {
      // If clicking the same column, toggle between asc and desc only
      if (prevState.column === column) {
        return {
          column,
          direction: prevState.direction === "asc" ? "desc" : "asc",
        };
      }
      // If clicking a new column, start with ascending
      return { column, direction: "asc" };
    });
  };

  // Filter and sort logs
  const processedLogs = useMemo(() => {
    // First filter the logs
    let result = logs.filter((log) => {
      // If no search term, return all logs
      if (!searchTerm || searchTerm.trim() === "") {
        return true;
      }

      const searchTermLower = searchTerm.toLowerCase().trim();

      // Convert recordId to string and check if it includes the search term
      const recordIdStr = String(log.recordId).toLowerCase();
      if (recordIdStr.includes(searchTermLower)) {
        return true;
      }

      // Check other searchable fields
      for (const [key, value] of Object.entries(log)) {
        // Skip complex objects and specific fields we don't want to search
        if (
          typeof value !== "string" ||
          key.includes("data") ||
          key.includes("agent") ||
          key === "changedFields" ||
          key === "metadata"
        ) {
          continue;
        }

        if (value.toLowerCase().includes(searchTermLower)) {
          return true;
        }
      }

      return false;
    });

    // Apply table filter
    if (tableFilter) {
      result = result.filter((log) => log.tableName === tableFilter);
    }

    // Then sort the filtered logs
    if (sortState.column && sortState.direction) {
      result = [...result].sort((a, b) => {
        const aValue = sortState.column
          ? a[sortState.column as keyof AuditLog]
          : null;
        const bValue = sortState.column
          ? b[sortState.column as keyof AuditLog]
          : null;

        // Handle timestamp sorting specially
        if (sortState.column === "timestamp") {
          const aDate = new Date(String(aValue || ""));
          const bDate = new Date(String(bValue || ""));
          return sortState.direction === "asc"
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        }

        // Handle string comparison
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortState.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        // Handle number comparison
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortState.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        // Default comparison for other types
        const aStr = String(aValue || "");
        const bStr = String(bValue || "");
        return sortState.direction === "asc"
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }

    return result;
  }, [logs, searchTerm, tableFilter, sortState]);

  // Reset all filters and sorting
  const resetFilters = () => {
    setSearchTerm("");
    setTableFilter(null);
    setSortState({ column: null, direction: null });
  };

  // View log details
  const viewLogDetails = (log: AuditLog) => {
    setSelectedLog(log);
    setIsDialogOpen(true);
  };

  // Format timestamp without timezone conversion
  const formatTimestamp = (timestamp: string): string => {
    try {
      if (!timestamp) return "Invalid date";

      // For ISO strings, parse but preserve the original time without timezone conversion
      if (typeof timestamp === "string" && timestamp.includes("T")) {
        // Extract just the date and time parts without timezone conversion
        const [datePart, timePart] = timestamp.split("T");
        const timeOnly = timePart.split(".")[0]; // Remove milliseconds if present
        return `${datePart} ${timeOnly}`;
      }

      // For Unix timestamps or other formats, create a date
      const date = new Date(timestamp);
      if (isValid(date)) {
        // Use parseISO for safer parsing
        try {
          const parsedDate = parseISO(timestamp);
          return format(parsedDate, "yyyy-MM-dd HH:mm:ss");
        } catch {
          // If parseISO fails, use the regular date
          return format(date, "yyyy-MM-dd HH:mm:ss");
        }
      }

      return "Invalid date";
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "Invalid date";
    }
  };

  // Get action badge color
  const getActionBadge = (action: string): ReactNode => {
    if (!action) return <Badge>Unknown</Badge>;

    switch (action.toLowerCase()) {
      case "add":
      case "create":
      case "insert":
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600">
            <Plus className="mr-1 h-3 w-3" /> {action}
          </Badge>
        );
      case "update":
      case "edit":
      case "modify":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <FileEdit className="mr-1 h-3 w-3" /> {action}
          </Badge>
        );
      case "delete":
      case "remove":
        return (
          <Badge className="bg-rose-500 hover:bg-rose-600">
            <Trash2 className="mr-1 h-3 w-3" /> {action}
          </Badge>
        );
      default:
        return <Badge>{action}</Badge>;
    }
  };

  // Check if a field has changed
  const hasFieldChanged = (key: string): boolean => {
    if (!selectedLog) return false;
    return selectedLog.changedFields && key in selectedLog.changedFields;
  };

  // Get the change details for a field
  const getDiffHighlightColor = (key: string, isOld: boolean): string => {
    if (hasFieldChanged(key)) {
      return isOld
        ? "bg-rose-50 dark:bg-rose-950/30"
        : "bg-emerald-50 dark:bg-emerald-950/30";
    }
    return "";
  };

  // Format value for display
  const formatValue = (value: any): ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground italic">null</span>;
    }

    if (typeof value === "object") {
      return (
        <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }

    // Check if the value is a timestamp
    if (
      typeof value === "string" &&
      (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/) || // ISO format
        value.match(/^\d{10,13}$/))
    ) {
      // Unix timestamp
      return formatTimestamp(value);
    }

    return String(value);
  };

  // Add a function to get unique table names
  const uniqueTables = useMemo(() => {
    const tables = logs.map((log) => log.tableName).filter(Boolean);
    return [...new Set(tables)].sort();
  }, [logs]);

  return (
    <div className="container mx-auto py-4 px-4 md:py-6 md:px-6">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Audit Logs
            </h1>
            <p className="text-sm text-muted-foreground">
              Track and analyze changes across your system
            </p>
          </div>
          <Button
            variant="outline"
            onClick={exportLogsAsCsv}
            disabled={isLoading || logs.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by Product ID, user, table..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[180px] justify-start text-left font-normal"
                  disabled={isLoading}
                >
                  <span className="truncate">
                    {tableFilter ? `Table: ${tableFilter}` : "Filter by table"}
                  </span>
                  <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[180px] max-h-[300px] overflow-auto"
              >
                <DropdownMenuCheckboxItem
                  checked={tableFilter === null}
                  onCheckedChange={() => setTableFilter(null)}
                >
                  All Tables
                </DropdownMenuCheckboxItem>
                {uniqueTables.map((table) => (
                  <DropdownMenuCheckboxItem
                    key={table}
                    checked={tableFilter === table}
                    onCheckedChange={(checked) => {
                      if (checked) setTableFilter(table);
                      else if (tableFilter === table) setTableFilter(null);
                    }}
                  >
                    {table}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={resetFilters}
              disabled={!searchTerm && !tableFilter && !sortState.column}
            >
              <FilterX className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Statistics Card */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Logs
                </p>
                <p className="text-2xl font-bold">{logs.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Create Actions
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  {
                    logs.filter(
                      (log) =>
                        log.action &&
                        ["add", "create", "insert"].includes(
                          log.action.toLowerCase()
                        )
                    ).length
                  }
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Update Actions
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {
                    logs.filter(
                      (log) =>
                        log.action &&
                        ["update", "edit", "modify"].includes(
                          log.action.toLowerCase()
                        )
                    ).length
                  }
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Delete Actions
                </p>
                <p className="text-2xl font-bold text-rose-600">
                  {
                    logs.filter(
                      (log) =>
                        log.action &&
                        ["delete", "remove"].includes(log.action.toLowerCase())
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Log Table */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle>Audit Trail</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Loading audit logs...
                </p>
              </div>
            ) : logs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No audit logs found.</p>
              </div>
            ) : processedLogs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">
                  No matching logs found for your search criteria.
                </p>
                <Button variant="link" onClick={resetFilters} className="mt-2">
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="relative">
                {/* Table container with fixed layout to ensure consistent column widths */}
                <div className="w-full overflow-hidden">
                  {/* Table Header - Fixed/Sticky */}
                  <div className="sticky top-0 bg-background z-10 shadow-sm border-b">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th
                            className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer ${columnWidths.action}`}
                            onClick={() => handleSort("action")}
                          >
                            <div className="flex items-center">
                              Action
                              {sortState.column === "action" && (
                                <ChevronDown
                                  className={`ml-1 h-4 w-4 ${
                                    sortState.direction === "desc"
                                      ? "rotate-180"
                                      : ""
                                  } transition-transform`}
                                />
                              )}
                            </div>
                          </th>
                          <th
                            className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer ${columnWidths.recordId}`}
                            onClick={() => handleSort("recordId")}
                          >
                            <div className="flex items-center">
                              Record ID
                              {sortState.column === "recordId" && (
                                <ChevronDown
                                  className={`ml-1 h-4 w-4 ${
                                    sortState.direction === "desc"
                                      ? "rotate-180"
                                      : ""
                                  } transition-transform`}
                                />
                              )}
                            </div>
                          </th>
                          <th
                            className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer ${columnWidths.userId}`}
                            onClick={() => handleSort("userId")}
                          >
                            <div className="flex items-center">
                              User ID
                              {sortState.column === "userId" && (
                                <ChevronDown
                                  className={`ml-1 h-4 w-4 ${
                                    sortState.direction === "desc"
                                      ? "rotate-180"
                                      : ""
                                  } transition-transform`}
                                />
                              )}
                            </div>
                          </th>
                          <th
                            className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer ${columnWidths.tableName}`}
                            onClick={() => handleSort("tableName")}
                          >
                            <div className="flex items-center">
                              Table
                              {sortState.column === "tableName" && (
                                <ChevronDown
                                  className={`ml-1 h-4 w-4 ${
                                    sortState.direction === "desc"
                                      ? "rotate-180"
                                      : ""
                                  } transition-transform`}
                                />
                              )}
                            </div>
                          </th>
                          <th
                            className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer ${columnWidths.timestamp}`}
                            onClick={() => handleSort("timestamp")}
                          >
                            <div className="flex items-center">
                              Timestamp
                              {sortState.column === "timestamp" && (
                                <ChevronDown
                                  className={`ml-1 h-4 w-4 ${
                                    sortState.direction === "desc"
                                      ? "rotate-180"
                                      : ""
                                  } transition-transform`}
                                />
                              )}
                            </div>
                          </th>
                          <th
                            className={`h-12 px-4 text-right align-middle font-medium text-muted-foreground ${columnWidths.details}`}
                          >
                            Details
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </div>

                  {/* Table Body - Scrollable */}
                  <div className="max-h-[500px] overflow-y-auto">
                    <table className="w-full">
                      <tbody>
                        {processedLogs.map((log) => (
                          <tr
                            key={log.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td
                              className={`p-4 align-middle ${columnWidths.action}`}
                            >
                              {getActionBadge(log.action)}
                            </td>
                            <td
                              className={`p-4 align-middle font-medium ${columnWidths.recordId}`}
                            >
                              {log.recordId || "N/A"}
                            </td>
                            <td
                              className={`p-4 align-middle ${columnWidths.userId}`}
                            >
                              {log.userId || "N/A"}
                            </td>
                            <td
                              className={`p-4 align-middle ${columnWidths.tableName}`}
                            >
                              {log.tableName || "N/A"}
                            </td>
                            <td
                              className={`p-4 align-middle ${columnWidths.timestamp}`}
                            >
                              {formatTimestamp(log.timestamp)}
                            </td>
                            <td
                              className={`p-4 align-middle text-right ${columnWidths.details}`}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => viewLogDetails(log)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Log Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl sm:max-w-[95vw] md:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              {selectedLog && getActionBadge(selectedLog.action)}
              <span className="ml-2">Audit Log Details</span>
            </DialogTitle>
          </DialogHeader>

          {selectedLog && (
            <ScrollArea className="h-[70vh] pr-4">
              <div className="space-y-6 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Log Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground">
                          Log ID
                        </div>
                        <div className="text-sm font-medium">
                          {selectedLog.id}
                        </div>
                      </div>
                      {selectedLog.requestId && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-muted-foreground">
                            Request ID
                          </div>
                          <div className="text-sm font-medium">
                            {selectedLog.requestId}
                          </div>
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground">
                          Timestamp
                        </div>
                        <div className="text-sm">
                          {formatTimestamp(selectedLog.timestamp)}
                        </div>
                      </div>
                      {selectedLog.updatedAt && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-muted-foreground">
                            Updated At
                          </div>
                          <div className="text-sm">
                            {formatTimestamp(selectedLog.updatedAt)}
                          </div>
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground">
                          Action
                        </div>
                        <div>{getActionBadge(selectedLog.action)}</div>
                      </div>
                      {selectedLog.reason !== null &&
                        selectedLog.reason !== undefined && (
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                              Reason
                            </div>
                            <div className="text-sm">
                              {selectedLog.reason || "No reason provided"}
                            </div>
                          </div>
                        )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Record Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground">
                          Table Name
                        </div>
                        <div className="text-sm">{selectedLog.tableName}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground">
                          Record ID
                        </div>
                        <div className="text-sm font-medium">
                          {selectedLog.recordId}
                        </div>
                      </div>
                      {selectedLog.userId && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-muted-foreground">
                            User ID
                          </div>
                          <div className="text-sm">{selectedLog.userId}</div>
                        </div>
                      )}
                      {selectedLog.ipAddress && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-muted-foreground">
                            IP Address
                          </div>
                          <div className="text-sm">{selectedLog.ipAddress}</div>
                        </div>
                      )}
                      {selectedLog.userAgent && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-muted-foreground">
                            User Agent
                          </div>
                          <div className="text-sm overflow-hidden text-ellipsis">
                            {selectedLog.userAgent}
                          </div>
                        </div>
                      )}
                      {selectedLog.changedFields &&
                        Object.keys(selectedLog.changedFields).length > 0 && (
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground">
                              Changed Fields
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {Object.keys(selectedLog.changedFields).map(
                                (field) => (
                                  <Badge key={field} variant="outline">
                                    {field}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="changes">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="changes">Data Changes</TabsTrigger>
                    <TabsTrigger value="detailed">Detailed Changes</TabsTrigger>
                    <TabsTrigger value="json">Raw JSON</TabsTrigger>
                  </TabsList>
                  <TabsContent value="changes" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            Previous Data
                            {!selectedLog.oldData && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="ml-2 h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      No previous data exists for this record
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedLog.oldData &&
                          typeof selectedLog.oldData === "object" &&
                          selectedLog.oldData !== null ? (
                            <div className="space-y-2">
                              {Object.entries(selectedLog.oldData).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className={`p-2 rounded-md ${getDiffHighlightColor(
                                      key,
                                      true
                                    )}`}
                                  >
                                    <div className="text-xs font-medium">
                                      {key}
                                    </div>
                                    <div className="text-sm break-all">
                                      {formatValue(value)}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          ) : selectedLog.oldData &&
                            typeof selectedLog.oldData === "string" ? (
                            <div className="p-2 rounded-md">
                              <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto whitespace-pre-wrap">
                                {selectedLog.oldData}
                              </pre>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                              <p className="text-sm italic">No previous data</p>
                              {selectedLog.action.toLowerCase() === "add" && (
                                <p className="text-xs mt-1">
                                  This is a new record
                                </p>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            New Data
                            {!selectedLog.newData && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="ml-2 h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Record was deleted</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedLog.newData &&
                          typeof selectedLog.newData === "object" &&
                          selectedLog.newData !== null ? (
                            <div className="space-y-2">
                              {Object.entries(selectedLog.newData).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className={`p-2 rounded-md ${getDiffHighlightColor(
                                      key,
                                      false
                                    )}`}
                                  >
                                    <div className="text-xs font-medium">
                                      {key}
                                    </div>
                                    <div className="text-sm break-all">
                                      {formatValue(value)}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          ) : selectedLog.newData &&
                            typeof selectedLog.newData === "string" ? (
                            <div className="p-2 rounded-md">
                              <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto whitespace-pre-wrap">
                                {selectedLog.newData}
                              </pre>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                              <p className="text-sm italic">No new data</p>
                              {selectedLog.action.toLowerCase() ===
                                "delete" && (
                                <p className="text-xs mt-1">
                                  This record was deleted
                                </p>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="detailed" className="pt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Changed Fields
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedLog.changedFields &&
                        Object.keys(selectedLog.changedFields).length > 0 ? (
                          <div className="space-y-4">
                            {Object.entries(selectedLog.changedFields).map(
                              ([key, change]) => (
                                <div
                                  key={key}
                                  className="border rounded-md overflow-hidden"
                                >
                                  <div className="bg-muted px-4 py-2 font-medium">
                                    {key}
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="p-4 border-r bg-rose-50 dark:bg-rose-950/30">
                                      <div className="text-xs font-medium text-muted-foreground mb-1">
                                        Previous Value
                                      </div>
                                      <div className="text-sm">
                                        {formatValue(change.from)}
                                      </div>
                                    </div>
                                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30">
                                      <div className="text-xs font-medium text-muted-foreground mb-1">
                                        New Value
                                      </div>
                                      <div className="text-sm">
                                        {formatValue(change.to)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-32 text-muted-foreground">
                            <p className="text-sm italic">
                              No changes detected
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="json">
                    <Card>
                      <CardContent className="pt-6">
                        <pre className="text-xs bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
                          {JSON.stringify(selectedLog, null, 2)}
                        </pre>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Additional Fields Section - Display any other fields that might be in the API response */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Additional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(selectedLog)
                        .filter(
                          ([key]) =>
                            ![
                              "id",
                              "userId",
                              "action",
                              "tableName",
                              "recordId",
                              "oldData",
                              "newData",
                              "changedFields",
                              "ipAddress",
                              "timestamp",
                              "requestId",
                              "createdAt",
                              "updatedAt",
                              "metadata",
                              "reason",
                              "userAgent",
                            ].includes(key)
                        )
                        .map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                            <div className="text-sm break-all">
                              {formatValue(value)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
