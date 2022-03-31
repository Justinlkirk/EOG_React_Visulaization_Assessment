import React from 'react';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';
import DashboardVisualization from './components/DashboardVisualization';

const client = new ApolloClient({
  uri: 'https://react-assessment.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Wrapper>
      <ApolloProvider client={client}>
        <Header />
        <NowWhat />
        <DashboardVisualization />
        <ToastContainer />
      </ApolloProvider>
    </Wrapper>
  </MuiThemeProvider>
);

export default App;
