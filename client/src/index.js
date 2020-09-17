import React from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink
} from '@apollo/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const link = createHttpLink({
    uri         : 'http://localhost:4000/graphql',
    credentials : 'include'
});

const client = new ApolloClient({
    cache : new InMemoryCache(),
    link
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
