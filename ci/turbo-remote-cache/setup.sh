#!/bin/bash

MODE=${1-apply}

if [[ "$MODE" == "delete" ]]; then
  kubectl $MODE -f namespace.yaml
  exit
fi

kubectl $MODE -f namespace.yaml
kubectl $MODE -f service-ingress.yaml
kubectl $MODE -f deployment.yaml

echo ""
echo "DONE 🙂"
