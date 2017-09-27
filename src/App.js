import React from 'react';
import PropTypes from 'prop-types';
import {
  createNetworkInterface,
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
} from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql/',
  }),
});

const graphQLQuery = gql`
  {
    brands {
      website
    }
    categories {
      title
    }
    products {
      productName
    }
  }
`;

const getGraphQLEnhancedComponent = graphql(graphQLQuery);

const DataViewer = ({ data: { loading, error, brands, categories, products } }) => {
  if (loading) return (<p>Loading ...</p>);
  if (error) return (<p>{error.message}</p>);

  return (
    <div>
      <h2>Brands</h2>
      <ul>
        {brands.map(b => (<li key={b.id}>{b.website}</li>))}
      </ul>
      <h2>Categories</h2>
      <ul>
        {categories.map(c => (<li key={c.id}>{c.title}</li>))}
      </ul>
      <h2>Products</h2>
      <ul>
        {products.map(p => (<li key={p.id}>{p.productName}</li>))}
      </ul>
    </div>
  );
};

DataViewer.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ).isRequired,
};

const DataViewerWithData = getGraphQLEnhancedComponent(DataViewer);

const App = () => (
  <ApolloProvider client={client}>
    <div className="wrapper">
      <h1>Using GraphQL with Contentful</h1>
      <p>This exmaple shows you a GraphQL setup that relies on Contentful.
        It fetches all items for three different content types (author, category, post)
        which is normally only possiblewith three API calls.
      </p>
      <pre>
        <code>
          {graphQLQuery.loc.source.body}
        </code>
      </pre>
      <p>
        This demo uses <a href="https://facebook.github.io/react/">React</a> and <a href="https://www.apollodata.com/">The Apollo Framework</a>.
      </p>
      <hr />
      <DataViewerWithData />
    </div>
  </ApolloProvider>
);

export default App;
