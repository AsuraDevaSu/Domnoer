// Domnoer — GIS Dataset & Corridor Navigation Data

export const CAMBODIA_PROVINCES = [
  { id: 'siem_reap', nameEn: 'Siem Reap', nameKm: 'ខេត្តសៀមរាប', region: 'Northwest', tripsCount: 5, highway: 'NR6 Asphalt', distanceKm: 314, lat: 13.3671, lng: 103.8448, statusColor: 'emerald', statusText: 'Optimal Paved', desc: 'Angkor Wat, Tonle Sap & UNESCO heritage sanctuaries' },
  { id: 'phnom_penh', nameEn: 'Phnom Penh', nameKm: 'រាជធានីភ្នំពេញ', region: 'Central Hub', tripsCount: 4, highway: 'National Hub (NR1-6)', distanceKm: 0, lat: 11.5564, lng: 104.9282, statusColor: 'emerald', statusText: 'Urban Highway Hub', desc: 'Capital city & Chaktomuk confluence hub' },
  { id: 'battambang', nameEn: 'Battambang', nameKm: 'ខេត្តបាត់ដំបង', region: 'Northwest', tripsCount: 3, highway: 'NR5 4-Lane Paved', distanceKm: 292, lat: 13.0957, lng: 103.2022, statusColor: 'emerald', statusText: 'Optimal 4-Lane', desc: 'Phnom Sampeau bat caves, colonial heritage & bamboo rail' },
  { id: 'kampot', nameEn: 'Kampot', nameKm: 'ខេត្តកំពត', region: 'Coastal', tripsCount: 3, highway: 'NR3 & Bokor Pass', distanceKm: 148, lat: 10.6104, lng: 104.1815, statusColor: 'amber', statusText: 'Mountain Curves', desc: 'Bokor National Park, mist plateaus & riverside pepper' },
  { id: 'mondulkiri', nameEn: 'Mondulkiri', nameKm: 'ខេត្តមណ្ឌលគិរី', region: 'Highlands', tripsCount: 3, highway: 'NR76 Scenic Pass', distanceKm: 375, lat: 12.4558, lng: 107.1881, statusColor: 'rose', statusText: '4WD Laterite Track', desc: 'Bousra Waterfall, pine valleys & elephant sanctuaries' },
  { id: 'preah_sihanouk', nameEn: 'Preah Sihanouk', nameKm: 'ខេត្តព្រះសីហនុ', region: 'Coastal', tripsCount: 3, highway: 'E4 Expressway (120 km/h)', distanceKm: 190, lat: 10.6253, lng: 103.5234, statusColor: 'emerald', statusText: 'Expressway Paved', desc: 'Deep seaport, white beaches & Koh Rong island gateway' },
  { id: 'preah_vihear', nameEn: 'Preah Vihear', nameKm: 'ខេត្តព្រះវិហារ', region: 'Northwest', tripsCount: 2, highway: 'NR62 Mountain Cliff', distanceKm: 415, lat: 13.8073, lng: 104.9811, statusColor: 'amber', statusText: 'Steep Cliff Pass', desc: 'Prasat Preah Vihear on Dângrêk cliff & Koh Ker pyramid' },
  { id: 'koh_kong', nameEn: 'Koh Kong', nameKm: 'ខេត្តកោះកុង', region: 'Coastal', tripsCount: 2, highway: 'NR48 Coastal Pass', distanceKm: 275, lat: 11.6153, lng: 102.9838, statusColor: 'amber', statusText: 'Coastal Rainforest', desc: 'Cardamom rainforests, Tatai river rapids & mangroves' },
  { id: 'kep', nameEn: 'Kep', nameKm: 'ខេត្តកែប', region: 'Coastal', tripsCount: 2, highway: 'NR33 Smooth Coastal', distanceKm: 165, lat: 10.4828, lng: 104.3167, statusColor: 'emerald', statusText: 'Optimal Coastal', desc: 'Kep crab market, sailing coves & National Park trail' },
  { id: 'ratanakiri', nameEn: 'Ratanakiri', nameKm: 'ខេត្តរតនគិរី', region: 'Highlands', tripsCount: 2, highway: 'NR78 Mountain Corridor', distanceKm: 588, lat: 13.7350, lng: 106.9873, statusColor: 'rose', statusText: 'Remote Highland', desc: 'Yeak Laom volcanic lake, waterfalls & volcanic red earth' },
  { id: 'kratie', nameEn: 'Kratie', nameKm: 'ខេត្តក្រចេះ', region: 'Mekong East', tripsCount: 2, highway: 'NR7 River Highway', distanceKm: 340, lat: 12.4881, lng: 106.0188, statusColor: 'emerald', statusText: 'Optimal River Route', desc: 'Irrawaddy freshwater dolphins at Kampi rapids' },
  { id: 'stung_treng', nameEn: 'Stung Treng', nameKm: 'ខេត្តស្ទឹងត្រែង', region: 'Highlands', tripsCount: 2, highway: 'NR7 to Lao Border', distanceKm: 455, lat: 13.5259, lng: 105.9683, statusColor: 'amber', statusText: 'River Confluence', desc: 'Ramsar wetlands on Sekong & Mekong river junction' },
  { id: 'pursat', nameEn: 'Pursat', nameKm: 'ខេត្តពោធិ៍សាត់', region: 'Northwest', tripsCount: 2, highway: 'NR5 & Cardamom Pass', distanceKm: 185, lat: 12.5388, lng: 103.9192, statusColor: 'amber', statusText: 'Pass Roadworks', desc: 'Kompong Luong floating town & 1500 mountain pass' },
  { id: 'kampong_thom', nameEn: 'Kampong Thom', nameKm: 'ខេត្តកំពង់ធំ', region: 'Central Hub', tripsCount: 2, highway: 'NR6 Sector', distanceKm: 165, lat: 12.7111, lng: 104.8887, statusColor: 'amber', statusText: 'Work Zone KM140', desc: 'Sambor Prei Kuk pre-Angkorian brick temple forest' },
  { id: 'kampong_cham', nameEn: 'Kampong Cham', nameKm: 'ខេត្តកំពង់ចាម', region: 'Mekong East', tripsCount: 2, highway: 'NR7 Wide Paved', distanceKm: 124, lat: 11.9924, lng: 105.4645, statusColor: 'emerald', statusText: 'Optimal Paved', desc: 'Koh Pen bamboo bridge & Mekong riverbanks' },
  { id: 'kampong_speu', nameEn: 'Kampong Speu', nameKm: 'ខេត្តកំពង់ស្ពឺ', region: 'Central Hub', tripsCount: 2, highway: 'NR4 & Kirirom Pass', distanceKm: 85, lat: 11.4533, lng: 104.5209, statusColor: 'amber', statusText: 'Pine Hill Ascent', desc: 'Kirirom pine plateaus & Mount Aural peak' },
  { id: 'kampong_chhnang', nameEn: 'Kampong Chhnang', nameKm: 'ខេត្តកំពង់ឆ្នាំង', region: 'Central Hub', tripsCount: 2, highway: 'NR5 Dual-lane', distanceKm: 91, lat: 12.2500, lng: 104.6667, statusColor: 'emerald', statusText: 'Expanded NR5 Paved', desc: 'Handcrafted pottery villages & Tonle Sap river mouth' },
  { id: 'takeo', nameEn: 'Takeo', nameKm: 'ខេត្តតាកែវ', region: 'South', tripsCount: 2, highway: 'NR2 / NR3', distanceKm: 78, lat: 10.9908, lng: 104.7850, statusColor: 'emerald', statusText: 'Optimal Paved', desc: 'Phnom Da ancient Funan kingdom heritage & canals' },
  { id: 'kandal', nameEn: 'Kandal', nameKm: 'ខេត្តកណ្តាល', region: 'Central Hub', tripsCount: 2, highway: 'NR1/NR2 Belt', distanceKm: 25, lat: 11.4392, lng: 105.0000, statusColor: 'emerald', statusText: 'Urban Beltway', desc: 'Oudong Mountain royal stupas & Mekong islands' },
  { id: 'banteay_meanchey', nameEn: 'Banteay Meanchey', nameKm: 'ខេត្តបន្ទាយមានជ័យ', region: 'Northwest', tripsCount: 2, highway: 'NR5 & NR6 Junction', distanceKm: 360, lat: 13.5859, lng: 102.9737, statusColor: 'emerald', statusText: 'Optimal Highway', desc: 'Banteay Chhmar temple fortress & Poipet border' },
  { id: 'oddar_meanchey', nameEn: 'Oddar Meanchey', nameKm: 'ខេត្តឧត្តរមានជ័យ', region: 'Northwest', tripsCount: 2, highway: 'NR68 Border Highway', distanceKm: 430, lat: 14.1818, lng: 103.5176, statusColor: 'amber', statusText: 'Border Incline', desc: 'Dângrêk border passes & Anlong Veng historic valley' },
  { id: 'prey_veng', nameEn: 'Prey Veng', nameKm: 'ខេត្តព្រៃវែង', region: 'Mekong East', tripsCount: 2, highway: 'NR11 & Tsubasa Bridge', distanceKm: 90, lat: 11.4868, lng: 105.3253, statusColor: 'emerald', statusText: 'Optimal Paved', desc: 'Neak Loeung Tsubasa Bridge & Ba Phnom shrine' },
  { id: 'svay_rieng', nameEn: 'Svay Rieng', nameKm: 'ខេត្តស្វាយរៀង', region: 'Mekong East', tripsCount: 2, highway: 'NR1 Asian Highway', distanceKm: 122, lat: 11.0879, lng: 105.7993, statusColor: 'emerald', statusText: 'Optimal Highway', desc: 'Bavet international corridor & lush wetlands' },
  { id: 'tboung_khmum', nameEn: 'Tboung Khmum', nameKm: 'ខេត្តត្បូងឃ្មុំ', region: 'Mekong East', tripsCount: 2, highway: 'NR7 / NR72', distanceKm: 155, lat: 11.9167, lng: 105.6667, statusColor: 'emerald', statusText: 'Optimal Paved', desc: 'Red soil rubber plantations & Memot prehistoric sites' },
  { id: 'pailin', nameEn: 'Pailin', nameKm: 'ខេត្តប៉ៃលិន', region: 'Northwest', tripsCount: 2, highway: 'NR57 Foothills', distanceKm: 370, lat: 12.8489, lng: 102.6093, statusColor: 'amber', statusText: 'Hilly Curves', desc: 'Wat Phnom Yat & Cardamom gem foothills' }
];

