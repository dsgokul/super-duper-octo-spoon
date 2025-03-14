// components/ScreeningDetailsCard.tsx
import React from 'react';

interface ScreeningDetailsCardProps {
  title: string;
}

const ScreeningDetailsCard: React.FC<ScreeningDetailsCardProps> = ({ title }) => {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '1.5rem',
        backgroundColor: '#fff',
      }}
    >
      <header style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{title}</h2>
      </header>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Purpose:</h3>
        <p style={{ color: '#6b7280' }}>
          To filter candidates based on measurable criteria.
        </p>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
          Filtering Attributes and Criteria:
        </h3>
        <ul style={{ marginLeft: '1.5rem', listStyleType: 'disc', marginBottom: '1rem' }}>
          <li>
            <span style={{ fontWeight: 500 }}>Attribute 1: Specific Skill/Expertise</span>
            <ul style={{ marginLeft: '1.5rem', listStyleType: 'circle', marginTop: '0.25rem' }}>
              <li style={{ color: '#6b7280' }}>
                Mention the skills and expertise which is being looked forward for
              </li>
            </ul>
          </li>
          <li>
            <span style={{ fontWeight: 500 }}>Attribute 2: Geographic Availability</span>
            <ul style={{ marginLeft: '1.5rem', listStyleType: 'circle', marginTop: '0.25rem' }}>
              <li style={{ color: '#6b7280' }}>Mention location</li>
            </ul>
          </li>
        </ul>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Shortlisting Process:</h3>
        <ol style={{ marginLeft: '1.5rem', listStyleType: 'decimal', marginBottom: '1rem' }}>
          <li style={{ color: '#6b7280' }}>
            Review each trainer lead against the defined attributes and criteria.
          </li>
          <li style={{ color: '#6b7280' }}>
            Capture the results of the evaluation for each attribute.
          </li>
          <li style={{ color: '#6b7280' }}>
            Filter out trainers who do not meet the minimum threshold for all or key attributes.
          </li>
          <li style={{ color: '#6b7280' }}>
            Create a shortlist of trainers who meet the defined criteria.
          </li>
        </ol>
      </div>
      <div>
        <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Timeline:</h3>
        <p style={{ color: '#6b7280' }}>Ongoing</p>
      </div>
    </div>
  );
};

export default ScreeningDetailsCard;
