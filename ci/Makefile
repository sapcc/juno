# NOTE: 
# Hijack Build Container for debug
# fly -t v5 intercept -u URL_FROM_BUILD

FLY := fly -t v5
ci:
	$(FLY) set-pipeline --pipeline juno-v3 -c pipeline.yaml

login:
	$(FLY) login -c https://ci1.eu-de-2.cloud.sap -n services
