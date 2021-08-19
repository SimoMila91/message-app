import './App.css';
import MessageList from './components/MessageList';
import Header from './components/Header';
import { Container } from '@material-ui/core';

export default function App() {
  return (
    <div className="App">
      <Container disableGutters={true} maxWidth='false'>
        <Header />
        <MessageList />
      </Container>
    </div>
  );
}

