FLY := fly -t v5
ci: ci-clean ci-create
	$(FLY) set-pipeline --pipeline juno -c pipeline.yaml -l ../../secrets/ci/shared/vars.yaml services

login:
	$(FLY) login -c https://ci.eu-de-2.cloud.sap/ -n services

ci-clean: 
	if [ -e pipeline.yaml ]; then rm pipeline.yaml; fi

ci-create:
	docker run --rm -v "${CURDIR}":/usr/src/myapp -w /usr/src/myapp ruby:3-alpine erb pipeline.yaml.erb > pipeline.yaml 