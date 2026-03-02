import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
export function RouteAnnouncer() {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState('');
  useEffect(() => {
    const pageName = location.pathname === '/'
      ? 'Overview'
      : location.pathname.substring(1).split('/')[0].charAt(0).toUpperCase() +
        location.pathname.substring(1).split('/')[0].slice(1);
    setAnnouncement(`Navigated to ${pageName} page`);
  }, [location]);
  return (
    <div 
      aria-live="polite" 
      aria-atomic="true"
      className="sr-only" 
      role="status"
    >
      {announcement}
    </div>
  );
}