// NR6 Waypoints with realistic GPS paths
export const NR6_WAYPOINTS_OPTIMAL_1 = [
  [11.5564, 104.9282], // Phnom Penh Monivong / Chaktomuk
  [11.5910, 104.9180], // Chroy Changvar Bridge
  [11.6620, 104.9350], // Prek Pnov
  [11.8340, 104.9820], // Batheay
  [12.0520, 105.0110], // Skun Interchange (Junction with NR7)
  [12.2850, 104.9560], // Cheung Prey
  [12.5120, 104.9080]  // Approaching Kampong Thom boundary
];

export const NR6_WAYPOINTS_CAUTION = [
  [12.5120, 104.9080],
  [12.6350, 104.8940], // Tang Krasang
  [12.7111, 104.8887], // Kampong Thom Provincial Town
  [12.7950, 104.8210], // KM 165 Roadwork Rehabilitation Zone
  [12.9200, 104.6850], // Stoung Sector
  [13.0150, 104.5200]  // Chi Kraeng border
];

export const NR6_WAYPOINTS_OPTIMAL_2 = [
  [13.0150, 104.5200],
  [13.1200, 104.3400], // Damdek Junction
  [13.2500, 104.0500], // Prasat Bakong
  [13.3671, 103.8448], // Siem Reap Center Hub
  [13.4125, 103.8670]  // Angkor Wat Sanctuary Grand Entrance
];

