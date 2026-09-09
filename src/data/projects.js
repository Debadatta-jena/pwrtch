/* ---- Energy Audit & Energy Management (PTC) ---- */
const ENERGY_AUDIT = [
  {
    name: "PAT Baseline Energy Audits of Rajasthan Thermal Power Plants",
    company: "PTC", category: "Energy Audit", sector: "Thermal Power",
    client: "BEE PAT Scheme (NMEEE)", location: "Rajasthan",
    capacity: "6,858 MW aggregate", image: "thermal",
    scope: "Base Line Energy Audit of power plants under the Perform, Achieve and Trade (PAT) mechanism for: 250 MW Giral Lignite Thermal Power Project, Barmer; 420 MW NTPC-Anta, Baran; 1240 MW Kota Thermal Power Station, Kota; 110.5 MW Ramgarh Combined Cycle Gas, Ramgarh; 1500 MW Suratgarh Thermal Power Station, Suratgarh; 2x125 MW Neyveli Lignite Corp. Ltd., Bikaner; 3x110 MW Dholpur CCPP, Dholpur; 2x250 MW Chabra Thermal Power Plant, Baran; 2x600 MW Kalisindh Thermal Power Project, Jhalawar; 1080 MW Rajwest Power Pvt. Ltd., Barmer.",
  },
  {
    name: "PAT Cycle-V Baseline Data Collection & Verification Audit (28 Industries)",
    company: "PTC", category: "Energy Audit", sector: "Iron & Steel",
    client: "Bureau of Energy Efficiency", location: "India", image: "industrial",
    scope: "Baseline Data Collection and Verification Audit for PAT Scheme (PAT Cycle-V) for 28 energy-intensive industries: Alloy Steel Plant (SAIL), Salem Steel Plant (SAIL), Tata Steel Ltd., Vedanta Limited, Scan Steel Ltd., Surendra Mining Inds. P Ltd., Jai Balaji Jyoti Steels Limited, M/s. Sarda Energy & Minerals Ltd., Viraj Steel & Energy Ltd., Maa Shakambari Steel Ltd., Aarti Sponge & Power Pvt. Ltd., M/s. Raipur Power & Steel Ltd., M/s. G.R. Sponge And Power Ltd., Yazdani Steel & Power Ltd., Nav Durga Fuel Pvt. Ltd., Rameshvaram Steel & Power Ltd., Shri Shyam Ispat (India) Pvt. Ltd., N. R. Ispat & Power Pvt. Ltd., Shivalik Power & Steel Pvt. Ltd., Sunil Sponge Pvt. Ltd., SLV Steels & Alloys Pvt. Ltd., Vishal Metalliks Private Limited, Reliable Sponge P Ltd., Rishabh Sponge Pvt. Ltd., Electrosteel Casting Ltd., Chandrapur Ferro Alloys Ltd., Bilasraika Sponge Iron India (P) Ltd., Jeevika Industries Pvt. Ltd.",
  },
  {
    name: "Measurement & Verification Audits of Steel & Power Plants",
    company: "PTC", category: "Energy Audit", sector: "Iron & Steel",
    client: "Multiple", location: "India", image: "industrial",
    scope: "M & V Audit of: M/s. Tata Steel Limited, Jamshedpur; M/s. SMC Power Generation Limited; M/s. Aarti Steels Limited; M/s. Singhal Enterprises Ltd.; M/s. Rashmi Sponge Iron & Power Industries Limited; M/s. Anjani Steels Limited; M/s. Southern Petrochemical Industry Corporation Limited; M/s. Deepak Fertilisers and Petrochemicals Corp. Ltd.; Central Electricity Supply Utility of Odisha (CESU).",
  },
  {
    name: "Investment Grade Energy Audits of Government & Institutional Buildings",
    company: "PTC", category: "Energy Audit", sector: "Government / Institutional",
    client: "Govt. of Odisha / Govt. of India", location: "Odisha, MP, West Bengal", image: "institutional",
    scope: "Investment Grade Energy Audit (IGEA) of: Raj Bhawan, Odisha; Odisha Electricity Regulatory Commission (OERC), Bhubaneswar; SCB Medical College & Hospital, Cuttack; VSS Medical College & Hospital, Burla, Sambalpur; Collectorate Building, Cuttack; Board of Revenue Building, Cuttack; Revenue Divisional Commissioner Building, Cuttack; DG Police Head Quarter, Cuttack; Revenue Divisional Commissioner Building, Sambalpur; OMFED, Bhubaneswar; Collectorate Building, Shahdol (MP); National Library, Kolkata; IDBI Building, Kolkata; UCO Bank Building, Kolkata.",
  },
  {
    name: "Energy Audits of Cooperative Sugar Factories, Distillery & Cogeneration (Maharashtra)",
    company: "PTC", category: "Energy Audit", sector: "Sugar & Distillery",
    client: "Cooperative Sugar Factories", location: "Maharashtra", image: "industrial",
    scope: "Energy Audits of: Shri Vighnahar Sahakari Sakhar Karkhana Limited, Pune; Sant Shiromani Vasantrao Kale Sahakari Sakhar Karkhana Ltd., Solapur; Rena Sahkari Sakhar Karkhana, Pune; Bhaurao Chavan Sahakari Sakhar Karkhana Ltd, Unit-3; Shree Bhogawati Sahakari Sakhar Karkhana Ltd; Bhaurao Chavan Sahakari Sakhar Karkhana Ltd, Unit-2; Raosahebdada Pawar Ghodganga Sahakari Sakhar Kharkhana Ltd.",
  },
  {
    name: "Designated Consumer E-filing, Registration & Aluminium Sector Resource Mapping",
    company: "PTC", category: "Energy Audit", sector: "Aluminium / Cross-sector",
    client: "BEE & FICCI", location: "Odisha", image: "industrial",
    scope: "Energy Consumption Data Collection of all Designated Consumers in Odisha and Mandatory E-filing and Registration with Bureau of Energy Efficiency; Energy Study on Developing Resource Mapping, PMV system and Techno Economic Analysis for Energy Efficiency Improvement in Designated Consumers in Aluminium Sector - sponsored by BEE and FICCI.",
  },
  {
    name: "HPCL Petroleum Refinery Complex - Lighting Energy Audit",
    company: "PTC", category: "Energy Audit", sector: "Petroleum",
    client: "Hindustan Petroleum Corporation Limited (HPCL)", location: "Mumbai", image: "industrial",
    scope: "Lighting Energy Audit of the whole Petroleum Refinery Complex of HPCL, Mumbai.",
  },
  {
    name: "Ordnance Factory Badmal - Thermal & Electrical Energy Audit",
    company: "PTC", category: "Energy Audit", sector: "Defence",
    client: "Ordnance Factory Badmal, Ministry of Defence", location: "Balangir, Odisha", image: "industrial",
    scope: "Thermal & Electrical Energy Audit of Ordnance Factory, Badmal, Ministry of Defence, Balangir, Odisha.",
  },
  {
    name: "Ib Thermal Power Station - Detailed Energy Audit (2x210 MW)",
    company: "PTC", category: "Energy Audit", sector: "Thermal Power",
    client: "Odisha Power Generation", location: "Odisha", image: "thermal",
    scope: "Detailed Energy Audit of unit 2 x 210 MW at Ib Thermal Power Station, Odisha.",
  },
  {
    name: "Panipath Thermal Power Station - Detailed Energy Audit (2x250 MW, units 7 & 8)",
    company: "PTC", category: "Energy Audit", sector: "Thermal Power",
    client: "Haryana Power Generation Corporation Limited", location: "Panipath, Haryana", image: "thermal",
    scope: "Detailed Energy Audit of 2 x 250 MW, units 7 & 8, Panipath Thermal Power Station of M/s. Haryana Power Generation Corporation Limited.",
  },
  {
    name: "Visa Steel Ltd - Online Parameter Measurement (Coke Ovens)",
    company: "PTC", category: "Energy Audit", sector: "Iron & Steel",
    client: "M/s. Visa Steel Ltd.", location: "Odisha", image: "industrial",
    scope: "Online measurement of parameters like Maximum demand, Energy Consumption, Harmonics and unbalance for Coke Ovens plant of M/s. Visa Steel Ltd.",
  },
  {
    name: "NALCO - Energy Data & Smelter/Power Complex Audit (PAT)",
    company: "PTC", category: "Energy Audit", sector: "Aluminium",
    client: "M/s. National Aluminium Company Limited", location: "Damanjodi / Angul, Odisha", image: "industrial",
    scope: "Collection of energy consumption data and filing of Form-1 as per BEE guideline for NALCO, Damanjodi; Detailed Energy Audit of Smelter & Power Complex at NALCO, Angul under PAT Scheme as per BEE (Manner and Intervals of Time for conduct of Energy Audit) Regulations, 2010.",
  },
  {
    name: "MGM Minerals Ltd (Steel Division) - Detailed Energy Audit & Mining Audits",
    company: "PTC", category: "Energy Audit", sector: "Iron & Steel / Mining",
    client: "M/s. MGM Minerals Ltd.", location: "Odisha", image: "mining",
    scope: "Collection of energy consumption data and filing of Form-1 as per BEE guideline for MGM Minerals Ltd. (Steel Division); Detailed Energy Audit under PAT Scheme; Preliminary and Detailed Energy Audit with reference to recommendations of Energy Audit in Mining, Ore processing etc. as per Energy Conservation Act, 2001 and Indian Electricity Rules, 1956 and DGMS-Electrical circulars.",
  },
  {
    name: "Bharatiya Reserve Bank Note Mudran (Salboni) - Power Distribution Audit",
    company: "PTC", category: "Energy Audit", sector: "Manufacturing",
    client: "Bharatiya Reserve Bank Note Mudran Private Limited", location: "Salboni", image: "industrial",
    scope: "Detailed Energy Audit of Power Distribution System including Township at BRBNMPL Salboni; Basic Energy Audit of Power Distribution System including Township for consumption years 2014-15 & 2015-16.",
  },
  {
    name: "Jindal Stainless Ltd (Jajpur) - Detailed Energy Audit (PAT)",
    company: "PTC", category: "Energy Audit", sector: "Stainless Steel",
    client: "M/s. Jindal Stainless Limited", location: "Jajpur, Odisha", image: "industrial",
    scope: "Detailed Energy Audit of Jindal Stainless Limited, Jajpur, Odisha under PAT Scheme as per BEE Regulations, 2010.",
  },
  {
    name: "SMC Power Generation Ltd - Detailed Energy Audit (PAT)",
    company: "PTC", category: "Energy Audit", sector: "Power Generation",
    client: "M/s. SMC Power Generation Ltd.", location: "Odisha", image: "thermal",
    scope: "Detailed Energy Audit of SMC Power Generation Ltd, Odisha under PAT Scheme as per BEE Regulations, 2010.",
  },
  {
    name: "Tenughat Thermal Power Station - Detailed Energy Audit (PAT)",
    company: "PTC", category: "Energy Audit", sector: "Thermal Power",
    client: "Tenughat Vidyut Nigam Limited", location: "Jharkhand", image: "thermal",
    scope: "Detailed Energy Audit of Tenughat Thermal Power Station under PAT Scheme as per BEE Regulations, 2010.",
  },
  {
    name: "Santaldih Thermal Power Plant (WBPDCL) - Detailed Energy Audit (PAT)",
    company: "PTC", category: "Energy Audit", sector: "Thermal Power",
    client: "West Bengal Power Development Corporation Ltd.", location: "West Bengal", image: "thermal",
    scope: "Detailed Energy Audit of Santaldih Thermal Power Plant of WBPDCL under PAT Scheme as per BEE Regulations, 2010.",
  },
  {
    name: "Neelachal Ispat Nigam Ltd - Detailed & Mandatory Energy Audit (PAT)",
    company: "PTC", category: "Energy Audit", sector: "Iron & Steel",
    client: "M/s. Neelachal Ispat Nigam Ltd.", location: "Odisha", image: "industrial",
    scope: "Detailed Energy Audit under PAT Scheme; Mandatory energy audit for manufacturing unit under PAT Scheme for FY 2015-16, 2016-17 and 2017-18.",
  },
  {
    name: "Paradeep Phosphates Ltd - Detailed Energy Audit (PAT)",
    company: "PTC", category: "Energy Audit", sector: "Fertilizer",
    client: "M/s. Paradeep Phosphates Ltd.", location: "Paradeep, Odisha", image: "industrial",
    scope: "Detailed Energy Audit of M/s. Paradeep Phosphates Ltd under PAT Scheme as per BEE Regulations, 2010.",
  },
  {
    name: "Surat Textile Cluster - IE3 Motors Pilot Study (EESL)",
    company: "PTC", category: "Energy Audit", sector: "Textile",
    client: "Energy Efficiency Services Limited", location: "Surat, Gujarat", image: "industrial",
    scope: "Pilot Study for Establishing Deemed Saving in Implementation of IE3 Motors in place of Non-IE3 Motors at Surat Textile Cluster for EESL.",
  },
  {
    name: "Silicon Institute of Technology - Energy & Water Audit (MNRE Green Campus)",
    company: "PTC", category: "Energy Audit", sector: "Institutional",
    client: "Silicon Institute of Technology", location: "Bhubaneswar", image: "institutional",
    scope: "Detailed Energy and Water Audit of Silicon Institute of Technology, Bhubaneswar as required by MNRE under Green Campus Project.",
  },
  {
    name: "Aparna Carbons Pvt Ltd - Energy Audit, DPR & M&V (ISTSL scheme)",
    company: "PTC", category: "Energy Audit", sector: "Manufacturing",
    client: "M/s. Aparna Carbons Pvt. Ltd.", location: "Odisha", image: "industrial",
    scope: "Detailed Energy Audit and preparation of Detailed Project Report for Implementation of Energy Efficiency Project and providing M&V Support under ISTSL scheme.",
  },
  {
    name: "Surendra Mining Industries - Detailed Energy Audit & PAT Advisory",
    company: "PTC", category: "Energy Audit", sector: "Mining",
    client: "M/s. Surendra Mining Industries (P) Ltd.", location: "Odisha", image: "mining",
    scope: "Detailed Energy Audit and Providing PAT Consultancy & Advisory Services under PAT Scheme as per BEE Regulations, 2010.",
  },
  {
    name: "Rungta Mines Ltd - Detailed Energy Audit (PAT)",
    company: "PTC", category: "Energy Audit", sector: "Mining",
    client: "M/s. Rungta Mines Limited", location: "Odisha", image: "mining",
    scope: "Detailed Energy Audit of M/s. Rungta Mines Limited under PAT Scheme as per BEE Regulations, 2010 on behalf of M/s. Energy Consultancy Services.",
  },
  {
    name: "M.G Mohanty Mines (Barbil) - Detailed Energy Audit",
    company: "PTC", category: "Energy Audit", sector: "Mining",
    client: "M/s. M.G Mohanty Mines", location: "Barbil, Odisha", image: "mining",
    scope: "Conducted Detailed Energy Audit of M/s. M.G Mohanty Mines located at Barbil.",
  },
  {
    name: "NESCO Utility - Detailed Energy Audit (PAT)",
    company: "PTC", category: "Energy Audit", sector: "Utility / DISCOM",
    client: "North Eastern Electricity Supply Company of Odisha Ltd.", location: "Odisha", image: "transmission",
    scope: "Conducted Detailed Energy Audit of NESCO Utility (one of the reputed DISCOMs of Odisha) under PAT Scheme as per BEE Regulations, 2010.",
  },
  {
    name: "SOUTHCO Utility - Detailed Energy Audit (PAT)",
    company: "PTC", category: "Energy Audit", sector: "Utility / DISCOM",
    client: "Southern Electricity Supply Company Of Odisha Limited", location: "Odisha", image: "transmission",
    scope: "Conducted Detailed Energy Audit of SOUTHCO Utility (one of the reputed DISCOMs of Odisha) under PAT Scheme as per BEE Regulations, 2010.",
  },
  {
    name: "HEC, Ranchi - Detailed Energy Audit",
    company: "PTC", category: "Energy Audit", sector: "Heavy Engineering",
    client: "Heavy Engineering Corporation", location: "Ranchi", image: "industrial",
    scope: "Conducted detailed energy audit at HEC, Ranchi.",
  },
  {
    name: "SKS Ispat and Power Ltd (Raipur) - Walkthrough Audit",
    company: "PTC", category: "Energy Audit", sector: "Iron & Steel",
    client: "M/s. SKS Ispat and Power Ltd.", location: "Raipur", image: "industrial",
    scope: "Conducted Walkthrough Audit of M/s. SKS Ispat and Power Ltd., Raipur.",
  },
  {
    name: "Utkal Alumina Int Ltd - Lighting Audit",
    company: "PTC", category: "Energy Audit", sector: "Aluminium",
    client: "M/s. Utkal Alumina International Limited", location: "Odisha", image: "industrial",
    scope: "Conducted Lighting Audit at M/s. Utkal Alumina Int Ltd.",
  },
  {
    name: "OCL Iron & Steel (Rajgangpur) - Mandatory Audit & System Study",
    company: "PTC", category: "Energy Audit", sector: "Iron & Steel",
    client: "M/s. OCL Iron & Steel Private Limited", location: "Rajgangpur, Odisha", image: "industrial",
    scope: "Conducted Mandatory Energy Audit of M/s. OCL Iron and Steel Limited, Rajgangpur; Conducted System Study and Relay Co-ordination Consultancy Services at M/s. OCL Iron and Steel Limited, Rajgangpur.",
  },
  {
    name: "Tata Steel BSL Ltd - Mandatory Energy Audit",
    company: "PTC", category: "Energy Audit", sector: "Iron & Steel",
    client: "M/s. Tata Steel BSL Limited", location: "Odisha", image: "industrial",
    scope: "Conducted Mandatory Energy Audit of M/s. Tata Steel BSL Limited.",
  },
  {
    name: "Balasore Alloys Ltd - Detailed Energy Audit & PAT Advisory",
    company: "PTC", category: "Energy Audit", sector: "Alloys",
    client: "M/s. Balasore Alloys Limited", location: "Odisha", image: "industrial",
    scope: "Conducted Detailed Energy Audit and Providing PAT Consultancy & Advisory Services to M/s. Balasore Alloys Limited under PAT Scheme as per BEE.",
  },
  {
    name: "Tata Steel Ltd (Jamshedpur) - M&V Audit (PAT Rules 2016)",
    company: "PTC", category: "Energy Audit", sector: "Iron & Steel",
    client: "M/s. Tata Steel Limited", location: "Jamshedpur", image: "industrial",
    scope: "Conducted M & V Audit of Tata Steel Limited, Jamshedpur under PAT Scheme as per BEE PAT Rules 2016.",
  },
  {
    name: "Traction Sub Station Kaipadar Road/TSS - Energy Study",
    company: "PTC", category: "Energy Audit", sector: "Railways",
    client: "Khurda Road Division (Indian Railways)", location: "Odisha", image: "infrastructure",
    scope: "Conducted energy study of Traction Sub Station at Kaipadar Road/TSS of Khurda Road Division.",
  },
];
/* ---- Power Trading & Regulatory (SSPTPL / PTC advisory) ---- */
const TRADING = [
  {
    name: "Regulatory Advisory - Vedanta Limited",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Aluminium",
    client: "Vedanta Limited", location: "Odisha", image: "regulatory",
    scope: "Technical Consultancy and advisory service for regulatory issues for Vedanta Limited.",
  },
  {
    name: "Regulatory Advisory - Jindal Stainless Limited",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Stainless Steel",
    client: "Jindal Stainless Limited", location: "Odisha", image: "regulatory",
    scope: "Technical Consultancy and advisory service for regulatory issues for Jindal Stainless Limited.",
  },
  {
    name: "Power Trading Advisory - Tata Sponge Iron Ltd",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Iron & Steel",
    client: "M/s. Tata Sponge Iron Ltd.", location: "Odisha", image: "regulatory",
    scope: "Technical Consultancy and advisory service for Power Trading of M/s. Tata Sponge Iron Ltd.",
  },
  {
    name: "Regulatory Advisory - Visa Steel Ltd",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Iron & Steel",
    client: "M/s. Visa Steel Ltd.", location: "Odisha", image: "regulatory",
    scope: "Technical Consultancy and advisory service for regulatory issues for M/s. Visa Steel Ltd.",
  },
  {
    name: "OPTCL Grid Support Charges Objection (Visa Steel, OERC)",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Iron & Steel",
    client: "M/s. Visa Steel Ltd.", location: "Odisha", image: "regulatory",
    scope: "Preparation, filing of objection and attending hearing in OERC in the matter of application filed by OPTCL for levy of Grid Support Charges for captive generating plant running in parallel with OPTCL GRID for Visa Steel Ltd.",
  },
  {
    name: "Group Captive Route Power Availment - Jayshree Chemicals",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Chemicals",
    client: "M/s. Jayshree Chemicals Ltd.", location: "Odisha", image: "regulatory",
    scope: "Providing technical consultancy, advisory and liasioning services for availing power through Group Captive Route for M/s. Jayshree Chemicals Ltd.",
  },
  {
    name: "IEX Power Sale (12 MW) - Visa Steel Ltd",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Iron & Steel",
    client: "M/s. Visa Steel Ltd.", location: "Odisha", image: "trading",
    scope: "Providing technical consultancy, advisory and liasioning services for sale of 12 MW Power through IEX Ltd for M/s. Visa Steel Ltd.",
  },
  {
    name: "OERC Grid Support Charges Hearing - Visa Steel Ltd",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Iron & Steel",
    client: "M/s. Visa Steel Limited", location: "Odisha", image: "regulatory",
    scope: "Preparation, filing of objection and attending the hearing in OERC in the matter of Grid Support Charges (GSC) for M/s. Visa Steel Limited.",
  },
  {
    name: "OERC RPO Petition - JSL Limited",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Iron & Steel",
    client: "M/s. JSL Limited", location: "Odisha", image: "regulatory",
    scope: "Preparation, filing of petition and attending the hearing in OERC in the matter of Renewable Purchase Obligation (RPO) for M/s. JSL Limited.",
  },
  {
    name: "OERC RPO Petition - Tata Sponge Iron Ltd",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Iron & Steel",
    client: "M/s. Tata Sponge Iron Limited", location: "Odisha", image: "regulatory",
    scope: "Preparation, filing of petition and attending the hearing in OERC in the matter of Renewable Purchase Obligation (RPO) for M/s. Tata Sponge Iron Limited.",
  },
  {
    name: "OERC RPO Petition - Bhushan Steel & Power Ltd",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Iron & Steel",
    client: "M/s. Bhushan Steel & Power Limited", location: "Odisha", image: "regulatory",
    scope: "Preparation, filing of petition and attending the hearing in OERC in the matter of Renewable Purchase Obligation (RPO) for M/s. Bhushan Steel & Power Limited.",
  },
  {
    name: "OERC RPO Petition - Visa Steel Ltd",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Iron & Steel",
    client: "M/s. Visa Steel Limited", location: "Odisha", image: "regulatory",
    scope: "Preparation, filing of petition and attending the hearing in OERC in the matter of Renewable Purchase Obligation (RPO) for M/s. Visa Steel Limited.",
  },
  {
    name: "Tariff Approval Petition - Sterlite Energy Ltd (4x600 MW)",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Thermal Power",
    client: "M/s. Sterlite Energy Limited", location: "Odisha", image: "regulatory",
    scope: "Preparation, filing of petition and attending the hearing in OERC in the matter of approval of tariff of 4x600 MW coal based Thermal power plant of M/s. Sterlite Energy Limited.",
  },
  {
    name: "GRIDCO AAR/BSP Response (FY2009-10 to 2018-19)",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Utility",
    client: "GRIDCO Limited", location: "Odisha", image: "regulatory",
    scope: "Preparation of Response to the Petition of GRIDCO in the matter of approval of Annual Revenue Requirement (AAR) and determination of Bulk Supply Price (BSP) for FY2009-10, 2011-12, 2012-13, 2013-14, 2014-15, 2015-16, 2016-17, 2017-18 and 2018-19 under section 86(1)(b) and OERC regulations.",
  },
  {
    name: "OPTCL AAR/BSP Response (FY2009-10 to 2018-19)",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Utility",
    client: "OPTCL", location: "Odisha", image: "regulatory",
    scope: "Preparation of Response to the Petition of OPTCL in the matter of approval of Annual Revenue Requirement (AAR) and determination of Bulk Supply Price (BSP) for FY2009-10 to 2018-19 under OERC regulations.",
  },
  {
    name: "DISCOMs AAR & Transmission Tariff Response (CESU/WESCO/SOUTHCO/NESCO)",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Utility",
    client: "CESU, WESCO, SOUTHCO, NESCO", location: "Odisha", image: "regulatory",
    scope: "Preparation of Response to the Petition of DISCOMs in the matter of approval of Annual Revenue Requirement and Transmission Tariff for FY2009-10 to 2018-19 under the Electricity Act, 2003 and OERC regulations.",
  },
  {
    name: "DISCOMs Open Access Charges Response (FY2009-10 to 2018-19)",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Utility",
    client: "CESU, WESCO, SOUTHCO, NESCO", location: "Odisha", image: "regulatory",
    scope: "Preparation of Response to the Petition of DISCOMs in the matter of Approval of Open Access Charges for FY2009-10 to 2018-19 under the Electricity Act, 2003 and OERC Open Access regulations.",
  },
  {
    name: "WESCO Open Access Charges Response (2017-18) - ACC Limited",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Cement",
    client: "M/s. ACC Limited", location: "Odisha", image: "regulatory",
    scope: "Preparation of Response to the petition of WESCO in the matter of Approval of Open Access Charges in 2017-18 for M/s. ACC Limited.",
  },
  {
    name: "SLDC AAR & Fees/Charges Response",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Utility",
    client: "State Load Despatch Centre (SLDC)", location: "Odisha", image: "regulatory",
    scope: "Preparation of Response to the Petition of SLDC for determination of Annual Revenue Requirement and Fees and Charges on behalf of M/s. Visa Steel Limited, M/s. Facor Power Limited and North Orissa Chamber of Commerce & Industry.",
  },
  {
    name: "NESCO Tariff Finalization (FY2012-13 to 2018-19) - Visa Steel",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Iron & Steel",
    client: "M/s. Visa Steel Limited", location: "Odisha", image: "regulatory",
    scope: "Preparation, filing of objection and attending the hearing in OERC in the matter of determination of Annual Revenue Requirement and Tariff finalization of NESCO for FY 2012-13 to 2018-19 on behalf of M/s. Visa Steel Limited.",
  },
  {
    name: "GRIDCO Tariff Finalization (FY2012-13 & 2015-16) - Sterlite Energy",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Thermal Power",
    client: "Sterlite Energy Limited", location: "Odisha", image: "regulatory",
    scope: "Preparation, filing of objection and attending the hearing in OERC in the matter of determination of Annual Revenue Requirement and Tariff finalization of GRIDCO for FY 2012-13 & 2015-16 on behalf of Sterlite Energy Limited.",
  },
  {
    name: "Biomass Tariff Petitions (OERC) - Six 10-20 MW Plants",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Renewable",
    client: "Multiple Biomass Developers", location: "Odisha", image: "regulatory",
    scope: "Preparation of Petition for approval of Tariff of Biomass Power Plants, filing in OERC, technical presentation and attending tariff hearing for: 10 MW Rasmee Power Pvt. Limited; 10 MW AVN Power Projects Pvt. Limited; 10 MW Prasad Bio Energy Pvt. Limited; 10 MW Andhavarapu Power Projects Pvt. Limited; 20 MW Shalivahana Green Energy Limited; 10 MW Satya Bio Power (India) Pvt. Limited.",
  },
  {
    name: "KVK Nilachal Power (3x350 MW) - Regulatory & PPA with GRIDCO",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Thermal Power",
    client: "M/s. KVK Nilachal Power Pvt. Limited (KNPL)", location: "Cuttack, Odisha", image: "regulatory",
    scope: "Technical Consultancy on Regulatory Affairs, Tariff Based Competitive Bidding, Filing of Tariff Petition and Capital cost approval before OERC, and Modelling & Signing of Power Purchase Agreement with GRIDCO for 3x350 MW Thermal Power Plant.",
  },
  {
    name: "OCL Iron & Steel (14 MW CGP) - PPA Modelling & Signing with GRIDCO",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Iron & Steel",
    client: "M/s. OCL Iron & Steel Limited", location: "Rajgangpur, Odisha", image: "regulatory",
    scope: "Technical Consultancy and advisory service for Modelling and signing of Power Purchase Agreement between GRIDCO & OISL for sale of surplus power from the 14 MW CGP of OCL Iron & Steel Limited.",
  },
  {
    name: "OERC Technical Presentations (Public Notice, RPO, Biomass Tariff)",
    company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Regulatory",
    client: "Odisha Electricity Regulatory Commission", location: "Odisha", image: "regulatory",
    scope: "Technical Presentation before Hon'ble OERC in Case No. 01/2010 (Public Notice on Power Regulation), Case No. 59/2010 (finalization of RPO Regulation, 2010), and Cases 112-116/2010 (determination of tariff for sale of power from Biomass Power Plants to GRIDCO).",
  },
];
/* ---- Renewable / PMC (PTC + SSPTPL) ---- */
const RENEWABLE = [
  {
    name: "Rashmee Power Pvt Ltd (RPPL) - 10 MW Biomass Power Plant Owner's Engineer",
    company: "PTC", category: "Renewable", sector: "Biomass",
    client: "M/s. Rashmee Power Pvt. Limited (RPPL)", location: "Boudh District, Odisha", image: "renewable",
    scope: "Basic Engineering, Detailed Engineering, Project management Consultancy, preparation of Tender Specification, Techno commercial evaluation and Providing Owner's Engineer services for establishment of 10 MW Biomass Power Plant.",
  },
  {
    name: "UNDP/GEF Biomass DPR & Verification - DEE VEE Power & Verde Renewable",
    company: "PTC", category: "Renewable", sector: "Biomass",
    client: "MNRE (UNDP/GEF assisted)", location: "Karnataka, West Bengal", image: "renewable",
    scope: "Preparation of Detail Project Report and Validation cum Verification Reports for Biomass based Power / Cogeneration Project under UNDP/GEF assisted project of MNRE for M/s. DEE VEE Power in Kushalnagar, Karnataka and M/s Verde Renewable Pvt. Limited in Galsi, West Bengal.",
  },
  {
    name: "Jayshree Chemicals - 30 MW Multi-fuel Biomass Assessment (Ganjam)",
    company: "PTC", category: "Renewable", sector: "Biomass",
    client: "M/s. Jayshree Chemicals Limited", location: "Ganjam, Odisha", image: "renewable",
    scope: "Survey on Biomass assessment, Biomass Pricing, Biomass actual availability in Ganjam district and Preparation of a complete Biomass Assessment study report for establishment of Multi-fuel based 30 MW Power Plant.",
  },
  {
    name: "Lumino Industries - 24000 TPA Conductor Plant TEFR (Angul Aluminium Park)",
    company: "PTC", category: "Industrial", sector: "Manufacturing",
    client: "M/s. Lumino Industries Limited", location: "Angul, Odisha", image: "industrial",
    scope: "Providing Technical Consultancy for Preparation of Techno Economic Feasibility Report (TEFR) of 24000 TPA Conductor manufacturing plant in Angul Aluminium Park, Odisha.",
  },
  {
    name: "Abhisek Contech - Fastener Plant DPR & EV/Solar Inverter Charging Station DPR",
    company: "PTC", category: "Industrial", sector: "Manufacturing",
    client: "M/s. Abhisek Contech India Pvt. Ltd", location: "Odisha", image: "industrial",
    scope: "Preparation of Detailed Project Report for establishment of fastener manufacturing plant and for establishment of Electric Vehicles and solar inverter based charging station in Odisha.",
  },
  {
    name: "Swain & Sons Agro Tech - 5000 Ton Cold Storage DPR (State Potato Mission)",
    company: "PTC", category: "Industrial", sector: "Agro-tech",
    client: "M/s. Swain & Sons Agro Tech", location: "Cuttack, Odisha", image: "industrial",
    scope: "Providing Technical Consultancy for Preparation of Detailed Project Report (DPR) of establishment of 5000 Ton Cold Storage in Cuttack District, Odisha under State Potato Mission.",
  },
  {
    name: "Excel Industries - FLG Bricks DPR (Kalinga Nagar)",
    company: "PTC", category: "Industrial", sector: "Manufacturing",
    client: "M/s. Excel Industries", location: "Kalinga Nagar, Jajpur, Odisha", image: "industrial",
    scope: "Providing Technical Consultancy for Preparation of Detailed Project Report (DPR) of establishment of Fly Ash Lime Gypsum Bricks Manufacture Industry at Kalinga Nagar Industrial Complex, Jajpur District.",
  },
  {
    name: "Swain Metals - Engineering & Metal Industry DPR (Kalinga Nagar)",
    company: "PTC", category: "Industrial", sector: "Metal",
    client: "M/s. Swain Metals", location: "Kalinga Nagar, Jajpur, Odisha", image: "industrial",
    scope: "Providing Technical Consultancy for Preparation of Detailed Project Report (DPR) of establishment of Engineering and Metal based Industry at Kalinga Nagar Industrial Complex, Jajpur District.",
  },
  {
    name: "Srinivasulu Real Estates - Resort Hotels TEFR (Berhampur)",
    company: "PTC", category: "Tourism", sector: "Tourism",
    client: "M/s. Srinivasulu Real Estates & Constructions", location: "Berhampur, Odisha", image: "infrastructure",
    scope: "Preparation of Techno Economic Feasibility Report for Establishment of Resort Hotels.",
  },
  {
    name: "District Renewable Energy Plans - OREDA",
    company: "PTC", category: "Renewable", sector: "Renewable Policy",
    client: "Odisha Renewable Energy Development Agency", location: "Odisha", image: "renewable",
    scope: "Providing Technical Consultancy for Preparation of District Renewable Energy Plans for different districts of the state under OREDA.",
  },
];

