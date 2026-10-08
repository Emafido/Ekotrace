import { CulturalAsset, ContributionSubmission } from '@/types';

export const CULTURAL_ASSETS: CulturalAsset[] = [
  {
    id: 'eyo-festival',
    slug: 'eyo-festival',
    name: 'Eyo Festival',
    type: 'festival',
    location: 'Lagos Island, Lagos',
    neighborhood: 'Isale Eko',
    summary: 'A sacred Yoruba masquerade procession honoring departed monarchs and inaugurating new eras in the heart of historic Lagos.',
    coverImage: '/images/cultural/eyo-festival.jpg',
    coverImageAlt: 'Adamu Orisha Eyo masqueraders dressed in ceremonial white drapery and broad-brimmed Aga hats in Isale Eko, Lagos',
    coverImagePosition: 'center 20%',
    image: {
      src: '/images/cultural/eyo-festival.jpg',
      alt: 'Adamu Orisha Eyo masqueraders dressed in ceremonial white drapery and broad-brimmed Aga hats in Isale Eko, Lagos',
      objectPosition: 'center 20%'
    },
    facts: {
      when: 'Date not yet announced',
      where: 'Lagos Island',
      visitorAccess: 'Public',
      category: 'Festival'
    },
    overallVerification: 'verified-community',
    happeningNow: true,
    eventStatus: 'Expected Late 2026',
    eventDate: 'Not yet confirmed',
    featured: true,
    contributor: {
      id: 'c-isale-eko',
      name: 'Isale Eko Heritage Circle',
      roleOrAffiliation: 'Elders & Cultural Custodians',
      community: 'Lagos Island Indigenous Descendants'
    },
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-09-18T14:30:00Z',
    story: {
      introduction: 'Beneath the towering white drapery and the measured sweep of the Opambata staff lies centuries of Isale Eko memory, where kings are mourned, the ancestors commune, and Lagos pauses in solemn reverence.',
      sections: [
        {
          heading: 'Behind the white robes of Eyo',
          content: 'The Adimu Orisha Play, colloquially known as the Eyo Festival, is not a street carnival for casual amusement. In Lagos Island memory, each procession represents an exacting spiritual architecture. When the Iga (palaces) grant consent, the Island shuts its vehicular thoroughfares. Barefoot celebrants walk the streets under strict communal vows: no caps, no head-ties, no umbrellas, and no sandals may be worn within sight of an Eyo.',
          quote: {
            text: 'When the staff of Adamu Orisha strikes the earth of Isale Eko, it does not strike empty dust. It awakens three hundred years of Oba lineage.',
            attribution: 'Chief Taiwo Dosunmu, Oral Custodian, Lagos Island'
          }
        },
        {
          heading: 'The Sacred Families and the Staff',
          content: 'There are five primary Conclaves (Iga Eyo): the Adimu, the Laba, the Oniko, the Ologede, and the Agere. The Adimu is supreme, carrying the sacred staff wrapped in black and white threads. Each group wears distinct broad-brimmed hat colors (Aga) that identify their lineage and duties. The Opambata staff, carved with precision, is tapped against the ground to pronounce blessings of health and prosperity upon elders and spectators.'
        },
        {
          heading: 'Community Protocol and Living Archive',
          content: 'Unlike contemporary commercial festivals, an Eyo date cannot be bought or scheduled by event promoters. It requires the unanimous ritual assent of the Oba of Lagos, the Kingmakers, and the descendants of the honoree. In an era of rapid urban redevelopment, the festival remains the fiercest assertion of indigenous Lagos Island sovereignty.'
        }
      ]
    },
    claims: [
      {
        id: 'eyo-claim-1',
        statement: 'The festival takes place on Lagos Island.',
        category: 'location',
        value: 'Lagos Island (Isale Eko and Idumota corridors)',
        status: 'verified-community',
        lastReviewedAt: '18 September 2026',
        verification: {
          type: 'community',
          verifierName: 'Lagos Island Cultural Assembly',
          verifierRole: 'Community Representative & Heritage Desk',
          verifiedDate: '18 September 2026',
          confidenceLevel: 'high',
          verificationNotes: 'Cross-checked with Isale Eko boundaries, Oba of Lagos Palace archives, and communal boundaries.'
        },
        sources: [
          {
            id: 'src-101',
            title: 'Festival Official Programme of the Adamu Orisha Play',
            type: 'programme',
            authorOrOrg: 'Eyo Festival Organising Committee & Lagos State Ministry of Culture',
            yearOrDate: '2017 & 2022 Archive Records'
          },
          {
            id: 'src-102',
            title: 'Oral History of the Chieftaincy Families of Lagos',
            type: 'archive',
            authorOrOrg: 'Centre for Black & African Arts and Civilization (CBAAC)',
            yearOrDate: '1984 Monograph Series'
          },
          {
            id: 'src-103',
            title: 'Isale Eko Community Registry & Chieftaincy Elders Testimony',
            type: 'community',
            authorOrOrg: 'Elders Council of Idumota and Enu Owa',
            yearOrDate: 'Verified 2026'
          }
        ],
        evidence: [
          {
            id: 'ev-1',
            title: 'Chieftaincy Procession Map (Isale Eko to Tafawa Balewa Square)',
            type: 'document',
            description: 'Archival gazette detailing ceremonial perimeter and traffic restriction points on Lagos Island.'
          },
          {
            id: 'ev-2',
            title: 'Field Documentation Photograph',
            type: 'photo',
            description: 'Eyo procession passing Enu Owa shrine in Isale Eko.'
          }
        ]
      },
      {
        id: 'eyo-claim-2',
        statement: 'The procession involves Eyo masquerades representing five distinct family conclaves.',
        category: 'tradition',
        value: 'Five Conclaves: Adimu, Laba, Oniko, Ologede, and Agere',
        status: 'verified-community',
        lastReviewedAt: '12 August 2026',
        verification: {
          type: 'community',
          verifierName: 'Adamu Orisha Custodians Committee',
          verifierRole: 'Elder Council',
          verifiedDate: '12 August 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-104',
            title: 'The Living Mask Traditions of Yoruba Coastal Kingdoms',
            type: 'archive',
            authorOrOrg: 'University of Lagos Cultural Institute',
            yearOrDate: '2019'
          },
          {
            id: 'src-105',
            title: 'Conclave Hat Coloration & Heraldry Registry',
            type: 'community',
            authorOrOrg: 'Iga Idunganran Documentation Unit',
            yearOrDate: '2023'
          }
        ],
        evidence: [
          {
            id: 'ev-3',
            title: 'Heraldic Color Code Chart',
            type: 'programme',
            description: 'Listing red for Laba, yellow for Oniko, green for Ologede, and purple/striped for Agere.'
          }
        ]
      },
      {
        id: 'eyo-claim-3',
        statement: '2026 festival date',
        category: 'schedule',
        value: 'Not yet confirmed',
        status: 'unknown',
        lastReviewedAt: '24 September 2026',
        verification: {
          type: 'pending',
          verifierName: 'EkoTrace Field Team',
          verifierRole: 'Archival Reviewer',
          verifiedDate: 'Pending announcement',
          verificationNotes: 'No pronouncement made by the Palace of the Oba of Lagos for 2026. Dates are sacred and issued strictly by royal proclamation.'
        },
        sources: [
          {
            id: 'src-106',
            title: 'Palace of the Oba of Lagos Official Communiqué Desk',
            type: 'oral-history',
            authorOrOrg: 'Iga Idunganran Secretariat',
            yearOrDate: 'Checked September 2026'
          }
        ],
        evidence: []
      },
      {
        id: 'eyo-claim-4',
        statement: 'Historical founding date and first staged performance',
        category: 'origin',
        value: 'Sources disagree',
        status: 'conflicting',
        lastReviewedAt: '10 July 2026',
        verification: {
          type: 'cross-referenced',
          verifierName: 'Yoruba Coastal History Project',
          verifierRole: 'Academic & Elder Consortium',
          verifiedDate: '10 July 2026',
          confidenceLevel: 'medium'
        },
        conflictDetails: {
          description: 'Historical texts and family oral lineages differ on whether the first formal Eyo was staged in 1748 or 1854.',
          competingPoints: [
            {
              sourceLabel: 'Source A (Oral Chieftaincy Tradition)',
              sourceName: 'Isale Eko Royal Chroniclers',
              claimValue: 'Circa 1748',
              note: 'Oral accounts trace the first performance to honor the demise of Chief Olorogun Agan, or during the reign of Oba Akinsemoyin.'
            },
            {
              sourceLabel: 'Source B (Colonial Archival Gazette)',
              sourceName: 'Lagos Colonial Records & National Archives Ibadan',
              claimValue: '20 February 1854',
              note: 'Documents the earliest written colonial record of the festival held to honor King Akitoye.'
            },
            {
              sourceLabel: 'Source C (Contemporary Anthropological Monograph)',
              sourceName: 'Prof. Adeboye Babalola (1981)',
              claimValue: 'Mid-18th Century ritual origin evolving into 19th Century civic performance',
              note: 'Synthesizes both accounts, separating esoteric origin from civic commemoration.'
            }
          ],
          resolutionNote: 'No single authoritative document has settled whether 1748 or 1854 is the absolute founding year. Both perspectives are preserved to honor oral history alongside written text.'
        },
        sources: [
          {
            id: 'src-107',
            title: 'History of the Indigenous Peoples of Lagos',
            type: 'archive',
            authorOrOrg: 'National Archives, Ibadan',
            yearOrDate: '1854 Gazette Extract'
          },
          {
            id: 'src-108',
            title: 'Isale Eko Descendants Union Oral Custody',
            type: 'oral-history',
            authorOrOrg: 'Descendants Union Oral Custody',
            yearOrDate: '2015 Oral Record'
          }
        ],
        evidence: [
          {
            id: 'ev-4',
            title: '1854 Administrative Dispatch',
            type: 'document',
            description: 'British consular report mentioning "white clad masqueraders in the township of Eko".'
          }
        ]
      }
    ]
  },
  {
    id: 'nike-art-gallery',
    slug: 'nike-art-gallery',
    name: 'Nike Art Gallery',
    type: 'place',
    location: 'Lekki Phase 1, Lagos',
    neighborhood: 'Lekki Peninsula',
    summary: 'A towering five-storey sanctuary housing over 25,000 West African artworks, textiles, and wood carvings under the stewardship of Mama Nike Okundaye.',
    coverImage: '/images/cultural/nike-art-gallery.jpg',
    coverImageAlt: 'The soaring four-story atrium of Nike Art Gallery in Lekki displaying thousands of Nigerian artworks, wooden totems, and indigo textiles',
    coverImagePosition: 'center center',
    image: {
      src: '/images/cultural/nike-art-gallery.jpg',
      alt: 'The soaring four-story atrium of Nike Art Gallery in Lekki displaying thousands of Nigerian artworks, wooden totems, and indigo textiles',
      objectPosition: 'center center'
    },
    facts: {
      when: 'Year-round',
      where: 'Lekki Phase 1, Lagos',
      visitorAccess: 'Free admission',
      category: 'Cultural Institution'
    },
    overallVerification: 'conflicting',
    happeningNow: false,
    featured: true,
    contributor: {
      id: 'c-lekki-arts',
      name: 'Lekki Arts Documentation Collective',
      roleOrAffiliation: 'Artisanal Archivist',
      community: 'Contemporary Art Network Lagos'
    },
    createdAt: '2026-02-10T11:00:00Z',
    updatedAt: '2026-09-22T16:00:00Z',
    story: {
      introduction: 'Rising four floors above the Lekki expressway like an open-air cultural fortress, Nike Art Gallery is less of a commercial showroom and more of a living repository of Nigerian material culture.',
      sections: [
        {
          heading: 'A Monument to Yoruba Craft and Modern Masters',
          content: 'Chief Nike Monica Okundaye built the gallery without government subsidy, creating the largest private art gallery in West Africa. The walls are wrapped in indigo Adire, hand-loomed Aso Oke, intricately beaded Yoruba crowns, carved wooden pillars from Osogbo, and works by leading Nigerian modernists like Bruce Onobrakpeya and Muraina Oyelami.'
        },
        {
          heading: 'The Conflict of Operating Hours',
          content: 'Because Mama Nike frequently travels between her Oshogbo craft center, Abuja workshop, and international exhibitions, Sunday operational schedules have historically varied between curatorial teams, tourist brochures, and actual on-site gate hours.'
        }
      ]
    },
    claims: [
      {
        id: 'nike-claim-1',
        statement: 'Sunday opening hours',
        category: 'operation',
        value: 'Sources disagree',
        status: 'conflicting',
        lastReviewedAt: '22 September 2026',
        verification: {
          type: 'cross-referenced',
          verifierName: 'EkoTrace Field Verification Team',
          verifierRole: 'Community Auditor',
          verifiedDate: '22 September 2026',
          confidenceLevel: 'medium',
          verificationNotes: 'Multiple authoritative guides publish conflicting Sunday hours.'
        },
        conflictDetails: {
          description: 'Sunday opening times reported across verified institutional materials and visitor registries show conflicting operating windows.',
          competingPoints: [
            {
              sourceLabel: 'Source A',
              claimValue: '10:00–18:00',
              sourceName: 'Curatorial Desk Noticeboard (Front Entry)',
              note: 'Listed on the brass plaque beside the main double doors, updated in late 2024.'
            },
            {
              sourceLabel: 'Source B',
              claimValue: '13:00–18:00',
              sourceName: 'Lagos Tourism Board Digital Directory 2025/2026',
              note: 'Cites afternoon-only opening to allow staff Sunday morning church observance.'
            },
            {
              sourceLabel: 'Source C',
              claimValue: 'Closed',
              sourceName: 'Print Guide to Lekki Peninsula Arts (2023 edition)',
              note: 'Listed as closed on Sundays for conservation and inventory work.'
            }
          ],
          resolutionNote: 'No authoritative source has resolved this yet.'
        },
        sources: [
          {
            id: 'src-201',
            title: 'Curatorial Desk Noticeboard (Physical On-Site Plaque)',
            type: 'field-observation',
            authorOrOrg: 'Nike Art Gallery Operations',
            yearOrDate: 'September 2025'
          },
          {
            id: 'src-202',
            title: 'Lagos State Ministry of Tourism Official Portal Directory',
            type: 'institution',
            authorOrOrg: 'Lagos State Government',
            yearOrDate: '2025 Release'
          },
          {
            id: 'src-203',
            title: 'Lekki Arts Corridor Printed Guide',
            type: 'programme',
            authorOrOrg: 'Lekki Peninsula Cultural Association',
            yearOrDate: '2023'
          }
        ],
        evidence: [
          {
            id: 'ev-201',
            title: 'Photograph of Front Gate Hours Plaque',
            type: 'photo',
            description: 'Plaque displaying "Sunday 10am - 6pm" taken by community auditor.'
          },
          {
            id: 'ev-202',
            title: 'Official Tourism Guide Listing Page 44',
            type: 'document',
            description: 'State tourism brochure displaying "Sunday 1pm - 6pm".'
          }
        ]
      },
      {
        id: 'nike-claim-2',
        statement: 'Houses over 25,000 distinct pieces of Nigerian and African art',
        category: 'significance',
        value: 'Approximately 25,000 catalogued works',
        status: 'verified-institution',
        lastReviewedAt: '14 May 2026',
        verification: {
          type: 'institution',
          verifierName: 'National Commission for Museums and Monuments (NCMM)',
          verifierRole: 'Institutional Partner',
          verifiedDate: '14 May 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-204',
            title: 'Institutional Audit of Private Heritage Collections in Nigeria',
            type: 'institution',
            authorOrOrg: 'NCMM Nigeria',
            yearOrDate: '2024 Inventory'
          }
        ],
        evidence: []
      },
      {
        id: 'nike-claim-3',
        statement: 'General admission fee',
        category: 'access',
        value: 'Free of charge for regular gallery viewing',
        status: 'verified-community',
        lastReviewedAt: '1 September 2026',
        verification: {
          type: 'community',
          verifierName: 'Lagos Visitors Guild',
          verifierRole: 'Field Coordinator',
          verifiedDate: '1 September 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-205',
            title: 'Visitor Reception Protocol & Public Notice',
            type: 'field-observation',
            authorOrOrg: 'Nike Art Gallery Admissions Desk',
            yearOrDate: '2026'
          }
        ],
        evidence: []
      }
    ]
  },
  {
    id: 'fanti-carnival',
    slug: 'fanti-carnival',
    name: 'Fanti Carnival (Caretta)',
    type: 'festival',
    location: 'Campos Square, Lagos Island',
    neighborhood: 'Popo Aguda (Brazilian Quarter)',
    summary: 'The historic Afro-Brazilian Caretta masquerade and brass band procession introduced by 19th-century returnees from Salvador da Bahia.',
    coverImage: '/images/cultural/fanti-carnival.jpg',
    coverImageAlt: 'Afro-Brazilian Caretta bull masquerade and costumed brass band parade in Campos Square, Popo Aguda, Lagos Island',
    coverImagePosition: 'center 30%',
    image: {
      src: '/images/cultural/fanti-carnival.jpg',
      alt: 'Afro-Brazilian Caretta bull masquerade and costumed brass band parade in Campos Square, Popo Aguda, Lagos Island',
      objectPosition: 'center 30%'
    },
    facts: {
      when: 'Easter Monday & Festive Seasons',
      where: 'Campos Square & Popo Aguda',
      visitorAccess: 'Public street celebration',
      category: 'Afro-Brazilian Heritage'
    },
    overallVerification: 'verified-community',
    happeningNow: true,
    eventStatus: 'Annual Street Procession',
    eventDate: 'Easter Monday cycle',
    featured: true,
    contributor: {
      id: 'c-popo-aguda',
      name: 'Popo Aguda Heritage Society',
      roleOrAffiliation: 'Descendants Council',
      community: 'Brazilian Quarter, Lagos Island'
    },
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-08-11T12:00:00Z',
    story: {
      introduction: 'In the narrow, shaded streets between Catholic Mission Street and Campos Square, the sounds of brass horns and samba drums blend with Yoruba rhythms to tell the story of the Emancipados — liberated Africans who sailed back from Brazil to re-establish their lives in Lagos.',
      sections: [
        {
          heading: 'Return to the Island: The Aguda Legacy',
          content: 'Following the Malê revolt of 1835 in Bahia and the gradual abolition of slavery, hundreds of Afro-Brazilian families returned to Lagos. Granted land in what is now Popo Aguda, they brought Portuguese architectural techniques, tailoring, carpentry, and the Caretta carnival — a costumed street procession featuring elaborate papier-mâché bullheads, satirical effigies, and coordinated dance bands.'
        },
        {
          heading: 'The Caretta and the Bull',
          content: 'At the heart of the Fanti parade is the Bumba-meu-Boi tradition, adapted into the Caretta masquerade. Dancers in fringed silk and hand-embroidered sashes weave through Campos Square, stopping in front of ancestral family homes to receive blessings and offerings.'
        }
      ]
    },
    claims: [
      {
        id: 'fanti-claim-1',
        statement: 'The carnival originated with freed Afro-Brazilian returnees settling in Popo Aguda.',
        category: 'origin',
        value: 'Settlement dates between 1835 and 1888',
        status: 'verified-community',
        lastReviewedAt: '11 August 2026',
        verification: {
          type: 'community',
          verifierName: 'Brazilian Descendants Association of Lagos',
          verifierRole: 'Secretary of Archival Heritage',
          verifiedDate: '11 August 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-301',
            title: 'The Brazilian Heritage of Lagos: A Photographic & Historical Compendium',
            type: 'archive',
            authorOrOrg: 'National Museum Lagos & Popo Aguda Society',
            yearOrDate: '2012'
          }
        ],
        evidence: [
          {
            id: 'ev-301',
            title: 'Waterhouse Family Archival Ledger',
            type: 'document',
            description: '1892 journal detailing the Easter Caretta parade route starting at Campos Square.'
          }
        ]
      },
      {
        id: 'fanti-claim-2',
        statement: 'Open to the public without admission ticketing.',
        category: 'access',
        value: 'Completely open street festival',
        status: 'verified-community',
        lastReviewedAt: '11 August 2026',
        verification: {
          type: 'community',
          verifierName: 'Campos Youth Development Forum',
          verifierRole: 'Community Organiser',
          verifiedDate: '11 August 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-302',
            title: 'Lagos Island Civic Events Charter',
            type: 'programme',
            authorOrOrg: 'Lagos Island Local Government',
            yearOrDate: '2025'
          }
        ],
        evidence: []
      }
    ]
  },
  {
    id: 'gelede-festival',
    slug: 'gelede-festival',
    name: 'Gelede Mask Tradition',
    type: 'tradition',
    location: 'Badagry & Ikorodu Yoruba Corridors',
    neighborhood: 'Badagry Division',
    summary: 'A UNESCO-recognized oral and masked performance honoring the primordial mothers (Iya Nla) and balancing communal harmony through artistic spectacle.',
    coverImage: '/images/cultural/gelede-festival.jpg',
    coverImageAlt: 'Intricately carved Yoruba Gelede wooden mask headdress honoring ancestral mothers with traditional scarification and ceremonial superstructure',
    coverImagePosition: 'center top',
    image: {
      src: '/images/cultural/gelede-festival.jpg',
      alt: 'Intricately carved Yoruba Gelede wooden mask headdress honoring ancestral mothers with traditional scarification and ceremonial superstructure',
      objectPosition: 'center top'
    },
    facts: {
      when: 'Pre-planting season (March–May cycle)',
      where: 'Badagry & Ikorodu districts',
      visitorAccess: 'Communal gathering (respectful observers)',
      category: 'Sacred Mask Tradition'
    },
    overallVerification: 'verified-community',
    happeningNow: true,
    eventStatus: 'Active Seasonal Cycle',
    eventDate: 'Spring planting cycle',
    featured: true,
    contributor: {
      id: 'c-badagry-elders',
      name: 'Badagry Division Custodians of Yoruba Folklore',
      roleOrAffiliation: 'Oral Custodian Group',
      community: 'Badagry Community Council'
    },
    createdAt: '2026-03-12T08:00:00Z',
    updatedAt: '2026-07-15T10:00:00Z',
    story: {
      introduction: 'Gelede is not merely an aesthetic dance; it is a profound philosophical tribute to the spiritual and societal authority of Yoruba women, referred to affectionately and reverently as Awon Iya Wa ("Our Mothers").',
      sections: [
        {
          heading: 'Honoring the Mothers of Society',
          content: 'The performances take place day and night. The nocturnal spectacle, Efe, is characterized by song poets who poke fun at social pretenses, criticize community misconduct, and plead for fertility and peace. During the day, carved headdresses depicting everything from serpents and market traders to modern airplanes take center stage, worn by male dancers trained to replicate feminine grace and rhythm.'
        }
      ]
    },
    claims: [
      {
        id: 'gelede-claim-1',
        statement: 'Gelede honors the mystical power and societal centrality of elder women.',
        category: 'significance',
        value: 'Communal veneration of female spiritual potency',
        status: 'verified-community',
        lastReviewedAt: '15 July 2026',
        verification: {
          type: 'community',
          verifierName: 'Council of Badagry Obas & Matriarchs',
          verifierRole: 'Traditional Chieftaincy Council',
          verifiedDate: '15 July 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-401',
            title: 'UNESCO Representative List of Intangible Cultural Heritage',
            type: 'archive',
            authorOrOrg: 'UNESCO Heritage Registry',
            yearOrDate: '2008 Inscription'
          }
        ],
        evidence: []
      },
      {
        id: 'gelede-claim-2',
        statement: 'Masks are crafted primarily from sacred Erumbe wood.',
        category: 'tradition',
        value: 'Hand-carved Erumbe softwood',
        status: 'verified-community',
        lastReviewedAt: '15 July 2026',
        verification: {
          type: 'community',
          verifierName: 'Ikorodu Woodcarvers Guild',
          verifierRole: 'Master Artisan Guild',
          verifiedDate: '15 July 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-402',
            title: 'Field Notes on Southwestern Nigerian Wood Carving Traditions',
            type: 'archive',
            authorOrOrg: 'Institute of African Studies, University of Ibadan',
            yearOrDate: '2016'
          }
        ],
        evidence: []
      }
    ]
  },
  {
    id: 'victoria-island-carnival',
    slug: 'victoria-island-carnival',
    name: 'Victoria Island Street Arts & Carnival',
    type: 'festival',
    location: 'Ahmadu Bello Way, Victoria Island',
    neighborhood: 'Victoria Island Waterfront',
    summary: 'A modern coastal celebration blending contemporary Lagos fashion, stilt acrobatics, street food parades, and coastal conservation awareness.',
    coverImage: '/images/cultural/victoria-island-carnival.jpg',
    coverImageAlt: 'Contemporary Lagos street arts and stilt acrobat performance parade along Ahmadu Bello Way, Victoria Island coastal boulevard',
    coverImagePosition: 'center 40%',
    image: {
      src: '/images/cultural/victoria-island-carnival.jpg',
      alt: 'Contemporary Lagos street arts and stilt acrobat performance parade along Ahmadu Bello Way, Victoria Island coastal boulevard',
      objectPosition: 'center 40%'
    },
    facts: {
      when: 'Mid-December Cultural Week',
      where: 'Ahmadu Bello Way, Victoria Island',
      visitorAccess: 'Public street access & marked stages',
      category: 'Contemporary Street Arts'
    },
    overallVerification: 'verified-institution',
    happeningNow: true,
    eventStatus: 'Scheduled 19–21 December 2026',
    eventDate: 'December 2026',
    featured: false,
    contributor: {
      id: 'c-vi-arts',
      name: 'Lagos Waterfront Arts Initiative',
      roleOrAffiliation: 'Festival Directors',
      community: 'Eko Atlantic Cultural Corridor'
    },
    createdAt: '2026-04-05T14:00:00Z',
    updatedAt: '2026-09-01T11:00:00Z',
    story: {
      introduction: 'Where the Atlantic breeze meets the glass towers of commercial Lagos, the annual street carnival temporarily transforms the business district into a dynamic open-air canvas of living sound and visual rebellion.',
      sections: [
        {
          heading: 'Reclaiming the Public Street',
          content: 'Founded to revive pedestrian community life along the Atlantic shore, the street carnival gathers local youth dance troupes, Afrobeats percussionists, and contemporary costume sculptors. It contrasts the colonial history of the island with bold contemporary Nigerian design.'
        }
      ]
    },
    claims: [
      {
        id: 'vi-claim-1',
        statement: 'Route stretches along Ahmadu Bello Way from Bar Beach point to Kuramo.',
        category: 'location',
        value: 'Ahmadu Bello Way, 3.2km corridor',
        status: 'verified-institution',
        lastReviewedAt: '1 September 2026',
        verification: {
          type: 'institution',
          verifierName: 'Lagos State Ministry of Transportation & Tourism',
          verifierRole: 'Civic Permitting Authority',
          verifiedDate: '1 September 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-501',
            title: 'Lagos State Traffic Management Authority Special Event Gazette',
            type: 'institution',
            authorOrOrg: 'LASTMA',
            yearOrDate: '2025/2026 Roadmap'
          }
        ],
        evidence: []
      }
    ]
  },
  {
    id: 'lagos-suya-heritage',
    slug: 'lagos-suya-heritage',
    name: 'Lagos Suya & Night Grilling Heritage',
    type: 'food',
    location: 'Glover Road, Ikoyi & University of Suya, Ikeja',
    neighborhood: 'Ikoyi & Ikeja Corridors',
    summary: 'The nocturnal culinary heritage of skewered spiced meat, slow-smoked over charcoal embers and seasoned with generations-old northern Yaji recipes.',
    coverImage: '/images/cultural/lagos-suya-heritage.jpg',
    coverImageAlt: 'Mai suya grilling paper-thin spiced beef skewers over open charcoal hearth embers with yaji spice and sliced purple onions at night',
    coverImagePosition: 'center center',
    image: {
      src: '/images/cultural/lagos-suya-heritage.jpg',
      alt: 'Mai suya grilling paper-thin spiced beef skewers over open charcoal hearth embers with yaji spice and sliced purple onions at night',
      objectPosition: 'center center'
    },
    facts: {
      when: 'Nightly, 18:00 to 02:00',
      where: 'Ikoyi, Ikeja & Surulere street hearths',
      visitorAccess: 'Open walk-up culinary spots',
      category: 'Culinary Tradition'
    },
    overallVerification: 'verified-community',
    happeningNow: false,
    featured: true,
    contributor: {
      id: 'c-lagos-food',
      name: 'Lagos Culinary History Guild',
      roleOrAffiliation: 'Food Anthropologist',
      community: 'Nigerian Gastronomy Archive'
    },
    createdAt: '2026-05-18T16:00:00Z',
    updatedAt: '2026-08-30T19:00:00Z',
    story: {
      introduction: 'As daylight recedes across Lagos, roadside kiosks ignite with fragrant hardwood charcoal. Suya is not mere fast food — it is the culinary thread uniting diverse migrations across seven decades of Lagos night culture.',
      sections: [
        {
          heading: 'The Alchemy of Yaji Spice',
          content: 'The soul of Suya is Yaji: an exacting spice blend made of roasted kuli-kuli (groundnut cake powder), ginger, garlic, cayenne peppers, and uda pods. The meat is sliced paper-thin, marinaded in peanut oil, skewered on bicycle-spoke metal rods, and slow-charred over open embers before being wrapped in unprinted craft paper with sliced red onions and cabbage.'
        },
        {
          heading: 'The Mai Suya as Urban Anchors',
          content: 'From the famous Glover Road spot in Ikoyi to the storied University of Suya in Allen Avenue, Ikeja, the grill masters maintain relationships that span generations. Families return to the same hearths their grandparents visited in the 1970s.'
        }
      ]
    },
    claims: [
      {
        id: 'suya-claim-1',
        statement: 'Traditional Yaji contains defatted groundnut cake (kuli-kuli) as its fundamental binder.',
        category: 'tradition',
        value: 'Authentic Hausa-Fulani spice chemistry',
        status: 'verified-community',
        lastReviewedAt: '30 August 2026',
        verification: {
          type: 'community',
          verifierName: 'Association of Traditional Meat Roasters of Lagos',
          verifierRole: 'Guild Elder',
          verifiedDate: '30 August 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-601',
            title: 'Nigerian Foodways & Indigenous Processing Traditions',
            type: 'archive',
            authorOrOrg: 'Federal Institute of Industrial Research Oshodi (FIIRO)',
            yearOrDate: '2014 Research Bulletin'
          }
        ],
        evidence: [
          {
            id: 'ev-601',
            title: 'Field Documentation of Traditional Yaji Mixing',
            type: 'photo',
            description: 'Mortar and pestle blending of ginger, chili, and groundnut flour at Ikeja depot.'
          }
        ]
      },
      {
        id: 'suya-claim-2',
        statement: 'Grilling spots typically operate exclusively from evening onward.',
        category: 'operation',
        value: 'Daily sunset to late night',
        status: 'verified-community',
        lastReviewedAt: '30 August 2026',
        verification: {
          type: 'community',
          verifierName: 'Lagos Night Economy Observational Unit',
          verifierRole: 'Community Surveyor',
          verifiedDate: '30 August 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-602',
            title: 'Field Survey of Street Food Corridors in Lagos',
            type: 'field-observation',
            authorOrOrg: 'Lagos Culinary History Guild',
            yearOrDate: '2026'
          }
        ],
        evidence: []
      }
    ]
  },
  {
    id: 'adire-eleko-craft',
    slug: 'adire-eleko-craft',
    name: 'Adire Eleko & Indigo Dyeing Craft',
    type: 'craft',
    location: 'Itire & Isale Eko Textile Corridors',
    neighborhood: 'Mainland & Island Corridors',
    summary: 'The intricate Yoruba resist-dyeing art using fermented cassava starch (lafun) stencils and natural Indigofera tinctoria leaf pits.',
    coverImage: '/images/cultural/adire-eleko-craft.jpg',
    coverImageAlt: 'Artisanal Yoruba Adire Eleko workshop with dyed indigo cotton cloths displaying delicate cassava starch resist patterns',
    coverImagePosition: 'center 35%',
    image: {
      src: '/images/cultural/adire-eleko-craft.jpg',
      alt: 'Artisanal Yoruba Adire Eleko workshop with dyed indigo cotton cloths displaying delicate cassava starch resist patterns',
      objectPosition: 'center 35%'
    },
    facts: {
      when: 'Year-round workshops',
      where: 'Itire, Surulere & Isale Eko',
      visitorAccess: 'By artisan appointment & market quarters',
      category: 'Traditional Textile Craft'
    },
    overallVerification: 'verified-community',
    happeningNow: false,
    featured: false,
    contributor: {
      id: 'c-adire-guild',
      name: 'Yoruba Indigenous Textile Conservators',
      roleOrAffiliation: 'Master Dyer Guild',
      community: 'Southwestern Nigeria Craft Assembly'
    },
    createdAt: '2026-06-01T11:00:00Z',
    updatedAt: '2026-09-05T13:00:00Z',
    story: {
      introduction: 'Before synthetic dyes arrived on merchant ships, Yoruba textile masters extracted deep royal blues from elú leaves and drew cosmological metaphors onto woven cotton with chicken feathers and bone combs.',
      sections: [
        {
          heading: 'The Language of the Stencil',
          content: 'In Adire Eleko, the paste of fermented cassava flour acts as a barrier against the indigo bath. Classic motifs like Olokun (goddess of the sea), Sunbebe (the beaded hip chain), and Ibadandun (the song of the hill city) each carry proverbs that the wearer silently broadcasts to their community.'
        }
      ]
    },
    claims: [
      {
        id: 'adire-claim-1',
        statement: 'Traditional Adire Eleko uses cassava starch paste (lafun) rather than candle wax.',
        category: 'tradition',
        value: 'Pure fermented cassava paste resist',
        status: 'verified-community',
        lastReviewedAt: '5 September 2026',
        verification: {
          type: 'community',
          verifierName: 'Guild of Yoruba Traditional Dyers',
          verifierRole: 'Grand Matron Dyer',
          verifiedDate: '5 September 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-701',
            title: 'Adire Cloth of the Yorubas: History, Technique and Symbolism',
            type: 'archive',
            authorOrOrg: 'Jane Barbour & Doig Simmonds Monograph',
            yearOrDate: 'Historical Reference Edition'
          }
        ],
        evidence: [
          {
            id: 'ev-701',
            title: 'Artisan Workshop Tool Sample (Chicken Feather & Zinc Comb)',
            type: 'photo',
            description: 'Tools utilized by Mama Sadiat in Itire workshop for freehand cassava drawing.'
          }
        ]
      }
    ]
  },
  {
    id: 'makoko-waterfront-heritage',
    slug: 'makoko-waterfront-heritage',
    name: 'Makoko Stilt Heritage & Lagoon Culture',
    type: 'story',
    location: 'Lagos Lagoon, Yaba Coast',
    neighborhood: 'Yaba Waterfront',
    summary: 'Centuries of indigenous Egun aquatic engineering, wooden canoe transport, and sustainable artisanal fishing thriving above the calm waters of the Lagos Lagoon.',
    coverImage: '/images/cultural/makoko-waterfront-heritage.jpg',
    coverImageAlt: 'Traditional timber stilt houses elevated above the calm Lagos Lagoon in Makoko with wooden dugout canoes on the water',
    coverImagePosition: 'center 40%',
    image: {
      src: '/images/cultural/makoko-waterfront-heritage.jpg',
      alt: 'Traditional timber stilt houses elevated above the calm Lagos Lagoon in Makoko with wooden dugout canoes on the water',
      objectPosition: 'center 40%'
    },
    facts: {
      when: 'Continuous historic settlement',
      where: 'Yaba Lagoon Waterfront',
      visitorAccess: 'Community-guided protocol only',
      category: 'Waterfront Oral Heritage'
    },
    overallVerification: 'verified-community',
    happeningNow: false,
    featured: true,
    contributor: {
      id: 'c-makoko-elders',
      name: 'Makoko Community Elders & Baale Council',
      roleOrAffiliation: 'Waterfront Traditional Council',
      community: 'Lagos Lagoon Egun Settlement'
    },
    createdAt: '2026-06-20T10:00:00Z',
    updatedAt: '2026-09-10T15:00:00Z',
    story: {
      introduction: 'Long before the Third Mainland Bridge cast its concrete shadows over the lagoon, the Egun and Ilaje fishermen had constructed an intricate world anchored on hardwood stilts driven deep into the lagoon mud.',
      sections: [
        {
          heading: 'A Venice Built on Hardwood and Resilience',
          content: 'Life in Makoko is conducted entirely by boat. Children learn to row narrow dugout canoes before they can run. Floating convenience stores, bakeries on pontoons, and churches on timber platforms demonstrate centuries of aquatic civil engineering that modern city planners frequently misunderstand.'
        },
        {
          heading: 'Preserving Oral Rights and Coastal Memory',
          content: 'Faced with multiple reclamation projects and climate challenges, the community elders have partnered with cultural researchers to document their oral genealogies, boat-carving traditions, and traditional waterway fishing rights dating back over 150 years.'
        }
      ]
    },
    claims: [
      {
        id: 'makoko-claim-1',
        statement: 'The settlement was originally founded as a seasonal fishing camp in the 19th century.',
        category: 'origin',
        value: 'Circa 1860s seasonal camp evolving to permanent community',
        status: 'verified-community',
        lastReviewedAt: '10 September 2026',
        verification: {
          type: 'community',
          verifierName: 'Council of Makoko Baales',
          verifierRole: 'Community Head',
          verifiedDate: '10 September 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-801',
            title: 'Lagoon Settlers: Oral Genealogies of the Coastal Egun Peoples',
            type: 'oral-history',
            authorOrOrg: 'Makoko Elders Oral History Archive',
            yearOrDate: '2021 Recorded Deposition'
          }
        ],
        evidence: [
          {
            id: 'ev-801',
            title: '1908 British Admiralty Hydrographic Survey of Lagos Lagoon',
            type: 'document',
            description: 'Survey map marking indigenous stilt fish-traps and settlement huts along Yaba coast.'
          }
        ]
      },
      {
        id: 'makoko-claim-2',
        statement: 'Visitor access requires community-guided host protocol and permission from the local Baale.',
        category: 'access',
        value: 'Guided community protocol only',
        status: 'verified-community',
        lastReviewedAt: '10 September 2026',
        verification: {
          type: 'community',
          verifierName: 'Makoko Community Youth & Security Council',
          verifierRole: 'Community Liaison',
          verifiedDate: '10 September 2026',
          confidenceLevel: 'high'
        },
        sources: [
          {
            id: 'src-802',
            title: 'Community Ethical Tourism Charter',
            type: 'community',
            authorOrOrg: 'Makoko Community Leadership',
            yearOrDate: '2024'
          }
        ],
        evidence: []
      }
    ]
  }
];

