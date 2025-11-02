FROM grid-explainer-core AS core-base
FROM grid-explainer-design-system AS design-system-base

FROM node

WORKDIR /app

# Copy packages first (so npm can resolve file: dependencies)
COPY --from=core-base /app ./core
COPY --from=design-system-base /app ./design-system

# Copy frontend with its package.json to maintain correct relative paths
COPY frontend ./frontend

# Install frontend dependencies (will link to local packages via file:../core)
WORKDIR /app/frontend
RUN npm install

# Build frontend
RUN npm run build

CMD npm run dev
