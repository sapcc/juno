FLY := fly -t v5
ci: 
	$(FLY) set-pipeline --pipeline juno -c pipeline.yaml -l ../../secrets/ci/shared/vars.yaml services

login:
	$(FLY) login -c https://ci.eu-de-2.cloud.sap/ -n services