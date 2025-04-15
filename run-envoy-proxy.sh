docker run -v "$(pwd)":/etc/envoy -p 8080:8080 \
  envoyproxy/envoy:v1.20.0 \
  -c /etc/envoy/envoy.yaml
