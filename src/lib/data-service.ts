// Types
export interface StaffMember {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  gender: string
  staffId: string
  role: string
  designation: string
  officialEmail: string
}

export interface TrainingItem {
  id: string
  description: string
  startDate: string
  type: string
  duration: string
  mode: string
  status: string
  participants: string[]
}

export interface MemoItem {
  id: string
  title: string
  sentFrom: string
  sentTo: string
  date: string
  attachment: string
  type: string
  message: string
}

export interface CircularItem {
  id: string
  title: string
  sentFrom: string
  sentTo: string
  date: string
  type: string
  message: string
}

export interface ProcurementItem {
  id: string
  item: string
  quantity: string
  unitPrice: string
  totalPrice: string
  date: string
  requestedBy: string
  sentTo: string
  status: string
  attachment: string
}

export interface InventoryItem {
  id: string
  name: string
  productId: string
  category: string
  qtyPurchased: string
  unitPrice: string
  totalAmount: string
  inStock: string
  supplier: string
  status?: string
}

// Mock data
const staffMembers: StaffMember[] = [
  {
    id: "1",
    firstName: "Sandra",
    lastName: "Williams",
    email: "sandra@example.com",
    phoneNumber: "08130000000",
    gender: "female",
    staffId: "0246AHR",
    role: "Admin",
    designation: "Human Resources",
    officialEmail: "sandra.williams@company.com",
  },
  {
    id: "2",
    firstName: "Abubakar",
    lastName: "Ibrahim",
    email: "abubakar@example.com",
    phoneNumber: "07062000033",
    gender: "male",
    staffId: "0251ITO",
    role: "IT",
    designation: "Operations",
    officialEmail: "abubakar.ibrahim@company.com",
  },
  // Add more staff members as needed
]

const trainings: TrainingItem[] = [
  {
    id: "01",
    description: "Staff Health and Safety Training",
    startDate: "03/12/2022",
    type: "Team",
    duration: "3days",
    mode: "Physical",
    status: "Inprogress",
    participants: ["1", "2", "3"],
  },
  {
    id: "02",
    description: "Leadership Development Program",
    startDate: "15/12/2022",
    type: "Individual",
    duration: "2weeks",
    mode: "Online",
    status: "To-do",
    participants: ["2", "4"],
  },
  // Add more trainings as needed
]

const memos: MemoItem[] = [
  {
    id: "01",
    title: "Operations memo",
    sentFrom: "Williams Achegbani",
    sentTo: "Chief Operations Officer",
    date: "16/11/2022",
    attachment: "Yes",
    type: "Sent",
    message: "This is a sample memo message regarding operations.",
  },
  {
    id: "02",
    title: "HR Policy Update",
    sentFrom: "Otor John",
    sentTo: "All Staff",
    date: "20/11/2022",
    attachment: "No",
    type: "Received",
    message: "This memo outlines the updated HR policies effective next month.",
  },
  // Add more memos as needed
]

const circulars: CircularItem[] = [
  {
    id: "01",
    title: "HR Circular for Operations Department Staff",
    sentFrom: "Admin, HR",
    sentTo: "Operations Staffs",
    date: "16/11/2022",
    type: "Sent",
    message: "This circular provides information about upcoming changes in the operations department.",
  },
  {
    id: "02",
    title: "Management Circular for HR Staffs",
    sentFrom: "Admin, HR",
    sentTo: "HR Staffs",
    date: "18/11/2022",
    type: "Sent",
    message: "This circular outlines new management directives for HR staff.",
  },
  // Add more circulars as needed
]

const procurements: ProcurementItem[] = [
  {
    id: "01",
    item: "Office chairs",
    quantity: "20",
    unitPrice: "₹18,000.00",
    totalPrice: "₹360,000.00",
    date: "21/11/2022",
    requestedBy: "Otor John",
    sentTo: "Faruk Hashim",
    status: "Pending",
    attachment: "Yes",
  },
  {
    id: "02",
    item: "Laptops",
    quantity: "5",
    unitPrice: "₹450,000.00",
    totalPrice: "₹2,250,000.00",
    date: "25/11/2022",
    requestedBy: "Fatima Mohammed",
    sentTo: "Otor John",
    status: "Approved",
    attachment: "Yes",
  },
  // Add more procurements as needed
]

