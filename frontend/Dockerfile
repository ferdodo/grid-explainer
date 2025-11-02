FROM grid-explainer-core AS core-base
FROM grid-explainer-design-system AS design-system-base

FROM node

WORKDIR /app

# Copy packages first (so npm can resolve file: dependencies)
COPY --from=core-base /app ./core
COPY --from=design-system-base /app ./design-system

# Install frontend dependencies (will link to local packages)
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source
COPY frontend ./

RUN npm run build


CMD npm run dev
