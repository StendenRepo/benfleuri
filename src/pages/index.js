import MainLayout from '../layout/mainLayout';
import CreateUser from './admin/createUser/createUser';

export default function Home() {
  return (
    <MainLayout>
      <CreateUser />
    </MainLayout>
  );
}