const inventory: InventoryItem[] = [
  {
    id: "01",
    name: "Pen",
    productId: "45656787",
    category: "Stationaries",
    qtyPurchased: "50pcs",
    unitPrice: "₹100.00",
    totalAmount: "₹5,000.00",
    inStock: "40pcs",
    supplier: "Big Ben's Store",
    status: "In stock",
  },
  {
    id: "02",
    name: "A4 Paper",
    productId: "69956787",
    category: "Stationaries",
    qtyPurchased: "20pcs",
    unitPrice: "₹3,000.00",
    totalAmount: "₹60,000.00",
    inStock: "0pcs",
    supplier: "Big Ben's Store",
    status: "Out of Stock",
  },
  // Add more inventory items as needed
]

// Staff functions
export async function getStaffMembers(): Promise<StaffMember[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...staffMembers]
}

export async function getStaffMemberById(id: string): Promise<StaffMember | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return staffMembers.find((staff) => staff.id === id)
}

export async function addStaffMember(staff: Omit<StaffMember, "id">): Promise<StaffMember> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newStaff = {
    id: Date.now().toString(),
    ...staff,
  }
  staffMembers.push(newStaff)
  return newStaff
}

export async function updateStaffMember(id: string, data: Partial<StaffMember>): Promise<StaffMember | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = staffMembers.findIndex((staff) => staff.id === id)
  if (index !== -1) {
    staffMembers[index] = { ...staffMembers[index], ...data }
    return staffMembers[index]
  }
  return undefined
}

// Training functions
export async function getTrainings(): Promise<TrainingItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...trainings]
}

export async function getTrainingById(id: string): Promise<TrainingItem | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return trainings.find((training) => training.id === id)
}

export async function addTraining(training: Omit<TrainingItem, "id">): Promise<TrainingItem> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newTraining = {
    id: (trainings.length + 1).toString().padStart(2, "0"),
    ...training,
  }
  trainings.push(newTraining)
  return newTraining
}

export async function updateTrainingStatus(id: string, status: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = trainings.findIndex((training) => training.id === id)
  if (index !== -1) {
    trainings[index].status = status
    return true
  }
  return false
}

// Memo functions
export async function getMemos(): Promise<MemoItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...memos]
}

export async function getMemoById(id: string): Promise<MemoItem | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return memos.find((memo) => memo.id === id)
}

export async function addMemo(memo: Omit<MemoItem, "id">): Promise<MemoItem> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newMemo = {
    id: (memos.length + 1).toString().padStart(2, "0"),
    ...memo,
  }
  memos.push(newMemo)
  return newMemo
}

// Circular functions
export async function getCirculars(): Promise<CircularItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...circulars]
}

export async function getCircularById(id: string): Promise<CircularItem | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return circulars.find((circular) => circular.id === id)
}

export async function addCircular(circular: Omit<CircularItem, "id">): Promise<CircularItem> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newCircular = {
    id: (circulars.length + 1).toString().padStart(2, "0"),
    ...circular,
  }
  circulars.push(newCircular)
  return newCircular
}

// Procurement functions
export async function getProcurements(): Promise<ProcurementItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...procurements]
}

export async function getProcurementById(id: string): Promise<ProcurementItem | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return procurements.find((procurement) => procurement.id === id)
}

export async function addProcurement(procurement: Omit<ProcurementItem, "id">): Promise<ProcurementItem> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newProcurement = {
    id: (procurements.length + 1).toString().padStart(2, "0"),
    ...procurement,
  }
  procurements.push(newProcurement)
  return newProcurement
}

export async function updateProcurementStatus(id: string, status: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = procurements.findIndex((procurement) => procurement.id === id)
  if (index !== -1) {
    procurements[index].status = status
    return true
  }
  return false
}

// Inventory functions
export async function getInventoryItems(): Promise<InventoryItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...inventory]
}

export async function getInventoryItemById(id: string): Promise<InventoryItem | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return inventory.find((item) => item.id === id)
}

export async function addInventoryItem(item: Omit<InventoryItem, "id">): Promise<InventoryItem> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newItem = {
    id: (inventory.length + 1).toString().padStart(2, "0"),
    ...item,
  }
  inventory.push(newItem)
  return newItem
}
