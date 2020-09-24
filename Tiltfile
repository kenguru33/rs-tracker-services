k8s_yaml([
	'infra/k8s/nats-streaming-depl.yaml', 
	'infra/k8s/aisdata-collector-kystverket-depl.yaml', 
	'infra/k8s/aisdata-depl.yaml', 
	'infra/k8s/aisdata-mongo-depl.yaml',
	'infra/k8s/ingress-srv.yaml',
	'infra/k8s/moving-vessels-depl.yaml'
	])

docker_build('banker.azurecr.io/aisdata','packages/aisdata', 
entrypoint=["npm", "run", "start:dev"], 
build_args={'NPM_TOKEN': os.environ['NPM_TOKEN']},
live_update=[
	sync('packages/aisdata/src', '/app/src')
])

docker_build('banker.azurecr.io/aisdata-collector-kystverket','packages/aisdata-collector-kystverket', 
entrypoint=["npm", "run", "start:dev"], 
build_args={'NPM_TOKEN': os.environ['NPM_TOKEN']},
live_update=[
	sync('packages/aisdata-collector-kystverket/src', '/app/src')
])

docker_build('banker.azurecr.io/moving-vessels','packages/moving-vessels', 
entrypoint=["npm", "run", "start:dev"], 
build_args={'NPM_TOKEN': os.environ['NPM_TOKEN']},
live_update=[
	sync('packages/moving-vessels/src', '/app/src')
])


allow_k8s_contexts('Aks-Cluster-1')