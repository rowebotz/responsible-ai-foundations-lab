import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export function RouteAnnouncer() {
  const location = useLocation();
  useEffect(() => {
    const announcer = document.getElementById('route-announcer');
    if (announcer) {
      const pageName = location.pathname === '/'
        ? 'Overview'
        : location.pathname.substring(1).split('/')[0].charAt(0).toUpperCase() + 
          location.pathname.substring(1).split('/')[0].slice(1);
      announcer.textContent = `Navigated to ${pageName} page`;
    }
  }, [location]);
  return null;
}