import classNames from 'classnames';
 import Sidebar from '../components/Sidebar';

export default function MainLayout({ children, useContainer = true }) {
  return (
    <div className="flex">
      <Sidebar />
      <main
        className={classNames(
          useContainer && 'container',
          'mx-auto flex flex-col min-h-screen'
        )}
      >
        {children}
      </main>
    </div>
  );
}
