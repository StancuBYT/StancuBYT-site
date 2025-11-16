import React from 'react';

export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', marginTop: '50px' }}>
      &copy; {new Date().getFullYear()} StancuBYT. All rights reserved.
    </footer>
  );
}

