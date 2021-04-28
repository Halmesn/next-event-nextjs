import Header from './Header';
import { GlobalContext } from 'store/GlobalContext';
import { useContext } from 'react';
import Notification from 'components/ui/Notification';

export default function Layout({ children }) {
  const { notification } = useContext(GlobalContext);

  return (
    <>
      <Header />
      <main>{children}</main>
      {notification && <Notification />}
    </>
  );
}
