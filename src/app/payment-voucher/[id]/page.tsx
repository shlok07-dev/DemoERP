"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Printer, Download, CheckCircle, XCircle } from "lucide-react"
import { SuccessModal } from "@/components/success-modal"

export default function PaymentVoucherDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [voucher, setVoucher] = useState<any>(null)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)

  useEffect(() => {
    const fetchVoucher = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setVoucher({
          id: params.id,
          date: "2023-10-15",
          payee: "Office Supplies Ltd",
          payeeAddress: "123 Business Avenue, Lagos, Nigeria",
          paymentMethod: "Bank Transfer",
          bankName: "First Bank",
          accountNumber: "1234567890",
          accountName: "Office Supplies Ltd",
          amount: "₦250,000.00",
          description:
            "Office supplies for Q4 including stationery, printer cartridges, and paper supplies for all departments.",
          category: "Office Supplies",
          requestedBy: "John Doe",
          requestedDate: "2023-10-14",
          approvedBy: params.id === "PV003" || params.id === "PV004" ? "Pending" : "Sarah Johnson",
          approvedDate: params.id === "PV003" || params.id === "PV004" ? "" : "2023-10-15",
          status:
            params.id === "PV003" || params.id === "PV004"
              ? "Pending"
              : params.id === "PV005"
                ? "Rejected"
                : "Approved",
          attachments: [
            { name: "Invoice-001.pdf", size: "245 KB", type: "application/pdf" },
            { name: "Receipt-001.jpg", size: "120 KB", type: "image/jpeg" },
          ],
          comments: [
            {
              user: "John Doe",
              date: "2023-10-14 09:30",
              comment: "Requesting approval for office supplies purchase.",
            },
            {
              user: "Sarah Johnson",
              date: "2023-10-15 11:15",
              comment: params.id === "PV005" ? "Rejected due to insufficient documentation." : "Approved for payment.",
            },
          ],
        })
      } catch (error) {
        console.error("Error fetching voucher:", error)
        toast({
          title: "Error",
          description: "Failed to load payment voucher details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchVoucher()
  }, [params.id, toast])

  const handleApprove = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setShowApproveModal(true)
    } catch (error) {
      console.error("Error approving voucher:", error)
      toast({
        title: "Error",
        description: "Failed to approve payment voucher. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReject = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setShowRejectModal(true)
    } catch (error) {
      console.error("Error rejecting voucher:", error)
      toast({
        title: "Error",
        description: "Failed to reject payment voucher. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your payment voucher is being downloaded.",
    })
  }

  if (loading) {
    return (
      <div>
        <PageHeader title="Payment Voucher Details" />
        <div className="p-4 sm:p-6">
          <Card>
            <CardContent className="p-6 flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0089ff] mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading payment voucher details...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!voucher) {
    return (
      <div>
        <PageHeader title="Payment Voucher Details" />
        <div className="p-4 sm:p-6">
          <Card>
            <CardContent className="p-6 flex justify-center items-center h-64">
              <div className="text-center">
                <p className="text-muted-foreground">Payment voucher not found.</p>
                <Button className="mt-4" onClick={() => router.push("/payment-voucher")}>
                  Back to Payment Vouchers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Payment Voucher Details">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center gap-1">
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Print</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </PageHeader>

      <div className="p-4 sm:p-6">
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Voucher #{voucher.id}</h2>
                <p className="text-sm text-muted-foreground">Created on {voucher.date}</p>
              </div>
              <Badge
                variant="outline"
                className={
                  voucher.status === "Approved"
                    ? "bg-[#ecfff2] text-[#10a142] border-[#10a142]"
                    : voucher.status === "Pending"
                      ? "bg-[#fff8df] text-[#fdcc1c] border-[#fdcc1c]"
                      : "bg-[#ffe4e4] text-[#ed3237] border-[#ed3237]"
                }
              >
                {voucher.status}
              </Badge>
            </div>

            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Payee Information</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Payee Name</p>
                          <p>{voucher.payee}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Payee Address</p>
                          <p>{voucher.payeeAddress}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                          <p>{voucher.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Amount</p>
                          <p className="text-xl font-bold">{voucher.amount}</p>
                        </div>
                        {voucher.paymentMethod === "Bank Transfer" && (
                          <>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Bank Name</p>
                              <p>{voucher.bankName}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                              <p>{voucher.accountNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Account Name</p>
                              <p>{voucher.accountName}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Description</p>
                          <p>{voucher.description}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Category</p>
                          <p>{voucher.category}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Approval Information</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Requested By</p>
                          <p>{voucher.requestedBy}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Requested Date</p>
                          <p>{voucher.requestedDate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Approved By</p>
                          <p>{voucher.approvedBy}</p>
                        </div>
                        {voucher.approvedDate && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Approved Date</p>
                            <p>{voucher.approvedDate}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="attachments">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Attachments</h3>
                  {voucher.attachments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {voucher.attachments.map((attachment: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="p-4 flex items-center justify-between">
                            <div>
                              <p className="font-medium">{attachment.name}</p>
                              <p className="text-sm text-muted-foreground">{attachment.size}</p>
                            </div>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No attachments available.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="history">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Activity History</h3>
                  <div className="space-y-4">
                    {voucher.comments.map((comment: any, index: number) => (
                      <div key={index} className="border-l-2 border-[#0089ff] pl-4 py-2">
                        <p className="font-medium">{comment.user}</p>
                        <p className="text-sm text-muted-foreground">{comment.date}</p>
                        <p className="mt-2">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between p-4 sm:p-6 border-t">
            <Button variant="outline" onClick={() => router.push("/payment-voucher")}>
              Back
            </Button>
            <div className="flex gap-2">
              {voucher.status === "Pending" && (
                <>
                  <Button variant="outline" className="text-red-600" onClick={handleReject}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button className="bg-[#0089ff] hover:bg-[#0071d1]" onClick={handleApprove}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>

      {showApproveModal && (
        <SuccessModal
          title="Payment Voucher Approved"
          description="The payment voucher has been approved successfully."
          onClose={() => {
            setShowApproveModal(false)
            router.push("/payment-voucher")
          }}
        />
      )}

      {showRejectModal && (
        <SuccessModal
          title="Payment Voucher Rejected"
          description="The payment voucher has been rejected."
          onClose={() => {
            setShowRejectModal(false)
            router.push("/payment-voucher")
          }}
        />
      )}
    </div>
  )
}
