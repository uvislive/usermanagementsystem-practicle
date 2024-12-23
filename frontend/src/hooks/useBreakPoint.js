import { useState, useEffect } from 'react';

 function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getBreakpoint(width) {
    if (width >= 1280) return 'lg';
    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 340) return 'sm';
    return 'xs';
  }

  return breakpoint;
}


export default useBreakpoint;