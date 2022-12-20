import MainLayout from '../layout/MainLayout';
import CreateUser from './admin/createUser/createUser';
import ChangeUser from './admin/changeUser/changeUser';
import CustomerOverview from './admin/customerOverview/customerOverview';

export default function Home() {
  return (
    <MainLayout>
      <CustomerOverview />
    </MainLayout>
  );
}
