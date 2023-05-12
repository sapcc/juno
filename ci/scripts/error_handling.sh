#!/bin/bash

# https://www.xmodulo.com/catch-handle-errors-bash.html
function try() {
  [[ $- = *e* ]]
  SAVED_OPT_E=$?
  set +e
}

function throw() {
  exit $1
}

function catch() {
  export exception_code=$?
  (($SAVED_OPT_E)) && set +e
  return $exception_code
}
