# Kid Golden
Data driven system diagrams with d3.js & simple JSON Arrays.

## Types of Charts

- Sunburst (good for classification)
- Partition, Icicle (cumulative values)
- Circle Packing
- Collapsible Tree

## Data model shapes

### Attributes

#### id <String>
Service ID to explain relationships

#### label <String>
Service Label

#### parent <Array>
Array of parent Service IDs.

#### children <Array>
Array of children Service IDs.

#### requires <Array>
Array of required Service IDs; "this" service is impacted if a required service is impacted

#### layer <Array>
Array of layer strings, e.g. "Application", "Service", "Offline", "Serverless".

### Service

Micro or monolithic services

```json
{
  "id": "uniqueID",
  "label": "Service Name",
  "parent": ["uniqueID"],
  "children": ["uniqueID"],
  "requires": ["uniqueID"],
  "layer": ["layerName"]
}
```

## License
Copyright (c) 2022 Jason Mulligan.
Licensed under the BSD-3-Clause license.
