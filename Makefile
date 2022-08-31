build-dockerfile:
	node ./scripts/build-dockerfile.js

build-web:
	docker build . -t phrase-gen:latest  --build-arg SCOPE=web

build-api:
	docker build . -t phrase-gen-api:latest  --build-arg SCOPE=web