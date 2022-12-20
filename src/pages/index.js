import MainLayout from '../layout/MainLayout';
import CreateUser from './admin/createUser';
import ChangeUser from './admin/changeUser/changeUser';

export default function Home() {
  return (
    <MainLayout>
      <ChangeUser />
    </MainLayout>
  );
}
