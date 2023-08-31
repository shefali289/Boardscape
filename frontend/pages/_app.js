import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import Footer from 'components/Footer';
import { AuthProvider } from '../context/auth';
import client from '../apollo-client';
import '../styles/globals.css';
import themes from '../themes';
import Navbar from '../components/Navbar';
// import Footer from '../components/footer/footer.component';

const MyApp = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <ThemeProvider theme={themes()}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  </ApolloProvider>
);

export default MyApp;
