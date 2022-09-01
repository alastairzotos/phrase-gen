# PhraseGen

![ts](https://flat.badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)

A simple tool to generate keyword phrases for search engine ads.

![PhraseGen Screenshot](https://i.imgur.com/Hu2GGJ0.png)

## Usage

You can use PhraseGen in as an NPM package, using the API or via the UI.

### Usage via UI

Simply head over to https://phrase-gen.bitmetro.io

### Usage via NPM package

Install with `npm i @bitmetro/phrase-gen`

```js
import { generateOutput } from '@bitmetro/phrase-gen'

const results = generateOutput(
  [
    'buy @item in @city',
    '@item for sale in @city'
  ],
  [
    {
      name: 'item',
      values: ['flowers', 'chairs']
    },
    {
      name: 'city',
      values: ['london', 'paris']
    }
  ]
)
```

### Usage via API

The API is open and can be easily accessed:
```http
POST https://phrase-gen-api.bitmetro.io/api/v1/phrases
Content-Type: application/json

{
    "inputs": ["buy @item in @city"],
    "variables": [
        {
            "name": "item",
            "values": ["chairs", "tables"]
        },
        {
            "name": "city",
            "values": ["london", "paris"]
        }
    ]
}
```