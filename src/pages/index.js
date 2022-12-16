import MainLayout from '../layout/MainLayout';
import CreateUser from './admin/createUser';

export default function Home() {
  return (
    <MainLayout>
      <CreateUser />
    </MainLayout>
  );
}
