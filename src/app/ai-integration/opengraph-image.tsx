import { ImageResponse } from 'next/og';
import { getVerticalConfig } from './_lib/verticals/_registry';

export const runtime = 'edge';
export const alt = 'AI Integration Services';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // For now, use default vertical
  // In v2, could read from searchParams if needed
  const config = getVerticalConfig('default');

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: '#0a192f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        {/* Vertical name badge */}
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            color: '#57cbff',
            border: '2px solid #57cbff',
            borderRadius: '4px',
            padding: '12px 24px',
            marginBottom: '40px',
            fontFamily: 'monospace',
          }}
        >
          {config.displayName.toUpperCase()}
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#ccd6f6',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {config.hero.headlineLine1}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#57cbff',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {config.hero.headlineLine2}
          </div>
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: 28,
            color: '#8892b0',
            marginTop: '30px',
            maxWidth: '900px',
            lineHeight: 1.4,
          }}
        >
          {config.hero.subheadline}
        </div>

        {/* Footer branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: '#8892b0',
              fontFamily: 'monospace',
            }}
          >
            galmoussan.com/ai-integration
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
