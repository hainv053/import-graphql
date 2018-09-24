# import-graphql

## Install

#### NPM
```bash
npm install import-graphql --save
```

#### YARN
```bash
yarn add import-graphql
```

## Usage
`defs.ts`
```ts
import { importSchema } from 'import-graphql';
import * as path from 'path';

const schema = importSchema(path.join(__dirname, 'types'));

export default schema;

```
Assume the following directory structure:

```
types/
├── schema.graphql
└── message.graphql
```

`schema.graphql`
```graphql
schema {
    query: Query
}

type Query {
  messages: [Message]
}

type Mutation {
  mark_read_all: ResponseStatus!
}

type ResponseStatus {
  status: Boolean!
}

```

`message.graphql`
```graphql
type Message {
  id: String!
  title: String!
  content: String!
}
extend type Mutation {
  create_message(
    title: String!
    content: String!
  ): Message
}

```

`schema.ts`
```ts
import defs from './defs';
import { makeExecutableSchema } from 'apollo-server';

const schema = makeExecutableSchema({
    typeDefs: defs,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    }
});

export {
    schema
};
```