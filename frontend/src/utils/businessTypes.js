export const BUSINESS_TYPES = {
  healthcare: {
    name: "Healthcare",
    icon: "🏥",
    services: ["Consultation", "Checkup", "Follow-up", "Emergency", "Lab Test", "Vaccination"],
    color: "bg-red-100 text-red-800 border-red-200"
  },
  beauty: {
    name: "Beauty & Salon",
    icon: "💇",
    services: ["Haircut", "Hair Color", "Hair Treatment", "Manicure", "Pedicure", "Facial", "Massage"],
    color: "bg-pink-100 text-pink-800 border-pink-200"
  },
  fitness: {
    name: "Fitness & Wellness",
    icon: "💪",
    services: ["Personal Training", "Yoga Class", "Pilates", "Nutrition Consultation", "Group Class"],
    color: "bg-green-100 text-green-800 border-green-200"
  },
  legal: {
    name: "Legal Services",
    icon: "⚖️",
    services: ["Consultation", "Document Review", "Court Appearance", "Contract Review"],
    color: "bg-blue-100 text-blue-800 border-blue-200"
  },
  realEstate: {
    name: "Real Estate",
    icon: "🏠",
    services: ["Property Viewing", "Consultation", "Document Signing", "Inspection"],
    color: "bg-purple-100 text-purple-800 border-purple-200"
  },
  automotive: {
    name: "Automotive",
    icon: "🚗",
    services: ["Service", "Repair", "Inspection", "Consultation"],
    color: "bg-orange-100 text-orange-800 border-orange-200"
  },
  education: {
    name: "Education",
    icon: "📚",
    services: ["Tutoring", "Consultation", "Test Prep", "Workshop"],
    color: "bg-indigo-100 text-indigo-800 border-indigo-200"
  },
  finance: {
    name: "Finance & Accounting",
    icon: "💰",
    services: ["Consultation", "Tax Preparation", "Financial Planning", "Audit"],
    color: "bg-yellow-100 text-yellow-800 border-yellow-200"
  },
  spa: {
    name: "Spa & Wellness",
    icon: "🧘",
    services: ["Massage", "Facial", "Body Treatment", "Aromatherapy", "Sauna"],
    color: "bg-teal-100 text-teal-800 border-teal-200"
  },
  other: {
    name: "Other",
    icon: "📅",
    services: ["General Appointment", "Meeting", "Consultation"],
    color: "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export const getBusinessType = (type) => {
  return BUSINESS_TYPES[type] || BUSINESS_TYPES.other
}