/* ---- Transmission & Distribution (PTC) ---- */
const TRANSMISSION = [
  {
    name: "CESU Third Party SOP Audit - TED-Chainpal / PEP-Paradeep (2017-18)",
    company: "PTC", category: "Transmission", sector: "Utility / DISCOM",
    client: "Central Electricity Supply Utility of Odisha (CESU)", location: "Odisha", image: "transmission",
    scope: "Conducted Third Party Audit on SOP of TED-Chainpal, PEP-Paradeep under CESU for 2017-18.",
  },
  {
    name: "IMFA 132 KV Grid Load Stability Study (Choudwar)",
    company: "PTC", category: "Transmission", sector: "Ferro Alloys",
    client: "M/s. Indian Metals & Ferro Alloys Ltd", location: "Choudwar, Odisha", image: "transmission",
    scope: "Study of the load stability of 132 KV Grid at Choudwar in order to avoid frequent islanding operation of the units of IMFA due to frequent grid disturbances.",
  },
  {
    name: "CESU Third Party SOP Audits - Cuttack Divisions (2016-17)",
    company: "PTC", category: "Transmission", sector: "Utility / DISCOM",
    client: "Central Electricity Supply Utility of Odisha (CESU)", location: "Cuttack, Odisha", image: "transmission",
    scope: "Conducted Third Party Audit on SOP of CDD-I / CED-Cuttack / JED-Jagatsinghpur under CESU for 2016-17, and CDD-II Division, Cuttack under CESU.",
  },
  {
    name: "SOUTHCO Third Party SOP Audits (Berhampur Circle)",
    company: "PTC", category: "Transmission", sector: "Utility / DISCOM",
    client: "Southern Electricity Supply Company Of Odisha Limited (SOUTHCO)", location: "Berhampur, Odisha", image: "transmission",
    scope: "Conducted Third Party Audit on SOP for BED-1, Berhampur; GNED, Chatrapur; and PSED, Purusottampur of Berhampur circle under SOUTHCO.",
  },
  {
    name: "ICF International - Solar PV Grid Feasibility Survey (Odisha)",
    company: "PTC", category: "Transmission", sector: "Renewable",
    client: "M/s. ICF International", location: "Odisha", image: "solar",
    scope: "Conducted feasibility survey of the existing Grid Substation of Odisha for the purpose of Power Evacuation from Proposed Solar PV Plant to be established in Odisha.",
  },
  {
    name: "132 KV Joda-Polasponga-Karanjia SC Line - River Bed Soil Testing",
    company: "PTC", category: "Transmission", sector: "Transmission",
    client: "OPTCL (EHT O&M Division, Joda)", location: "Joda, Odisha", image: "transmission",
    scope: "Conducted Soil testing for river bed pile foundation (inside the Baitarani river bed) in between location no. 109 & 110 of 132 KV Joda-Polasponga-Karanjia SC Line.",
  },
  {
    name: "OPTCL - 2x40 MVA 132/33 KV Grid Substation at Agarpada + LILO Line",
    company: "PTC", category: "Transmission", sector: "Transmission",
    client: "Odisha Power Transmission Corporation Ltd (OPTCL)", location: "Odisha", image: "transmission",
    scope: "Preparation of Detailed Project Report of 2x40 MVA, 132/33 KV Grid Substation at Agarpada and its associate LILO Line; Preparation of Detailed BoQ of Transmission Line and substation, Estimate and DPR for upcoming project of OPTCL.",
  },
  {
    name: "Aaditya Kraft & Papers - 33 KV T/L & Substation PMC",
    company: "PTC", category: "Transmission", sector: "Manufacturing",
    client: "M/s. Aaditya Kraft & Papers Private Limited", location: "Odisha", image: "transmission",
    scope: "Technical and Project Management Consultancy for construction of 33 KV transmission line and Substation for providing power supply.",
  },
  {
    name: "Mandakini Coal Company - 33 KV Mines T-Line Route Alignment & BoQ",
    company: "PTC", category: "Transmission", sector: "Mining",
    client: "M/s. Mandakini Coal Company Limited", location: "Odisha", image: "transmission",
    scope: "Technical and Project Management Consultancy, Route Alignment Survey of 33 KV line and Preparation of BoQ, technical specification, tender document and vendor finalization for Mines Project.",
  },
  {
    name: "Tata Sponge Iron - Captive Plant Transmission Consultancy & Tender (Angul)",
    company: "PTC", category: "Transmission", sector: "Iron & Steel",
    client: "M/s. Tata Sponge Iron Limited", location: "Radhikapur East (Angul), Odisha", image: "transmission",
    scope: "Route alignment survey of 33/132/220/400 KV Transmission line, conceptual study report for development of Power Infrastructure for the proposed coal block, coal washery, and 2x80 MW Captive Generating Plant, obtaining OPTCL clearance for grid connectivity and preparation of Tender Document.",
  },
  {
    name: "OCL Iron & Steel - EHT Line Diversion Consultancy (Rajgangpur)",
    company: "PTC", category: "Transmission", sector: "Iron & Steel",
    client: "M/s. OCL Iron & Steel Limited", location: "Rajgangpur, Odisha", image: "transmission",
    scope: "Route alignment survey, Bill of Quantities, technical specification, tender document and vendor finalization for diversion of 220 KV Double Circuit, 132 KV Double Circuit and 132 KV Single Circuit Power Transmission Lines from OCL premises; issuance of in-principle permission from OPTCL.",
  },
  {
    name: "Hari Machines Ltd - EHT Line Diversion Consultancy (Rajgangpur)",
    company: "PTC", category: "Transmission", sector: "Engineering",
    client: "M/s. Hari Machines Ltd", location: "Rajgangpur, Sundargarh, Odisha", image: "transmission",
    scope: "Route alignment survey of Diversion EHT lines, technical specification, detailed BoQ, technical consultancy for issuance of in-principle permission from OPTCL and approval of survey and sanction of estimates of Diversion, and technical assistance in selection of contractors.",
  },
  {
    name: "Pro Minerals Pvt Ltd - Beneficiation/Pelletization Plant Connectivity (Keonjhar)",
    company: "PTC", category: "Transmission", sector: "Mining",
    client: "M/s. Pro Minerals Private Limited", location: "Bas Vantpur, Keonjhar, Odisha", image: "transmission",
    scope: "Technical Consultancy for conducting system study, issuance of in-principle permission from OPTCL for effecting power supply and grid connectivity to the Iron Ore Beneficiation and pelletization plant.",
  },
  {
    name: "KVK Nilachal Power - 3x350 MW Connectivity with PGCIL (400 KV) & BPTA",
    company: "PTC", category: "Transmission", sector: "Thermal Power",
    client: "M/s. KVK Nilachal Power Pvt. Limited (KNPL)", location: "Cuttack, Odisha", image: "transmission",
    scope: "Technical Consultancy for Connectivity of 3x350 MW Thermal Power Plant with Central Transmission Utility (PGCIL) at 400 KV for Evacuation of Power, Signing of Bulk Power Transmission Agreement (BPTA) with PGCIL for Long Term Open Access.",
  },
  {
    name: "Maa Mangala Industries - 10 MW Solar PV Patna Evacuation & Grid Connectivity",
    company: "PTC", category: "Transmission", sector: "Renewable",
    client: "M/s. Maa Mangala Industries", location: "Patna, Keonjhar, Odisha", image: "solar",
    scope: "Technical & Project Management consultancy, Route Alignment Survey and preparation of BoQ for evacuation of Power generated from 10 MW Solar PV Power Plant and connectivity with 132/33 KV Grid substation of OPTCL at Karanjia.",
  },
  {
    name: "NESCO - Disaster Resilient Power System DPR (50 KM sea-shore)",
    company: "PTC", category: "Transmission", sector: "Utility / DISCOM",
    client: "North Eastern Electricity Supply Company of Odisha Ltd.", location: "Odisha", image: "transmission",
    scope: "Technical Consultancy Services for survey, System Study and DPR preparation for Development of Disaster Resilient Power System strengthening the distribution system against cyclone and flood within 50 KM span from sea-shore under NESCO.",
  },
  {
    name: "SOUTHCO - Disaster Resilient Power System DPR (50 KM sea-shore)",
    company: "PTC", category: "Transmission", sector: "Utility / DISCOM",
    client: "Southern Electricity Supply Company Of Odisha Limited", location: "Odisha", image: "transmission",
    scope: "Technical Consultancy Services for survey, System Study and DPR preparation for Development of Disaster Resilient Power System strengthening the distribution system against cyclone and flood within 50 KM span from sea-shore under SOUTHCO.",
  },
  {
    name: "CESU - Disaster Resilient Power System DPR (60 KM sea-shore)",
    company: "PTC", category: "Transmission", sector: "Utility / DISCOM",
    client: "Central Electricity Supply Utility of Odisha (CESU)", location: "Odisha", image: "transmission",
    scope: "Technical Consultancy Services for survey, System Study and DPR preparation for Development of Disaster Resilient Power System strengthening the distribution system against cyclone and flood within 60 KM span from sea-shore under CESU.",
  },
];
/* ---- Industrial (PTC) ---- */
const INDUSTRIAL = [
  {
    name: "IMFA - 2x30 MVA Ferro-Chrome + 10 MW WHRB Captive Power - TEFR",
    company: "PTC", category: "Industrial", sector: "Ferro Alloys",
    client: "M/s. Indian Metals & Ferro Alloys Limited (IMFA)", location: "Kalinganagar, Duburi, Odisha", image: "industrial",
    capacity: "2x30 MVA + 10 MW WHRB", scope: "Techno Economic Feasibility Report (TEFR) for 2 x 30 MVA Ferro-Chrome Plant and 10 MW WHRB based Captive Power Plant.",
  },
  {
    name: "Jindal (India) Ltd - Cold Rolling Mill & Steel Processing - TEFR",
    company: "PTC", category: "Industrial", sector: "Steel",
    client: "M/s. Jindal (India) Limited", location: "Kalinga Nagar Industrial Complex, Jajpur, Odisha", image: "industrial",
    scope: "Techno Economic Feasibility Report (TEFR) for Large Scale Cold Rolling Mill Complex and Steel Processing Plant.",
  },
  {
    name: "Shyam Cylinder Pvt Ltd - Steel Rolling & Cylinder Plant - TEFR",
    company: "PTC", category: "Industrial", sector: "Steel",
    client: "M/s. Shyam Cylinder Pvt. Ltd", location: "Kalinga Nagar Industrial Complex, Odisha", image: "industrial",
    scope: "Techno Economic Feasibility Report (TEFR) for 0.3 MTPA Steel Rolling-cum-Processing Plant along with 2500 nos. of cylinder manufacturing facility.",
  },
  {
    name: "Lumino Industries - Conductor Plant TEFR",
    company: "PTC", category: "Industrial", sector: "Manufacturing",
    client: "M/s. Lumino Industries Limited", location: "Angul, Odisha", image: "industrial",
    scope: "Techno Economic Feasibility Report (TEFR) for 24000 TPA Conductor manufacturing plant in Angul Aluminium Park.",
  },
  {
    name: "Abhisek Contech - Fastener Plant DPR",
    company: "PTC", category: "Industrial", sector: "Manufacturing",
    client: "M/s. Abhisek Contech India Pvt. Ltd", location: "Odisha", image: "industrial",
    scope: "Detailed Project Report for establishment of fastener manufacturing plant.",
  },
  {
    name: "Abhisek Contech - EV & Solar Inverter Charging Station DPR",
    company: "PTC", category: "Industrial", sector: "EV / Renewable",
    client: "M/s. Abhisek Contech India Pvt. Ltd", location: "Odisha", image: "industrial",
    scope: "Detailed Project Report for establishment of Electric Vehicles and solar inverter based charging station.",
  },
  {
    name: "Swain & Sons Agro Tech - 5000 Ton Cold Storage DPR",
    company: "PTC", category: "Industrial", sector: "Agro-tech",
    client: "M/s. Swain & Sons Agro Tech", location: "Cuttack, Odisha", image: "industrial",
    scope: "Detailed Project Report for establishment of 5000 Ton Cold Storage under State Potato Mission.",
  },
  {
    name: "Excel Industries - FLG Bricks DPR",
    company: "PTC", category: "Industrial", sector: "Manufacturing",
    client: "M/s. Excel Industries", location: "Kalinga Nagar, Jajpur, Odisha", image: "industrial",
    scope: "Detailed Project Report for establishment of Fly Ash Lime Gypsum Bricks Manufacture Industry.",
  },
  {
    name: "Swain Metals - Engineering & Metal Industry DPR",
    company: "PTC", category: "Industrial", sector: "Metal",
    client: "M/s. Swain Metals", location: "Kalinga Nagar, Jajpur, Odisha", image: "industrial",
    scope: "Detailed Project Report for establishment of Engineering and Metal based Industry.",
  },
  {
    name: "SSPTPL - EV & Solar Inverter Charging Station DPR",
    company: "SSPTPL", category: "Industrial", sector: "EV / Renewable",
    client: "M/s. Swain & Sons Power Tech Pvt. Ltd", location: "Odisha", image: "industrial",
    scope: "Detailed Project Report for establishment of Electric Vehicles and solar inverter based charging station.",
  },
];

