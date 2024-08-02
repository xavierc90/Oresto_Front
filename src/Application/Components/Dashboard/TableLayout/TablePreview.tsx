import React from 'react';

interface TablePreviewProps {
  number: string;
  shape: string;
  svg: string;
}

export const TablePreview: React.FC<TablePreviewProps> = ({ number, shape, svg }) => {
  return (
    <div className="table-preview-container" style={{ position: 'relative', width: 100, height: 100 }}>
      <img src={svg} alt={`Table ${shape}`} style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontWeight: 'bold'
      }}>
        {number}
      </div>
    </div>
  );
};
