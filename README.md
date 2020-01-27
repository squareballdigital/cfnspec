# @fmtk/cfnspec

CloudFormation Resource Specification.

## Get latest spec

```typescript
import { getLatestSpec } from '@fmtk/cfnspec';

// get the latest spec from us-east-1 by default
const spec = await getLatestSpec();

// see interface types for shape
```

## Normalise spec

Get a list of type definitions for the specification in a more digestible format.

```typescript
import { getLatestSpec, normaliseSpec } from '@fmtk/cfnspec';

// get the latest spec from us-east-1 by default
const spec = normaliseSpec(await getLatestSpec());

// see interface types for shape
```
