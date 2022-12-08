import MainLayout from '../layout/mainLayout';
import CreateUser from './admin/createUser';

export default function Home() {
  return (
    <MainLayout>
      <CreateUser />
    </MainLayout>
  );
}
