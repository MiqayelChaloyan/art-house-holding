declare module 'react-simple-maps' {
  import type { GeoProjection } from 'd3-geo';
  import type { CSSProperties, ReactNode } from 'react';

  export type ProjectionConfig = {
    scale?: number;
    center?: [number, number];
  };

  export type ComposableMapProps = {
    projection?: string | GeoProjection;
    projectionConfig?: ProjectionConfig;
    width?: number;
    height?: number;
    preserveAspectRatio?: string;
    className?: string;
    children?: ReactNode;
  };

  export type GeographyProps = {
    geography: {
      rsmKey: string;
      id?: string | number;
      properties?: Record<string, unknown>;
    };
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: CSSProperties;
      hover?: CSSProperties;
      pressed?: CSSProperties;
    };
    onClick?: () => void;
  };

  export type MarkerProps = {
    coordinates: [number, number];
    onClick?: () => void;
    children?: ReactNode;
  };

  export type GeographiesProps = {
    geography: string | object;
    children: (args: {
      geographies: GeographyProps['geography'][];
    }) => ReactNode;
  };

  export function ComposableMap(props: ComposableMapProps): JSX.Element;
  export function Geographies(props: GeographiesProps): JSX.Element;
  export function Geography(props: GeographyProps): JSX.Element;
  export function Marker(props: MarkerProps): JSX.Element;
}

declare module 'world-atlas/countries-50m.json' {
  const value: object;
  export default value;
}

declare module 'i18n-iso-countries/langs/en.json' {
  const value: object;
  export default value;
}
