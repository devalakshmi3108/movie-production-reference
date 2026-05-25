/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  genre: string;
  year: string;
  duration?: string;
  rating?: string;
  synopsis: string;
  director: string;
  backgroundUrl: string;
  posterUrl: string;
  pipelineSpecs?: {
    camera: string;
    unaiVersion: string;
    renderTime: string;
    fpsTarget: string;
  };
  trailerUrl?: string; // We can embed or simulate a visual player
}

export interface PipelineService {
  id: string;
  title: string;
  iconName: string;
  description: string;
  systemCode: string; // e.g., VPS-901
  status: 'ACTIVE' | 'STANDBY' | 'MAINTENANCE';
  utilization: number;
}