// Rich Destinations Data per Province
export const DESTINATIONS_DATA = {
  siem_reap: [
    {
      id: 'sr_angkor',
      title: 'Angkor Wat Sanctuary',
      khmer: 'ប្រាសាទអង្គរវត្ត និងភ្នំបាខែង',
      tag: 'UNESCO Heritage',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnx-ocuBQ58zgnpIrwq65zCnpBc--y8L8KLLXRoEPZOrDzbJI3PCuDuL_fbvQFvWs9FJseQvcvbGRmJPyKnhd-_nVXZ7KDnP9feasfNFtAL9j1Y7eSpKpz-HUJ5vqRf_SNwBPaaM5Zek3M1pj4xl-3EWpZCzmJd3iRWhqFoaHLXkKeB9xie0jbmqwsRzDYg_Ds-egLGY8gkf2RUptQYhtUwP0X8sleIroj7iHXVY8',
      elevation: '65m',
      distance: '314 km',
      duration: '4h 45m',
      elevDelta: '+53 m',
      highway: 'NR6 Asphalt',
      conditionBadge: 'Optimal · NR6 Asphalt',
      passIndex: '89%',
      passLabel: 'Optimal',
      goodPct: 78,
      cautionPct: 16,
      badPct: 6,
      targetLat: 13.4125,
      targetLng: 103.8670,
      advisory: 'ផ្លូវជាតិលេខ ៦ អាចធ្វើដំណើរបានគ្រប់ប្រភេទយានយន្ត។ ប្រុងប្រយ័ត្នការដ្ឋានជួសជុលចន្លោះ គ.ម ១៤០-១៦៥។',
      advisoryEn: 'National Road 6 is smooth asphalt and passible by all vehicles. Watch for ongoing resurfacing works between KM 140-165.',
      midpointCoords: [12.7950, 104.8210],
      midpointText: 'KM 165 Kampong Thom Roadworks',
      midpointTextKm: 'ការដ្ឋានជួសជុល គ.ម ១៦៥',
      corridorSegments: [
        { points: NR6_WAYPOINTS_OPTIMAL_1, type: 'optimal', color: '#059669' },
        { points: NR6_WAYPOINTS_CAUTION, type: 'caution', color: '#d97706' },
        { points: NR6_WAYPOINTS_OPTIMAL_2, type: 'optimal', color: '#059669' }
      ],
      maneuvers: [
        { dist: 'In 1.2 km', hwy: 'NR6', en: 'Continue straight on NR6 through Skun Interchange', km: 'បន្តដំណើរត្រង់តាមផ្លូវជាតិលេខ ៦ កាត់តាមរង្វង់មូលស្គន់', icon: 'straight', speed: 82, limit: 90, sector: 'Optimal NR6 Asphalt', sectorKm: 'កៅស៊ូល្អរលូន' },
        { dist: 'In 45 km', hwy: 'NR6', en: 'Slow to 35 km/h at Kampong Thom KM 165 roadworks', km: 'បន្ថយល្បឿនមកត្រឹម ៣៥ គ.ម/ម៉ នៅការដ្ឋានជួសជុល គ.ម ១៦៥', icon: 'construction', speed: 38, limit: 40, sector: 'Caution Repair Sector', sectorKm: 'ការដ្ឋានផ្លូវ កំណាត់ជួសជុល' },
        { dist: 'In 180 km', hwy: 'NR6', en: 'Continue on 4-lane avenue approaching Siem Reap Royal Gardens', km: 'បន្តតាមមហាវិថី ៤ គន្លង ឆ្ពោះទៅសួនព្រះរាជដំណាក់សៀមរាប', icon: 'turn_slight_right', speed: 65, limit: 80, sector: 'Optimal Boulevard', sectorKm: 'ផ្លូវស្អាតទូលាយ' }
      ]
    },
    {
      id: 'sr_kulen',
      title: 'Phnom Kulen Holy Waterfall',
      khmer: 'ឧទ្យានជាតិភ្នំគូលែន',
      tag: 'Mountain Plateau',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz_FkNTctR0M4N49mCdDH350YouDtPyu59b12eTGxveTIcFsM42joNTCBxHpSANBTxsvWJXmCdpXPHuwuOD3u9XuMc34SE3oE09QHOMcCXIQXPoTBZDgG-W--NE77cPy5ZuznWll20MPGsNmXTVcvTEHJrPj7l4tPPiP8B2AgFBUKoyzHA8HGAG8Vfcfr8YSxS_Px5BLrMOXQDvJYMKeQDTKSYUBOCpzeUWg0jkI8',
      elevation: '487m',
      distance: '358 km',
      duration: '5h 30m',
      elevDelta: '+475 m',
      highway: 'NR6 + Kulen Sky Pass',
      conditionBadge: 'Caution · Steep 1-Way Pass',
      passIndex: '72%',
      passLabel: 'Caution Pass',
      goodPct: 62,
      cautionPct: 28,
      badPct: 10,
      targetLat: 13.5645,
      targetLng: 104.1030,
      advisory: 'ភ្នំគូលែនអនុញ្ញាតឲ្យរថយន្តឡើងត្រឹមម៉ោង ១១:០០ ព្រឹក និងចុះចាប់ពីម៉ោង ១២:៣០ ថ្ងៃត្រង់។ ផ្លូវជម្រាលភ្នំត្រូវការអ្នកបើកបរប៉ិនប្រសប់។',
      advisoryEn: 'Phnom Kulen enforces one-way ascent until 11:00 AM and descent from 12:30 PM. Steep mountain curves require experienced driving.',
      midpointCoords: [13.4500, 104.0500],
      midpointText: 'Kulen Foothills One-Way Gate',
      midpointTextKm: 'ច្រកឡើងភ្នំគូលែនផ្លូវមួយទិស',
      corridorSegments: [
        { points: NR6_WAYPOINTS_OPTIMAL_1, type: 'optimal', color: '#059669' },
        { points: [
            [12.5120, 104.9080],
            [12.7111, 104.8887],
            [13.1200, 104.3400]
          ], type: 'optimal', color: '#059669' },
        { points: [
            [13.1200, 104.3400],
            [13.3500, 104.1800],
            [13.5645, 104.1030]
          ], type: 'caution', color: '#d97706' }
      ],
      maneuvers: [
        { dist: 'In 2.5 km', hwy: 'NR6', en: 'Take exit right onto Kulen Mountain Scenic Pass', km: 'បត់ស្តាំឡើងផ្លូវចំណោតភ្នំគូលែន', icon: 'turn_right', speed: 40, limit: 50, sector: 'Mountain Winding Incline', sectorKm: 'ផ្លូវចំណោតភ្នំ ត្រូវការប្រុងប្រយ័ត្ន' }
      ]
    },
    {
      id: 'sr_tonlesap',
      title: 'Tonle Sap Chong Kneas',
      khmer: 'ភូមិបណ្តែតទឹកចុងឃ្នាស',
      tag: 'Biosphere Reserve',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB4zSIZNLbwRtEd_lKf9DnjSmpoVFOyKW5iNKn2ZnFFomi6rSTCUQ370iF7WEoVCLfz4Dak0gXtTJvtkrNrpKqLnb22VBvBGCdDHt_AC-0anAgJgijgEpQIeSi9bKILURXD3ASSE_GAeQ6u4fyP59uhiCmiDJc_paC4EtJwQ-aZsNxaL8uNwyuV-VSoYQXBFPt_PmKhpKDbg0nqqepfCmUjydywchiQAprHwAS8jA',
      elevation: '12m',
      distance: '329 km',
      duration: '5h 10m',
      elevDelta: '+2 m',
      highway: 'NR6 + Port Access',
      conditionBadge: 'Optimal · Flat Access',
      passIndex: '85%',
      passLabel: 'Optimal',
      goodPct: 82,
      cautionPct: 12,
      badPct: 6,
      targetLat: 13.2420,
      targetLng: 103.8200,
      advisory: 'ផ្លូវឆ្ពោះទៅកំពង់ផែទូកធម្មតា។ រដូវប្រាំងទឹកបឹងស្រក ត្រូវដើរលើស្ពានឈើខ្លះៗ។',
      advisoryEn: 'Access road to Chong Kneas ferry pier is paved. During dry season water retreats, board longtails via wooden boardwalks.',
      midpointCoords: [13.2900, 103.8300],
      midpointText: 'Chong Kneas Pier Access Turn',
      midpointTextKm: 'ច្រកចូលកំពង់ផែចុងឃ្នាស',
      corridorSegments: [
        { points: NR6_WAYPOINTS_OPTIMAL_1, type: 'optimal', color: '#059669' },
        { points: NR6_WAYPOINTS_CAUTION, type: 'caution', color: '#d97706' },
        { points: [
            [13.0150, 104.5200],
            [13.3671, 103.8448],
            [13.2420, 103.8200]
          ], type: 'optimal', color: '#059669' }
      ],
      maneuvers: [
        { dist: 'In 3.8 km', hwy: 'NR63', en: 'Turn left to Chong Kneas Floating Village Terminal', km: 'បត់ឆ្វេងឆ្ពោះទៅកំពង់ផែទេសចរណ៍ភូមិបណ្តែតទឹក', icon: 'turn_left', speed: 50, limit: 60, sector: 'Port Access Road', sectorKm: 'ផ្លូវកំពង់ផែបឹង' }
      ]
    }
  ],

  battambang: [
    {
      id: 'bb_sampeau',
      title: 'Phnom Sampeau Bat Caves',
      khmer: 'ភ្នំសំពៅ និងល្អាងប្រចៀវ',
      tag: 'Natural Wonder',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnx-ocuBQ58zgnpIrwq65zCnpBc--y8L8KLLXRoEPZOrDzbJI3PCuDuL_fbvQFvWs9FJseQvcvbGRmJPyKnhd-_nVXZ7KDnP9feasfNFtAL9j1Y7eSpKpz-HUJ5vqRf_SNwBPaaM5Zek3M1pj4xl-3EWpZCzmJd3iRWhqFoaHLXkKeB9xie0jbmqwsRzDYg_Ds-egLGY8gkf2RUptQYhtUwP0X8sleIroj7iHXVY8',
      elevation: '100m',
      distance: '292 km',
      duration: '4h 15m',
      elevDelta: '+85 m',
      highway: 'NR5 4-Lane Paved',
      conditionBadge: 'Optimal · 4-Lane Highway',
      passIndex: '94%',
      passLabel: 'Optimal',
      goodPct: 92,
      cautionPct: 7,
      badPct: 1,
      targetLat: 13.0250,
      targetLng: 103.1020,
      advisory: 'ផ្លូវជាតិលេខ ៥ ពង្រីក ៤ គន្លងរួចរាល់យ៉ាងស្រស់ស្អាត ធ្វើដំណើរបានលឿន និងមានសុវត្ថិភាពខ្ពស់។',
      advisoryEn: 'National Road 5 is newly expanded into a modern 4-lane expressway standard with clear signage and high safety.',
      midpointCoords: [12.5388, 103.9192],
      midpointText: 'Pursat 4-Lane Rest Area',
      midpointTextKm: 'កន្លែងឈប់សម្រាកពោធិ៍សាត់ ៤ គន្លង',
      corridorSegments: [
        { points: [
            [11.5564, 104.9282],
            [11.8340, 104.7500],
            [12.2500, 104.6667],
            [12.5388, 103.9192],
            [13.0957, 103.2022],
            [13.0250, 103.1020]
          ], type: 'optimal', color: '#059669' }
      ],
      maneuvers: [
        { dist: 'In 2.1 km', hwy: 'NR5', en: 'Continue on NR5 4-Lane Expressway grade toward Battambang', km: 'បន្តដំណើរតាមផ្លូវជាតិលេខ ៥ ពង្រីក ៤ គន្លង', icon: 'straight', speed: 85, limit: 90, sector: 'Optimal 4-Lane Highway', sectorKm: 'ផ្លូវជាតិ ៤ គន្លងថ្មី' }
      ]
    }
  ],

  kampot: [
    {
      id: 'kp_bokor',
      title: 'Phnom Bokor National Park',
      khmer: 'ឧទ្យានជាតិភ្នំបូកគោ',
      tag: 'Mountain Plateau',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz_FkNTctR0M4N49mCdDH350YouDtPyu59b12eTGxveTIcFsM42joNTCBxHpSANBTxsvWJXmCdpXPHuwuOD3u9XuMc34SE3oE09QHOMcCXIQXPoTBZDgG-W--NE77cPy5ZuznWll20MPGsNmXTVcvTEHJrPj7l4tPPiP8B2AgFBUKoyzHA8HGAG8Vfcfr8YSxS_Px5BLrMOXQDvJYMKeQDTKSYUBOCpzeUWg0jkI8',
      elevation: '1,075m',
      distance: '188 km',
      duration: '3h 30m',
      elevDelta: '+1,065 m',
      highway: 'NR3 + Bokor Sky Pass',
      conditionBadge: 'Caution · 32km Winding Pass',
      passIndex: '78%',
      passLabel: 'Caution Pass',
      goodPct: 85,
      cautionPct: 15,
      badPct: 0,
      targetLat: 10.6300,
      targetLng: 104.0200,
      advisory: 'ផ្លូវឡើងភ្នំបូកគោកៅស៊ូស្អាត ប៉ុន្តែមានអ័ព្ទក្រាស់នៅពេលល្ងាច។ ត្រូវបើកភ្លើងអ័ព្ទ និងបន្ថយល្បឿននៅចំណោតកោង ៣២ គ.ម។',
      advisoryEn: 'Bokor mountain ascent is silky smooth asphalt but frequently shrouded in heavy evening fog. Use low gears on 32km incline.',
      midpointCoords: [10.6104, 104.1815],
      midpointText: 'Bokor Mountain Ascent Checkpoint',
      midpointTextKm: 'ប៉ុស្តិ៍ត្រួតពិនិត្យឡើងភ្នំបូកគោ',
      corridorSegments: [
        { points: [
            [11.5564, 104.9282],
            [11.2000, 104.8000],
            [10.9908, 104.7850],
            [10.6104, 104.1815]
          ], type: 'optimal', color: '#059669' },
        { points: [
            [10.6104, 104.1815],
            [10.6200, 104.1000],
            [10.6300, 104.0200]
          ], type: 'caution', color: '#d97706' }
      ],
      maneuvers: [
        { dist: 'In 1.5 km', hwy: 'Bokor Pass', en: 'Turn right at Bokor Gate into 32 km winding mountain ascent', km: 'បត់ស្តាំចូលក្លោងទ្វារភ្នំបូកគោ ឡើងចំណោត ៣២ គីឡូម៉ែត្រ', icon: 'turn_slight_right', speed: 45, limit: 50, sector: 'Winding Mountain Pass', sectorKm: 'ផ្លូវកោងចំណោតភ្នំ' }
      ]
    }
  ],

  mondulkiri: [
    {
      id: 'mk_bousra',
      title: 'Bousra Waterfall & Valleys',
      khmer: 'ទឹកជ្រោះប៊ូស្រា មណ្ឌលគិរី',
      tag: 'Highland Cascades',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVrqodwR26dkVSh-6Si8ovF_fTIk-eTv3oi_Wpg82pyQah6tMCAR7aFCLcnDo3b78TX_Jbnu6rzc_5OnjiD45zWd6nH0kx2CwppWVg0a2wt6CY5HQQvHhMbTp7Yt5rQLXCzMfznODEl4TBQvjf2-TguqoT5ssID7DsdmsKrlk0eNtjvpOAsutv67drMhlW_72DAa7KRmTXDkQ0bq80p0SDx1SdAqNuUACB7A_pgdc',
      elevation: '780m',
      distance: '375 km',
      duration: '6h 15m',
      elevDelta: '+765 m',
      highway: 'NR76 + Laterite Spur',
      conditionBadge: '4WD Only · Red Laterite Track',
      passIndex: '65%',
      passLabel: '4WD Only',
      goodPct: 55,
      cautionPct: 30,
      badPct: 15,
      targetLat: 12.5650,
      targetLng: 107.4100,
      advisory: 'កំណាត់ផ្លូវចូលទឹកជ្រោះប៊ូស្រាមានដីក្រហម និងគ្រលុក។ រថយន្តប៉ុងពីរ (4WD) ផ្តល់ផាសុកភាពល្អបំផុត។',
      advisoryEn: 'Final 43km stretch to Bousra Waterfall transitions into rolling red laterite trails. High-clearance AWD/4WD recommended.',
      midpointCoords: [12.4558, 107.1881],
      midpointText: 'Sen Monorom Pine Ridge Spur',
      midpointTextKm: 'ផ្លូវបំបែកស្រល់សែនមនោរម្យ',
      corridorSegments: [
        { points: [
            [11.5564, 104.9282],
            [11.9924, 105.4645],
            [12.1800, 106.0000],
            [12.4881, 106.0188],
            [12.4558, 107.1881]
          ], type: 'optimal', color: '#059669' },
        { points: [
            [12.4558, 107.1881],
            [12.5100, 107.3000],
            [12.5650, 107.4100]
          ], type: 'rough', color: '#e11d48' }
      ],
      maneuvers: [
        { dist: 'In 3.2 km', hwy: 'NR76', en: 'Engage 4WD drive mode on Bousra red laterite spur', km: 'ដាក់លេខប៉ុងពីរ (4WD) លើផ្លូវដីក្រហមប៊ូស្រា', icon: 'warning', speed: 32, limit: 40, sector: '4WD Red Laterite Track', sectorKm: 'ផ្លូវដីក្រហមរលាក់ 4WD' }
      ]
    }
  ],

  preah_sihanouk: [
    {
      id: 'shv_exp',
      title: 'E4 Sihanoukville Expressway & Piers',
      khmer: 'ផ្លូវល្បឿនលឿនភ្នំពេញ-ព្រះសីហនុ',
      tag: 'Golden Express',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnx-ocuBQ58zgnpIrwq65zCnpBc--y8L8KLLXRoEPZOrDzbJI3PCuDuL_fbvQFvWs9FJseQvcvbGRmJPyKnhd-_nVXZ7KDnP9feasfNFtAL9j1Y7eSpKpz-HUJ5vqRf_SNwBPaaM5Zek3M1pj4xl-3EWpZCzmJd3iRWhqFoaHLXkKeB9xie0jbmqwsRzDYg_Ds-egLGY8gkf2RUptQYhtUwP0X8sleIroj7iHXVY8',
      elevation: '15m',
      distance: '190 km',
      duration: '2h 10m',
      elevDelta: '+5 m',
      highway: 'E4 Expressway (120 km/h)',
      conditionBadge: 'Expressway · 120 km/h Grade',
      passIndex: '98%',
      passLabel: 'Optimal Expressway',
      goodPct: 98,
      cautionPct: 2,
      badPct: 0,
      targetLat: 10.6253,
      targetLng: 103.5234,
      advisory: 'ផ្លូវល្បឿនលឿន E4 ទំនើប ៤ គន្លង មានរបាំងសុវត្ថិភាព និងស្ថានីយ៍សេវាកម្ម ៣ កន្លែង។ ល្បឿនអតិបរមា ១២០ គ.ម/ម៉។',
      advisoryEn: 'Expressway E4 provides flawless 4-lane concrete corridor with automated tolling and 3 modern service plazas. Max speed 120 km/h.',
      midpointCoords: [11.1500, 104.1000],
      midpointText: 'Kampong Speu Mid-Expressway Plaza',
      midpointTextKm: 'ស្ថានីយ៍សេវាកម្មផ្លូវល្បឿនលឿនកំពង់ស្ពឺ',
      corridorSegments: [
        { points: [
            [11.5564, 104.9282],
            [11.4533, 104.5209],
            [11.1500, 104.1000],
            [10.8500, 103.8000],
            [10.6253, 103.5234]
          ], type: 'optimal', color: '#059669' }
      ],
      maneuvers: [
        { dist: 'In 800 m', hwy: 'E4', en: 'Merge smoothly onto Phnom Penh-Sihanoukville Expressway', km: 'ចូលផ្លូវល្បឿនលឿនភ្នំពេញ-ព្រះសីហនុ', icon: 'straight', speed: 110, limit: 120, sector: 'Grade-A Expressway', sectorKm: 'ផ្លូវល្បឿនលឿនកម្រិត A' }
      ]
    }
  ]
};