/* ---- Tourism (PTC) ---- */
const TOURISM = [
  {
    name: "Deo Residency & Resorts - Resort Hotel Extension - TEFR",
    company: "PTC", category: "Tourism", sector: "Tourism",
    client: "M/s. Deo Residency & Resorts Private Limited", location: "Duburi, Jajpur, Odisha", image: "infrastructure",
    scope: "Techno-Economic Feasibility Report for Extension of Resort Hotel Project.",
  },
  {
    name: "BP Beachfront Eco Resorts - Chandrabhaga Golf Resort - TEFR",
    company: "PTC", category: "Tourism", sector: "Tourism",
    client: "M/s. BP Beachfront Eco Resorts Private Limited", location: "Konark, Odisha", image: "infrastructure",
    scope: "Techno-Economic Feasibility Report for Establishment of Chandrabhaga Golf Resort Near Konark.",
  },
  {
    name: "Utkal Nirman - Convention Centre - TEFR",
    company: "PTC", category: "Tourism", sector: "Tourism",
    client: "M/s. Utkal Nirman", location: "Bhubaneswar, Odisha", image: "infrastructure",
    scope: "Techno-Economic Feasibility Report for Establishment of Convention Centre Project.",
  },
  {
    name: "Srinivasulu Real Estates - Resort Hotels - TEFR",
    company: "PTC", category: "Tourism", sector: "Tourism",
    client: "M/s. Srinivasulu Real Estates & Constructions", location: "Berhampur, Odisha", image: "infrastructure",
    scope: "Techno Economic Feasibility Report (TEFR) for Establishment of Resort Hotels.",
  },
];

