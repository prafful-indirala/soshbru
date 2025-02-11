export type config = {
  // persistNavigation: 'always' | 'dev' | 'prod' | 'never';
  appName: string;
  graphqlUri: string;
  isDev: boolean;
  env: string;
};

// export type PersistNavigationConfig = config['persistNavigation'];

const config: config = {
  // This feature is particularly useful in development mode, but
  // can be used in production as well if you prefer.
  // persistNavigation: 'never',
  appName: 'My App',
  graphqlUri: process.env.GRAPHQL_API || 'http://localhost:4000/graphql',
  isDev: process.env.NODE_ENV === 'development',
  env: process.env.NODE_ENV || 'development',
};

export default config;