// Mapbox vector styles. The route is restored whenever the style changes.
export const MAP_TILE_LAYERS = [
  {
    key: 'mapbox-standard', name: 'Mapbox Standard',
    subtext: 'Detailed streets and 3D buildings',
    style: 'mapbox://styles/mapbox/standard',
    config: { basemap: { lightPreset: 'day' } }, icon: 'map'
  },
  {
    key: 'mapbox-satellite', name: 'Mapbox Satellite',
    subtext: 'Satellite imagery with road labels',
    style: 'mapbox://styles/mapbox/standard-satellite', icon: 'satellite_alt'
  },
  {
    key: 'mapbox-night', name: 'Mapbox Night',
    subtext: 'A softer map for night travel',
    style: 'mapbox://styles/mapbox/standard',
    config: { basemap: { lightPreset: 'night' } }, icon: 'dark_mode'
  }
];

// Bilingual strings dictionary
export const UI_STRINGS = {
  km: {
    brand: 'Domnoer',
    subtitle: 'ផែនទី GIS ទេសចរណ៍ និងប្រព័ន្ធនាំផ្លូវផ្ទាល់',
    gnssHub: 'មជ្ឈមណ្ឌលផ្កាយរណប GNSS:',
    originHub: 'រាជធានីភ្នំពេញ (Phnom Penh)',
    passability: 'គុណភាពផ្លូវ:',
    optimalPaved: 'កៅស៊ូល្អរលូន',
    cautionWorks: 'ការដ្ឋាន / ប្រុងប្រយ័ត្ន',
    rough4wd: 'ផ្លូវដីក្រហម 4WD',
    liveSim: 'បើកបរ GPS ផ្ទាល់',
    navActive: 'កំពុងនាំផ្លូវ',
    cartography: 'ស្រទាប់ផែនទី',
    cleanGis: 'ប្រព័ន្ធ GIS គ្មានគំនូសទឹក',
    searchPlaceholder: 'ស្វែងរកខេត្ត (សៀមរាប, កំពត, បាត់ដំបង...)',
    selectDestHint: 'ជ្រើសរើសគោលដៅដើម្បីគណនាស្ថានភាពផ្លូវ:',
    placesCount: 'កន្លែងទេសចរណ៍',
    inManeuver: 'ក្នុងចម្ងាយ',
    currentSpeed: 'ល្បឿនបច្ចុប្បន្ន',
    speedLimit: 'កំណត់:',
    remaining: 'ចម្ងាយនៅសល់',
    traveled: 'បានធ្វើដំណើរ',
    liveEta: 'ម៉ោងទៅដល់',
    arrival: 'ដល់:',
    surfaceSector: 'ស្ថានភាពផ្ទៃផ្លូវ',
    pause: 'ផ្អាក',
    resume: 'បន្ត',
    exitNav: 'បញ្ចប់ការធ្វើដំណើរ',
    gnssLocked: 'សញ្ញាផ្កាយរណប GNSS ភ្ជាប់រឹងមាំ',
    nationalCorridor: 'ច្រករបៀងផ្លូវជាតិ',
    distance: 'ចម្ងាយ',
    etaTime: 'រយៈពេល',
    elevation: 'កម្ពស់',
    corridor: 'ផ្លូវហាយវេ',
    surfaceBreakdown: 'ការវិភាគគុណភាពផ្ទៃផ្លូវ',
    totalKm: 'គ.ម សរុប',
    paved: 'កៅស៊ូ',
    bypass: 'ការដ្ឋាន',
    rough: 'រលាក់',
    startRoute: 'ចាប់ផ្តើមធ្វើដំណើរ',
    liveAdvisory: 'ដំណឹងបន្ទាន់:',
    voiceGuidance: 'សំឡេងនាំផ្លូវ',
    shareRoute: 'ចែករំលែកផ្លូវ',
    exportGpx: 'ទាញយក GPX',
    recenter: 'តម្រង់ទិសផែនទី',
    fastestRoute: 'ផ្លូវលឿនបំផុតតាមប្រព័ន្ធ GIS (Mapbox)',
    calculatingRoute: 'កំពុងគណនាផ្លូវលឿនបំផុត...',
    roadFollowing: 'តោងតាមផ្លូវពិតប្រាកដ ១០០%',
    routeCalculated: 'ផ្លូវលឿនបំផុតបានគណនាជោគជ័យ'
  },
  en: {
    brand: 'Domnoer',
    subtitle: 'Clean GIS Cartography & Turn-by-Turn Navigation',
    gnssHub: 'GNSS Hub:',
    originHub: 'Phnom Penh Hub',
    passability: 'Passability:',
    optimalPaved: 'Optimal Paved',
    cautionWorks: 'Caution / Works',
    rough4wd: '4WD Laterite',
    liveSim: 'Live GPS Sim',
    navActive: 'Nav Active',
    cartography: 'Base Cartography',
    cleanGis: 'Clean Watermark-free GIS',
    searchPlaceholder: 'Search province (Siem Reap, Kampot, Battambang...)',
    selectDestHint: 'Select destination to calculate route passability:',
    placesCount: 'Attractions',
    inManeuver: 'In',
    currentSpeed: 'Current Speed',
    speedLimit: 'Limit:',
    remaining: 'Remaining',
    traveled: 'Traveled',
    liveEta: 'Live ETA',
    arrival: 'Arr:',
    surfaceSector: 'Surface Sector',
    pause: 'Pause',
    resume: 'Resume',
    exitNav: 'Exit Navigation',
    gnssLocked: 'GNSS Satellite Locked',
    nationalCorridor: 'NATIONAL CORRIDOR',
    distance: 'Distance',
    etaTime: 'ETA Time',
    elevation: 'Elevation',
    corridor: 'Corridor',
    surfaceBreakdown: 'Road Surface Breakdown (Good to Bad)',
    totalKm: 'Total',
    paved: 'Paved',
    bypass: 'Bypass / Works',
    rough: 'Rough',
    startRoute: 'Start Route',
    liveAdvisory: 'Live Advisory:',
    voiceGuidance: 'Voice Guidance',
    shareRoute: 'Share Route',
    exportGpx: 'Export GPX',
    recenter: 'Re-center Cambodia Map',
    fastestRoute: 'Fastest Road Route (Mapbox)',
    calculatingRoute: 'Calculating fastest road route...',
    roadFollowing: '100% Snapped to Real Roads',
    routeCalculated: 'Fastest route calculated successfully'
  }
};
