
import { useState , useEffect } from 'react';

const GetRandomColor = () => {

    const [textColor, setTextColor] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        const color = getRandomColor();
        setTextColor(color);
      }, 2000);
    
      return () => {
        clearInterval(interval);
      };
    }, []);
    
    
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    return textColor; 
   
};
export default GetRandomColor  ;