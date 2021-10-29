import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  let small = false;
  let medium = false;
  let large = false;
  // console.log(windowDimensions)

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if(windowDimensions.width <= 640) {
    // console.log("small");
      small = true;
  } else if(windowDimensions.width <= 1007){
    // console.log("medium");
      medium = true;
  } else {
      large = true;
      // console.log("large");
  }

  return {small, medium, large};
}