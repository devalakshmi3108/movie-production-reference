/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Movie, PipelineService } from './types';

export const HERO_BG_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkpeBB5TLtAkT9EEx_BshAOq8tbm9h6PY0LwwpsgT_kAlic4vNmmSTpIQ4OgDoUaP8ospDRHkTGfjz_s7mkqYMWVF4LOSaxk7GF7Rej0EfUnDazu_xd6kEjOY9sU1-GNW0aVK52BxP8PjvKKiRAdO2kt3UXUMSnNV-WpcldpKD8ddwEbLSut29l1by_3yZpyJI4ijmGDaoSGiHvjYZ-KYfQ68VUYHmIzPoE5oxsdwPJpyTncM_nReYCJcc7BJ3rKURLcI15Dm3T8w';
export const STUDIO_PREVIEW_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAXAQvM3oY0x_fd89tqZuKe5u30sp5jBQ3SKxC0eyJFS-5gZUyo334PntJt3XuVFXtUKCAgTT-PbPlpm-kCTkcy7vXQfmVNJ-ywpvg0HBM61HBFmxWX6ifYzDFzUJPk9qzBS2qMlpmi1_DQ8tcJulCSal1ipfQ_zghCBKmv-WPAUSt0pXFadiNsYYu6nhs_-FvT6zIlmNE8Tyx-76V5IpXAq9aSXFxmI4WhnBhrhRiv4zTosd1sy9XufWGyW4kx97a-ObCjvMhM3Q';

export const MOVIES: Movie[] = [
  {
    id: 'sirai',
    title: 'SIRAI',
    tagline: 'Captive minds, endless loops.',
    genre: 'SCI-FI DRAMA',
    year: '2024',
    duration: '2h 18m',
    rating: 'UA (13+)',
    synopsis: 'Set in a near-future automated penal colony governed by artificial intelligence, Sirai tells the gripping story of an innocent engineer trapped inside. Realities blur as the prison mainframe continuously morphs the physical environment to test human cognitive endurance and resilience.',
    director: 'Balan',
    backgroundUrl: HERO_BG_URL,
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjzbBXDSMOV87HXLsfonp5xylQU3m7iY21YmjUNAWlg6Exk58fjZPx6Ja59EMiSWJwJt2sjd0qga9i9il0k3N0qOqYxfp2Ar2FQ9EdD8ph-u3Tv98jEfReES9Wl3AQY-ETJPBLZDhHjCG__CpjMmLhHmiyEc-PwUsE32B6Z8GYhpvgF1DbE3OuNyhQKLNBlwurBhIX_a-Pas3I99dkDyvPc6W25SLomC2YvuhCkoDIwaFQX1uM2cpCexphTdGfMMBmTGmF8qESouI',
    pipelineSpecs: {
      camera: 'ARRI Alexa 35 Cinema System',
      unaiVersion: 'UNAI Tech AI-Denoiser v4.1',
      renderTime: '18,450 Node Hours',
      fpsTarget: '120 FPS High-Frame-Rate'
    }
  },
  {
    id: 'ninety-six',
    title: 'NINETY SIX',
    tagline: 'Time heals nothing. It only waits.',
    genre: 'ROMANCE',
    year: '2024',
    duration: '2h 30m',
    rating: 'U',
    synopsis: 'A reunion film tracing the intense nostalgic and emotional journey of two high-school lovers navigating adulthood. Realized using advanced virtual stage production, ninety six captures long-lost spaces with hyper-realistic light fields and neural spatial audio replication.',
    director: 'C. Prem Kumar',
    backgroundUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaWxB3aFVyj4utHLHX26pGamzRC9D37GMfwWCjXl4huJRzvQzXFpymr_sUfJTE67TOEldj5roFnMMi9m8mXQS5lgBFJ-ZSXzuRUTqiYtVNaeLDJVqoOtWe_DDn4NqDumZTyO_60Pm8n-nTQs6Jaa4-SsUEN4HePkGdaPWjlxgHpyXysaekBMJH2bEnstucH3ERxDdN8k7utviTs5u2D2TrkMwx0IUo0V-Zo4tTDMMI6MnTxqlpq-6_tVkBOW6E1VUlzvsMTMy5yNE',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFXBT8KKWmZC5kQSpVIvVD5PcU7hjezwHBpr2dLbqjQ_bC3rDLU4TWdHDlBAImQ8Y5mgFJHirT2IH3wiTkG1gUZnaGse8x5iJv6iVspIKpKpy5vJ9qnxHMJnVh4MhKqDg-QcztUjXJU1goTTyDYsuze7ARhYwsiH5z3pM9sEP-WOAKZGc97YqvLkqjaasMmnDDZ9gY0CYs3h-pLAzcc0BpiZqL60nfrYhLum88Qd84Kktdq9AQylcA6Q_hLWx5Ht4veFLMm-0oY7M',
    pipelineSpecs: {
      camera: 'RED V-Raptor XL 8K VV',
      unaiVersion: 'UNAI Tech ColorSpace Grade Gen-II',
      renderTime: '12,200 Node Hours',
      fpsTarget: '24 FPS Cinematic standard'
    }
  },
  {
    id: 'oh-my-kadavule',
    title: 'OH MY KADAVULE',
    tagline: 'What if you got a second chance at destiny?',
    genre: 'FANTASY COMEDY',
    year: '2024',
    duration: '2h 15m',
    rating: 'UA (All Ages)',
    synopsis: 'An imaginative fantasy-comedy where a desperate young man receives a golden ticket from a mysterious court of God, allowing him to rewrite his marriage mistakes. The magical transitions and temporal loops are fully engineered by UNAI Tech real-time rendering engine.',
    director: 'Ashwath Marimuthu',
    backgroundUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHD_uBvI_3Wags03PcXxwRcWI3Y0kwiq9DWhZvKtN1R91-5C-eMqsOFJtpNbfT5Q6Grc-hf2wzI7dyClEZaWkjIYDOJIASJp5hLeam33ttVkMz_TMaaPwE3SjzpqMhi7VtxkCDWq08mK9UmEjzylZIiq8u5bezF6RNQORrjN3EU8vRZaMJtdwVwZ0CXYjNe_jpapreWnyPDYA-RSJNdNXNFfjcfX0smh1YxHrIvbGQrdSiXgkUt91BYrXAUtCBUuKh0e1YHNybkfU',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHD_uBvI_3Wags03PcXxwRcWI3Y0kwiq9DWhZvKtN1R91-5C-eMqsOFJtpNbfT5Q6Grc-hf2wzI7dyClEZaWkjIYDOJIASJp5hLeam33ttVkMz_TMaaPwE3SjzpqMhi7VtxkCDWq08mK9UmEjzylZIiq8u5bezF6RNQORrjN3EU8vRZaMJtdwVwZ0CXYjNe_jpapreWnyPDYA-RSJNdNXNFfjcfX0smh1YxHrIvbGQrdSiXgkUt91BYrXAUtCBUuKh0e1YHNybkfU',
    pipelineSpecs: {
      camera: 'Sony VENICE 2 8K',
      unaiVersion: 'UNAI Real-Time Light Synthesis v2.0',
      renderTime: '9,800 Node Hours',
      fpsTarget: '48 FPS Cinematic High Rate'
    }
  }
];

