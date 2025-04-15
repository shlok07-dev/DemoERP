"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface SuccessModalProps {
  title: string
  message: string
  buttonText: string
  onButtonClick: () => void
}

export function SuccessModal({ title, message, buttonText, onButtonClick }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative h-24 w-24 flex items-center justify-center">
            <div className="absolute inset-0 bg-green-100 rounded-full"></div>
            <CheckCircle className="h-16 w-16 text-green-500 z-10" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        <Button
          onClick={onButtonClick}
          className="w-full h-12 rounded-md bg-gradient-to-r from-[#0089ff] to-[#4b6cb7] hover:from-[#0070d8] hover:to-[#3b5998]"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
