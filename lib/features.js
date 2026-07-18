// ──────────────────────────────────────────────────────────────
//  FIA EUROPE — Full feature catalog (original immigration-domain
//  content, organized into categories shown as filter chips).
//  Used by /features page and the "All Features" mega-menu link.
// ──────────────────────────────────────────────────────────────

export const FEATURE_CATEGORIES = [
  "Visa & Immigration",
  "Document Handling",
  "Tracking & Status",
  "Golden Visa & Investment",
  "Accounting & Finance",
  "Legal & Residency",
  "Relocation & Travel",
  "Client Collaboration",
  "Platform & Setup",
];

export const FEATURES = [
  // ── Visa & Immigration ──
  { name: "Work Permit Processing", desc: "End-to-end EU work-authorization handling with employer coordination and submission.", cat: "Visa & Immigration" },
  { name: "Student Visa Processing", desc: "University admission liaison, study-permit forms, and enrolment confirmation support.", cat: "Visa & Immigration" },
  { name: "Business Visa", desc: "Short and long-stay business visas with multi-entry options for entrepreneurs.", cat: "Visa & Immigration" },
  { name: "Tourist & Schengen Visa", desc: "Short-stay Schengen applications with itinerary and insurance guidance.", cat: "Visa & Immigration" },
  { name: "Visa Eligibility Check", desc: "Quick assessment of which visa categories fit your profile and destination.", cat: "Visa & Immigration" },
  { name: "Embassy Appointment Booking", desc: "We secure and manage your embassy or VFS appointment slots for you.", cat: "Visa & Immigration" },

  // ── Document Handling ──
  { name: "Document Checklist", desc: "A personalized list of every document you need, tailored to your visa type.", cat: "Document Handling" },
  { name: "Document Upload & Storage", desc: "Securely upload, store, and reuse your documents across applications.", cat: "Document Handling" },
  { name: "Certified Translation", desc: "Official document translation into the destination country's language.", cat: "Document Handling" },
  { name: "Document Verification", desc: "Our team reviews every file for completeness before submission.", cat: "Document Handling" },
  { name: "Apostille & Legalization", desc: "Authentication and apostille services for international document recognition.", cat: "Document Handling" },

  // ── Tracking & Status ──
  { name: "Real-Time Application Tracking", desc: "Watch your application move through all six processing stages, live.", cat: "Tracking & Status" },
  { name: "Status Notifications", desc: "Automatic alerts by email and in-app whenever your status changes.", cat: "Tracking & Status" },
  { name: "Applicant Dashboard", desc: "One place for your applications, documents, appointments, and invoices.", cat: "Tracking & Status" },
  { name: "Estimated Timelines", desc: "Transparent processing-time estimates for each step and destination.", cat: "Tracking & Status" },
  { name: "VFS / Immigration Sync", desc: "Manual integration with VFS Global and immigration portals (live automation planned).", cat: "Tracking & Status" },

  // ── Golden Visa & Investment ──
  { name: "Romania Golden Visa", desc: "Investment-based residency through property, bonds, or business.", cat: "Golden Visa & Investment" },
  { name: "Property Investment Advisory", desc: "Guidance on qualifying real-estate purchases for residency.", cat: "Golden Visa & Investment" },
  { name: "Investor Profile Assessment", desc: "Evaluate your eligibility and the best investment-migration route.", cat: "Golden Visa & Investment" },
  { name: "Non-EU Investment Structuring", desc: "Investment setup for non-EU nationals entering European markets.", cat: "Golden Visa & Investment" },
  { name: "Citizenship by Investment", desc: "Long-term pathways from investment residency toward citizenship.", cat: "Golden Visa & Investment" },

  // ── Accounting & Finance ──
  { name: "Company Bookkeeping", desc: "EU company accounting, VAT registration, and financial reporting.", cat: "Accounting & Finance" },
  { name: "Payroll Management", desc: "Employee payroll processing and salary compliance across the EU.", cat: "Accounting & Finance" },
  { name: "Tax Compliance & Filing", desc: "EU tax advisory, filing, and full regulatory compliance.", cat: "Accounting & Finance" },
  { name: "Invoicing & Billing", desc: "Transparent, itemized invoices for every service, downloadable anytime.", cat: "Accounting & Finance" },
  { name: "Money Transfer", desc: "Fast, secure remittance to your home country with low fees.", cat: "Accounting & Finance" },
  { name: "Salary & Job Tracking", desc: "Monitor your employment status and salary payments in real time.", cat: "Accounting & Finance" },

  // ── Legal & Residency ──
  { name: "Legal Aid & Lawyers", desc: "Access to immigration lawyers, employment-law and contract specialists.", cat: "Legal & Residency" },
  { name: "TRC Extension", desc: "Temporary Residence Card renewals handled end-to-end.", cat: "Legal & Residency" },
  { name: "Family Reunification", desc: "Bring your spouse and children to join you in Europe.", cat: "Legal & Residency" },
  { name: "Permanent Residency", desc: "PR application support and pathways to long-term settlement.", cat: "Legal & Residency" },
  { name: "Employer Transfer", desc: "Smooth transfers of your work authorization between employers.", cat: "Legal & Residency" },
  { name: "Company Formation", desc: "Register and incorporate your EU company with all legal paperwork.", cat: "Legal & Residency" },

  // ── Relocation & Travel ──
  { name: "Airport Pickup & Drop", desc: "Reliable 24/7 airport transfers with professional drivers.", cat: "Relocation & Travel" },
  { name: "Accommodation Support", desc: "Apartment, hostel, and housing arrangements for new arrivals.", cat: "Relocation & Travel" },
  { name: "Air Ticketing", desc: "Flights, bus, train, and ferry bookings across Europe.", cat: "Relocation & Travel" },
  { name: "Hotel Reservation", desc: "Best-rate hotel bookings across all EU cities.", cat: "Relocation & Travel" },
  { name: "Tourism Packages", desc: "International and national tour packages and group travel.", cat: "Relocation & Travel" },
  { name: "Job Placement", desc: "Direct employer connections and job matching after arrival.", cat: "Relocation & Travel" },

  // ── Client Collaboration ──
  { name: "Live Chat Support", desc: "Instant help from our support team, available 24/7.", cat: "Client Collaboration" },
  { name: "Consultation Booking", desc: "Schedule free 30-minute consultations with visa experts.", cat: "Client Collaboration" },
  { name: "Case Notes & Updates", desc: "Your advisor leaves notes and progress updates on your case.", cat: "Client Collaboration" },
  { name: "Multi-Language Support", desc: "Assistance in multiple languages for a smoother experience.", cat: "Client Collaboration" },
  { name: "Referral Program", desc: "Refer friends and family and earn rewards on successful applications.", cat: "Client Collaboration" },

  // ── Platform & Setup ──
  { name: "Secure Account", desc: "Encrypted, GDPR-compliant account protecting your personal data.", cat: "Platform & Setup" },
  { name: "GDPR & Data Privacy", desc: "Full control over your data with EU-compliant privacy handling.", cat: "Platform & Setup" },
  { name: "Mobile App (PWA)", desc: "Install FIA Europe on Android, iPhone, and desktop — works everywhere.", cat: "Platform & Setup" },
  { name: "Document Reuse", desc: "Save documents once and reuse them across future applications.", cat: "Platform & Setup" },
  { name: "Appointment Reminders", desc: "Automatic reminders so you never miss an embassy or consultation date.", cat: "Platform & Setup" },
];