export const UPCOMING_MOVIE: Movie = {
  id: 'project-deiva-thirumagal',
  title: 'PROJECT DEIVA THIRUMAGAL',
  tagline: 'Pure emotion, amplified by AI technology.',
  genre: 'DRAMA / SCI-FI FLUID',
  year: '2026',
  duration: 'TBA',
  synopsis: 'A pioneering soul-stirring narrative exploring parent-child human connection through a futuristic lens. Combining practical camera systems with near-future AI architecture, capturing unprecedented micro-expressions and high-frequency tactile features. Currently in late-stage post-production at our Singapore Hub.',
  director: 'A.L. Vijay',
  backgroundUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqN97Wx0QxvOGZGH3f41O5TUVQ2VNPiLjZ_XHQmsmRdt-Xs_TBEQhsPG6Un0Lw69nEEE2BEo2YRJulUOVmGBZnZ5yxDlUpjgR5I8STdvOSyNJgNWq0dx-COGdImHtJYDjvxAzDNjIYLzcvA4WBFBS_caP9nnM2JVJZh5G9F_RX09MORFuJMn-KTQ5m3kvsQhwzyTGkSU2JO_T8T9Pkoro3hQmtcJXF-rWws1sBLDqznLJsXB6Pt9pJA4UKwbBIWfMsMb3bpsEIl0',
  posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYqN97Wx0QxvOGZGH3f41O5TUVQ2VNPiLjZ_XHQmsmRdt-Xs_TBEQhsPG6Un0Lw69nEEE2BEo2YRJulUOVmGBZnZ5yxDlUpjgR5I8STdvOSyNJgNWq0dx-COGdImHtJYDjvxAzDNjIYLzcvA4WBFBS_caP9nnM2JVJZh5G9F_RX09MORFuJMn-KTQ5m3kvsQhwzyTGkSU2JO_T8T9Pkoro3hQmtcJXF-rWws1sBLDqznLJsXB6Pt9pJA4UKwbBIWfMsMb3bpsEIl0',
  pipelineSpecs: {
    camera: 'ARRI Alexa 65 Custom Sensor Mod',
    unaiVersion: 'UNAI Tech AI-Synthesis v6.0-Beta',
    renderTime: 'Currently estimating',
    fpsTarget: '120 FPS Native Hologram-Ready'
  }
};

