import { useEffect, useRef, useState } from 'react';

function useSticky() {
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        setIsSticky(
          window.scrollY > navRef.current.getBoundingClientRect().top,
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => removeEventListener('scroll', handleScroll);
  }, []);
  return { isSticky, navRef };
}

export default useSticky;
