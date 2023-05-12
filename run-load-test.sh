DOCKER_CONTENT_TRUST=1 \
docker run --rm -d \
    --name coincover-txn-performance-datadog \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_SITE="datadoghq.eu" \
    -e DD_API_KEY=1b71664ac5e20676a53321fce9c0c7ca \
    -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=1 \
    -p 8125:8125/udp \
    datadog/agent:latest