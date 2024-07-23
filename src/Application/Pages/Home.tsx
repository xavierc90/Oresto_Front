import {App} from '../../App'
import { useEffect } from 'react';

export const Home = () => {
  useEffect(() => {
    document.title = 'La belle assiette - Restaurant traditionnel';
  }, []);

  return (
    <div className='bg-home'>
      Site du restaurant
    </div>
  )
}
