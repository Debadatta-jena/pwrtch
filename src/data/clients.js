const NAMES = [
  "M/s. Hindusthan Petroleum Corporation Limited, Paradeep",
  "Tenughat Vidyut Nigam Limited",
  "West Bengal Power Development Corporation Limited",
  "North Orissa Chamber of Commerce & Industry",
  "ICF International",
  "M/s. Nilachal Ispat Nigam Ltd",
  "M/s. Aaditya Kraft & Papers Private Limited",
  "M/s. Bharatiya Reserve Bank Note Mudran Private Limited",
  "M/s. MGM Mineral Limited",
  "Bureau of Energy Efficiency, Govt. of India",
  "Energy Efficiency Service Limited, Govt. of India",
  "Madhya Pradesh Urja Vikas Nigam Limited (M.P. Govt. undertaking)",
  "National Productivity Council (NPC, Govt. of India)",
  "Ministry of New and Renewable Energy, Govt. of India",
  "North Eastern Electricity Supply Company of Odisha Limited",
  "Southern Electricity Supply Company Of Odisha Limited",
  "Central Electricity Supply Utility of Odisha",
  "Director of Industries, Govt. of Odisha",
  "Odisha Power Transmission Corporation Ltd",
  "GRIDCO Limited",
  "Sugar Commissionerate",
  "Chhattisgarh State Renewable Energy Development Agency",
  "Gujarat Renewable Energy Development Agency",
  "Rural Electrification Corporation Ltd",
  "India SME Technology Services Ltd",
  "Petroleum Conservation Research Association",
  "M/s. National Aluminium Company Limited",
  "Odisha Electricity Regulatory Commission",
  "Ordnance Factory Badmal, Ministry of Defence",
  "M/s. Odisha Power Generation Corporation Limited",
  "Haryana Power Generation Corporation Limited, Panipath",
  "M/s. Tata Sponge Iron Limited",
  "M/s. Visa Steel Limited",
  "Facor Power Limited (FPL)",
  "M/s. Vedanta Aluminium Limited",
  "M/s. Sesa Sterlite Ltd",
  "M/s. JSL Limited",
  "Indian Rare Earths Limited, Odisha",
  "SCB Medical College & Hospital Building, Cuttack, Odisha",
  "VSS Medical College & Hospital Building, Burla, Sambalpur, Odisha",
  "Collectorate Building, Cuttack, Odisha",
  "Revenue Divisional Commissioner Building, Cuttack, Odisha",
  "DG Police Head Quarter, Cuttack, Odisha",
  "Revenue Divisional Commissioner Building, Sambalpur, Odisha",
  "OMFED, Bhubaneswar, Odisha",
  "Collectorate Building, SHAHDOL, Madhya Pradesh",
  "M/s. Odisha Power Consortium Limited",
  "M/s. KVK Nilachal Power Pvt. Limited",
  "M/s. Shivalik Power & Steel Pvt. Limited",
  "M/s. OCL Iron & Steel Private Limited",
  "M/s. Great Eastern Power Projects Private Limited",
  "Federation of Indian Chambers of Commerce & Industry",
  "M/s. Hari Machines Limited",
  "M/s. Indian Metals & Ferro Alloys Ltd",
  "M/s. Bhushan Power & Steel Limited",
  "M/s. Mandakini Coal Company Limited",
  "M/s Jayshree Chemicals Limited (JCL)",
  "M/s. Hindustan Petroleum Corporation Limited (HPCL), Mumbai",
  "M/s. Giral Lignite Thermal Power project, Rajasthan",
  "M/s. NTPC-Anta, Rajasthan",
  "M/s. Lignite Corp. Limited, Rajasthan",
  "M/s. Rajwest Power Pvt. Limited, Rajasthan",
  "M/s. Shree Bhogawati Sahakari Sakhar Karkhana Ltd",
  "M/s. IDBI Building, Kolkata",
  "M/s. UCO Bank Building, Kolkata",
  "M/s. Photon Energy system limited",
  "M/s. Emerson Network power India Pvt Ltd.",
  "M/s. Aarti Steel Ltd",
  "M/s. Shree Ganesh Metaliks Limited",
  "M/s. Adhunik Metaliks Ltd",
  "M/s. Concast Steel & Power Ltd",
  "M/s. New Laxmi Steel & Power Ltd.",
  "M/s. Kota Thermal Power Station, Rajasthan",
  "M/s. Ramgarh Combined Cycle Gas, Ramgarh, Rajasthan",
  "M/s. Suratgarh Thermal Power Station, Rajasthan",
  "M/s. Dholpur Combine Cycle Power Plant, Rajasthan",
  "M/s. Chabra Thermal Power Plant, Rajasthan",
  "M/s. Kalisindh thermal Power Project, Rajasthan",
  "Shri Vighnahar Sahakari Sakhar Karkhana Limited, Pune",
  "Sant Shiromani Vasantrao Kale Sahakari Sakhar Karkhana Ltd., Solapur",
  "Rena Sahkari Sakhar Karkhana, Pune",
  "Bhaurao Chavan Sahakari Sakhar Karkhana Ltd, Unit-3",
  "Bhaurao Chavan Sahakari Sakhar Karkhana Ltd, Unit-2",
  "M/s. Shalivahana Green energy Limited (SGEL)",
  "M/s Rashmee Power Pvt. Limited",
  "M/s. AVN Power Projects Private Limited (APPL)",
  "M/s. Prasad Bio-Energy Private Limited (PBPL)",
  "M/s. Andhavarapu Power Projects Private Limited (APPPL)",
  "M/s Nimai Charan Agro Products Private Limited (NCAPL)",
  "M/s. Primo Power & Infra Private Limited (PPIPL)",
  "M/s PRO Minerals Private Limited (PMPL)",
  "Utkal Green Energy Limited",
  "National Library, Kolkata",
  "United Nations Industrial Development Organization",
  "M/s. Paradeep Phosphates Limited",
  "Odisha Renewable Energy Development Agency",
  "M/s. Surendra Mining Industries (P) Ltd.",
  "M/s. Lumino Industries Limited",
  "Universal Instrument & Energy Solutions",
  "Abhisek Contech India Private Limited",
  "M/s. Utkal Alumina International Limited",
  "M/s. Tata Steel Limited",
  "M/s. Deepak Fertilisers and Petrochemicals Corporation",
  "Southern Petrochemical Industries Corporation Ltd",
  "M/s. Balasore Alloys Ltd",
];

