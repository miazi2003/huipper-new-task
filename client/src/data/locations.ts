export type GlobalLocation = {
  country: string;
  address: string[];
};

export const globalLocations: GlobalLocation[] = [
  { country: "United States", address: ["16 Cove Road", "Mount Arlington, NJ 07856"] },
  { country: "Australia", address: ["155 Bennett Rd, St Clair NSW", "2759"] },
  { country: "South Africa", address: ["55 Mons Rd, Bellevue East,", "Johannesburg, 2198"] },
  { country: "Singapore", address: ["6 Raffles Blvd, Marina", "Square"] },
  { country: "Italy", address: ["Via Bari, 9, 03043 Cassino,", "FR"] },
  { country: "Dubai", address: ["AlFattan Downtown - 32d St -", "Al Satwa"] },
  { country: "Cyprus", address: ["Estias 5, Strovolos", "2001"] },
  { country: "Bangladesh", address: ["Ventura Iconia, Plot 37 Road", "No. 11, Banani, Dhaka 1213"] },
];