export const SEEDED_CONTRIBUTION_REVIEWS: ContributionSubmission[] = [
  {
    id: 'eyo-community-update',
    assetTitle: 'Eyo Festival 2026 Procession Protocol & Route Update',
    category: 'festival',
    rawText: 'Every December, our elders gather at Iga Idunganran to review the ceremonial grounds. For the coming commemorative cycle, the Laba and Oniko conclaves have agreed to lead the preparatory prayers. The central procession will assemble at Tafawa Balewa Square and conclude at the palace of the Oba of Lagos in Isale Eko.',
    location: 'Lagos Island (Isale Eko and TBS)',
    evidence: [
      {
        id: 'ev-sub-1',
        name: 'Palace Council Resolution Note.pdf',
        type: 'document'
      },
      {
        id: 'ev-sub-2',
        name: 'Isale Eko Conclave Photograph.jpg',
        type: 'photo'
      }
    ],
    extractedClaims: [
      {
        id: 'ext-claim-1',
        title: 'Ceremonial Gathering Location',
        statement: 'The festival procession takes place on Lagos Island connecting TBS and Isale Eko.',
        status: 'confirmed',
        value: 'Lagos Island, Isale Eko corridor'
      },
      {
        id: 'ext-claim-2',
        title: 'Conclave Participation Order',
        statement: 'The Laba and Oniko conclaves are designated to lead the opening ceremonial prayers.',
        status: 'confirmed',
        value: 'Laba and Oniko Conclaves'
      },
      {
        id: 'ext-claim-3',
        title: '2026 Exact Festival Date',
        statement: 'Exact calendar date for the 2026 Eyo festival performance.',
        status: 'unknown',
        isUnknown: true,
        clarificationPrompt: 'You mentioned that the event normally happens towards the end of the year. Exact date: Unknown. We won’t guess information you didn’t provide.'
      },
      {
        id: 'ext-claim-4',
        title: 'Public Footwear & Headgear Prohibition',
        statement: 'Visitors and celebrants must remove hats, caps, sandals, and head ties in proximity of Eyo.',
        status: 'confirmed',
        value: 'Barefoot and bareheaded protocol'
      },
      {
        id: 'ext-claim-5',
        title: 'Expected Spectator Attendance Count',
        statement: 'Projected number of participants and tourists attending the ceremony.',
        status: 'needs-clarification',
        clarificationPrompt: 'Attendance figures vary widely across police estimations and cultural committees.'
      }
    ],
    knowledgeOwner: 'My community',
    publicDisplayPermission: 'Yes',
    submittedBy: 'Babajide Adeleke (Isale Eko Heritage Youth Guild)',
    status: 'under-review',
    createdAt: '2026-09-28T14:15:00Z'
  }
];
