export const LogoFull = () => {
  return (
    <div style={{ display: 'grid', lineHeight: 1 }}>
      <span
        style={{
          color: 'var(--efx-brand-red)',
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: '-0.03em',
        }}
      >
        Equifax AI
      </span>
      <span
        style={{
          color: 'var(--efx-brand-gray)',
          fontWeight: 700,
          fontSize: 13,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        Backstage
      </span>
    </div>
  );
};