/* ---- SSPTPL power trading volumes, solar EPC & BEEP (real achievements) ---- */
const SSPTPL = [
  { name: "40 MW Power Supply - Linde India Ltd to IEX", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Power Trading", client: "Linde India Ltd / IEX", location: "India", capacity: "40 MW", image: "trading", scope: "Power supply of 40 MW of Power from Linde India Ltd to IEX." },
  { name: "20 MW Power Supply - IEX to Adhunik Metaliks Ltd", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Power Trading", client: "IEX / Adhunik Metaliks Ltd", location: "India", capacity: "20 MW", image: "trading", scope: "Power supply of 20 MW of Power from IEX to Adhunik Metaliks Limited." },
  { name: "20 MW Power Supply - IEX to Comcast Steel & Power Ltd", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Power Trading", client: "IEX / Comcast Steel & Power Ltd", location: "India", capacity: "20 MW", image: "trading", scope: "Power supply of 20 MW of Power from IEX to Comcast Steel & Power Limited." },
  { name: "4 MW Power Supply - APNRL to AML", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Power Trading", client: "APNRL / AML", location: "India", capacity: "4 MW", image: "trading", scope: "Power supply of 4 MW of Power from APNRL to AML." },
  { name: "16 MW Power Transfer - Tata Sponge Iron Ltd to Tata Steel Ltd, Joda", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Power Trading", client: "Tata Sponge Iron Ltd / Tata Steel Ltd", location: "Joda, Odisha", capacity: "16 MW", image: "trading", scope: "Power supply of 16 MW of Power from Tata Sponge Iron Limited to Tata Steel Limited, Joda." },
  { name: "3 MW Power Transfer - Tata Sponge Iron Ltd to Tata Steel Ltd, Bamnipal", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Power Trading", client: "Tata Sponge Iron Ltd / Tata Steel Ltd", location: "Bamnipal, Odisha", capacity: "3 MW", image: "trading", scope: "Power supply of 3 MW of Power from Tata Sponge Iron Limited to Tata Steel Limited, Bamnipal." },
  { name: "12 MW Power to IEX - Visa Steel Ltd", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Power Trading", client: "Visa Steel Ltd / IEX", location: "India", capacity: "12 MW", image: "trading", scope: "Power supply of 12 MW of Power from Visa Steel Limited to IEX." },
  { name: "2 MW Power to IEX - Shree Ganesh Metaliks Ltd", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Power Trading", client: "Shree Ganesh Metaliks Ltd / IEX", location: "India", capacity: "2 MW", image: "trading", scope: "Power supply of 2 MW of Power from Shree Ganesh Metaliks Limited to IEX." },
  { name: "30 MW Power - Facor Power Ltd to Facor Charge Chrome Plant", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Power Trading", client: "Facor Power Ltd", location: "India", capacity: "30 MW", image: "trading", scope: "Power supply of 30 MW of Power from Facor Power Limited to Facor Charge Chrome Plant." },
  { name: "10 MW Power - Facor Power Ltd to AP", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Power Trading", client: "Facor Power Ltd", location: "India", capacity: "10 MW", image: "trading", scope: "Power supply of 10 MW of Power from Facor Power Limited to AP." },
  { name: "10 MW Power - Facor Power Ltd to IEX", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Power Trading", client: "Facor Power Ltd / IEX", location: "India", capacity: "10 MW", image: "trading", scope: "Power supply of 10 MW of Power from Facor Power Limited to IEX." },
  { name: "25 MW Power - Facor Power Ltd to RDPPC", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Power Trading", client: "Facor Power Ltd / RDPPC", location: "India", capacity: "25 MW", image: "trading", scope: "Power supply of 25 MW of Power from Facor Power Limited to RDPPC." },
  { name: "ATE Appeal No. 283 of 2014 - Open Access Charges (Visa Steel & Adhunik)", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Regulatory", client: "Visa Steel Ltd & Adhunik Metaliks Ltd", location: "India", image: "regulatory", scope: "Legal & Regulatory support in the matter of determination of Open Access Charges in Appeal No. 283 of 2014 before the Hon'ble ATE on behalf of Visa Steel Limited and Adhunik Metaliks Limited." },
  { name: "Ascend Telecom - 10 KW BTS Tower Power Supply Permission (Jamda)", company: "SSPTPL", category: "Power Trading/Regulatory", sector: "Telecom", client: "Ascend Telecom Infrastructure Pvt. Ltd", location: "Jamda, Odisha", capacity: "10 KW", image: "infrastructure", scope: "Technical Consultancy and advisory service for power supply permission of 10 KW load of BTS Tower of Ascend Telecom Infrastructure Pvt. Ltd at Jamda." },
  { name: "POWERGRID - 55 KW Grid Connected Rooftop Solar (Sundargarh)", company: "SSPTPL", category: "Renewable", sector: "Solar Rooftop", client: "POWERGRID", location: "Sundargarh Substation, Odisha", capacity: "55 KW", image: "solar", scope: "Supply & Installation of 55 KW Grid Connected Roof Top Solar Power Plant at POWERGRID, Sundargarh Substation." },
  { name: "HPCL (Swain & Sons) - 2.4 KVA Solar Rooftop", company: "SSPTPL", category: "Renewable", sector: "Solar Rooftop", client: "M/s. Swain & Sons (HPCL Petrol Pump)", location: "Odisha", capacity: "2.4 KVA", image: "solar", scope: "Supply & Installation of 2.4 KVA Solar Rooftop for HPCL Petrol Pump of M/s. Swain & Sons." },
  { name: "ICAR Central Institute for Women in Agriculture - Walk Through Audit", company: "SSPTPL", category: "Energy Audit", sector: "Institutional", client: "ICAR - Central Institute for Women in Agriculture", location: "Odisha", image: "institutional", scope: "Conducted the Walk Through Audit of ICAR - Central Institute for Women in Agriculture on behalf of EESL." },
  { name: "Railway Stations & Service Buildings (Odisha) - Retrofit under BEEP", company: "SSPTPL", category: "Industrial", sector: "Railways", client: "Indian Railways (BEEP)", location: "Odisha", image: "infrastructure", scope: "Dismantling and Installation (Retrofit) and commissioning various electrical appliances at Railway Stations and Service buildings in Odisha under BEEP schemes." },
];

export const PROJECTS = [
  ...ENERGY_AUDIT, ...TRADING, ...RENEWABLE, ...TRANSMISSION, ...INDUSTRIAL, ...TOURISM, ...SSPTPL,
];

export function getAllProjects() { return PROJECTS; }
export function getFeaturedProjects(n = 6) { return PROJECTS.slice(0, n); }
