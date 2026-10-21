# Cogniify AI Delivery Check

A small Node.js utility for the Cogniify Entry Level Full Stack Engineer application. It scores whether a full-stack AI product change is ready to ship by checking frontend, backend, AI, test, and deployment coverage.

The tool is dependency-free and returns a machine-readable verdict, so a team can run it before merging an AI-assisted feature or adding it to a CI workflow.

## Run

```bash
npm test
```

A change is ready only when all five delivery areas are represented and every named check has passed.
