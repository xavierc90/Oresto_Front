import {App} from '../../App'
import { useEffect } from 'react';

export const Home = () => {
  useEffect(() => {
    document.title = 'La belle assiette - Restaurant traditionnel';
  }, []);
  
  return (
    <App />
  )
}