function bucket(name) {
  const n = name.toLowerCase();
  if (/regulatory|commission|ministry|director|government|govt|bureau|npca?|npc|mnre|oreda|creda|geda|rec|pcra|sldc|discom|nesco|southco|cesu|optcl|gridco|urja/.test(n)) return "Government & Regulatory";
  if (/steel|alloy|sponge|ferro|metaliks|metals|ispot|iron|jsl|visa|tata|adhunik|concast|laxmi|balasore|sesa|vedanta|shivalik|kvk|rashmee|avn|prasad|andhavarapu|nimai|primo|pro minerals|utkal green|ocl|bhushan|great eastern|hari machines|imfa|nilachal/.test(n)) return "Steel, Alloys & Metals";
  if (/aluminium|alumina|rare earths|nalco|mgm mineral|surendra mining|lumino/.test(n)) return "Aluminium & Minerals";
  if (/thermal|power plant|power project|power generation|ntpc|kota|ramgarh|suratgarh|dholpur|chabra|kalisindh|rajwest|giral|lignite|tenughat|wbpdcl|hpgcl|opgc|powai/.test(n)) return "Power Generation";
  if (/renewable|solar|photon|emerson|sgel|utkal green/.test(n)) return "Renewable Energy";
  if (/petroleum|hpcl|petrochem|fertilisers|spic|deepak/.test(n)) return "Petroleum & Petrochemical";
  if (/bank|library|note mudran|uco|idbi|medical|college|collectorate|revenue|police|omfed|hospital/.test(n)) return "Institutions & Buildings";
  if (/sahakari|sakhar|sugar/.test(n)) return "Cooperative Sugar";
  if (/ficci|chamber|icf|universal|abhisek|aaditya|paradeep phosphates|commerce/.test(n)) return "Industry & Commerce";
  if (/coal|mandakini/.test(n)) return "Mining & Coal";
  return "Other Engagements";
}

export const CLIENTS = NAMES.map((name) => ({ name, category: bucket(name) }));

export const GROUPS = (() => {
  const map = new Map();
  for (const c of CLIENTS) {
    if (!map.has(c.category)) map.set(c.category, []);
    map.get(c.category).push(c);
  }
  return [...map.entries()].map(([group, items]) => ({ group, items }));
})();
