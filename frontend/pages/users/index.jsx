import userData from 'data/userdata';
import UserItem from '../../components/UserItem';
import Layout from '../../components/Layout';

const UsersPage = ({ data }) => (
  <div>
    <Layout>
      <h1>Users</h1>
      {data.users.length === 0 && <h3>No users to show</h3>}

      {data.users.map((usr) => (
        <UserItem key={usr.id} usr={usr} />
      ))}
    </Layout>
  </div>
);

export async function getStaticProps() {
  return {
    props: { data: userData },
    revalidate: 1,
  };
}

export default UsersPage;
