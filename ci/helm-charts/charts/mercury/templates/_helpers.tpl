{{- define "postgresql.fullname" -}}
{{- printf "%s-mercury-%s" .Release.Name "postgresql" | trunc 24 -}}
{{- end -}}