export const PIPELINE_SERVICES: PipelineService[] = [
  {
    id: 'film-production',
    title: 'Film Production',
    iconName: 'Clapperboard',
    description: 'High-fidelity cinematic shooting coupled with multi-camera spatial sync protocols.',
    systemCode: 'FPS-101',
    status: 'ACTIVE',
    utilization: 87
  },
  {
    id: 'vfx-architecture',
    title: 'VFX Architecture',
    iconName: 'Sparkles',
    description: 'Algorithmic asset rendering pipelines with precise sub-surface scattering meshes.',
    systemCode: 'VFX-204',
    status: 'ACTIVE',
    utilization: 94
  },
  {
    id: 'ai-visual-effects',
    title: 'AI Visual Effects',
    iconName: 'Cpu',
    description: 'Near-future AI generation framework for dynamic backdrops and generative temporal scaling.',
    systemCode: 'AVX-402',
    status: 'ACTIVE',
    utilization: 76
  },
  {
    id: 'spatial-audio',
    title: 'Spatial Audio',
    iconName: 'Volume2',
    description: 'Dolby Atmos and DTS:X positional wave fields with dynamic tracking algorithms.',
    systemCode: 'AUD-310',
    status: 'STANDBY',
    utilization: 12
  },
  {
    id: 'virtual-scenography',
    title: 'Virtual Scenography',
    iconName: 'Compass',
    description: 'Real-time digital background stages utilizing ultra-fine micro-LED hardware.',
    systemCode: 'VSG-508',
    status: 'ACTIVE',
    utilization: 91
  },
  {
    id: 'digital-distribution',
    title: 'Digital Distribution',
    iconName: 'Layers',
    description: 'Decentralized high-bitrate ingestion network optimized for worldwide nodes.',
    systemCode: 'DST-640',
    status: 'ACTIVE',
    utilization: 62
  },
  {
    id: 'motion-capture',
    title: 'Motion Capture',
    iconName: 'Video',
    description: 'Markerless dynamic skeletal spatial translation powered by deep learning.',
    systemCode: 'MOC-701',
    status: 'MAINTENANCE',
    utilization: 0
  },
  {
    id: 'audience-data-labs',
    title: 'Audience Data Labs',
    iconName: 'BarChart3',
    description: 'Emotional attention engagement and spatial telemetry feedback analytics.',
    systemCode: 'ADL-902',
    status: 'ACTIVE',
    utilization: 45
  }
];

export const GALLERY_IMAGES = [
  {
    title: 'Jersey',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH_myTs1qZRubY569__jbWN47wglLQ9MUCGom6g0eykPqOPBeJzDU3Hcgc9h0vWch2uTnL-LvuLcKkqvi8tCfSXhbOHtiTUuxZIyolkCLhuAB3ldbMZSJryvmRzsNQr6BfiszBeX_73WomsXcmrdDk0FpfzQGU0Rgeimtu2WKCJyHUt0ji-iZuGltYf1gkAXiz6pJZBq8exqw6T2FtJM9K77SxPfewmSpMg_aNP5IDN8gWptp8c0APrqCHQYbC4qE3nZjh571dUVg',
    aspect: 'tall'
  },
  {
    title: 'Remo',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaWxB3aFVyj4utHLHX26pGamzRC9D37GMfwWCjXl4huJRzvQzXFpymr_sUfJTE67TOEldj5roFnMMi9m8mXQS5lgBFJ-ZSXzuRUTqiYtVNaeLDJVqoOtWe_DDn4NqDumZTyO_60Pm8n-nTQs6Jaa4-SsUEN4HePkGdaPWjlxgHpyXysaekBMJH2bEnstucH3ERxDdN8k7utviTs5u2D2TrkMwx0IUo0V-Zo4tTDMMI6MnTxqlpq-6_tVkBOW6E1VUlzvsMTMy5yNE',
    aspect: 'tall'
  },
  {
    title: 'Theri',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlaDWNq3ABU2eXL247L5Ip4gtkV4AZNtHCFUemEvbZ_SZvu4wARmZBpoP0LdGgTmufpDDRyVr084f6vK7U8iiCo-qvuyrP2Il51APO4u__WmJTl8C1vVKbXXBbR1sqqJQYZ49K482f_W3e_l-AMBxf5mL-RHD4PJd0FcqugUYN8nhFgW_2v03JrfvHAQzwY_OAIYybmOhyTSMzBHjomq_NUo4rSvtMRFRHftqeWXQ-RXQzLy74zkRqnivEMDpK-HTjDId0dW0D1Ts',
    aspect: 'tall'
  },
  {
    title: 'Camera Lens Close-up',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJexp4ubC6L2erZMHXc398F-EEF4o-iXaZTXEZipknpqmuX9IN6-2Mk1pIYDWnPlya90OUBBIPz50b2qUZwiWR_lFea9pHiOw08Ie88o91HV7UCSHfChhmVnGn7eoEyMtGhn328psdDVIzbzyy0sOGROU4rcey6wXDsU8KViMjmi7b5qDMHRcHHqCYXflCvfe7h6R3oTYU99Etnz2uFCPo2Ho5vvfL0CO9P1NJu-IZX12cZ7GQY4pMJM0Y-WtPP5vv1pyYnmpY30E',
    aspect: 'square'
  }
];
