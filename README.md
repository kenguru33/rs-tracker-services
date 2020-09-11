1. Set environment variables
   
   1. Build environment
   
   2. Kubernetes

2. Bootstrap

3. Build

4. Run
   
   1. Development
   
   2. Staging
   
   3. Production

## 1 - Setup environment variables

### 1.1 - Build Environment

Generate npm token

```bash
npm token create --readonly
```

Add npm token to .env file at root level

```ini
NPM_TOKEN=3138149823425ujfj92892384jf82354
```

### 1.2 - Kubernetes

Add secrets to .secrets file at root level

```ini
KYSTEVERKET_USERNAME=<usernam>
KYSTEVERKET_PASSWORD=<password>

MARINE_TRAFFIC_API_KEY=<api key>
```

Create secrets 

```bash
npm run secrets:create
```

> use **npm run secrets:delete** to delete all keys 

## 

## 2 - Bootstrap

Run install scripts in every package

```bash
npm run bootstrap
```
> use **npm run clean** to clean all packages 

## 3 - Build

Build every package

```bash
npm run build:all
```

Or build a single package

```bash
npm run buil:<package name>
```

## Run

Make sure you have a kubernetes environment running before running the application.  Aka. minikube, docker-desktop with kubernetes...

### Running a development setup with tilt

```bash
# deploy to kubernetes
tilt up

# remove all deployments from kubernetes
tilt down 
```

### 
