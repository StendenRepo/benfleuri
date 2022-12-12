import MainLayout from '../layout/mainLayout';
import CreateUser from './admin/createUser/createUser';
import ChangeUser from './admin/changeUser/changeUser';

export default function Home() {
  return (
    <MainLayout>
      <CreateUser />
    </MainLayout>
  );
}
