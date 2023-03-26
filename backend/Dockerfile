FROM docker.io/golang AS build

WORKDIR /app
COPY main.go /app

RUN go mod init main && go mod tidy
RUN CGO_ENABLED=0 go build -o pocketbase


FROM alpine:latest

RUN apk add --no-cache ca-certificates openssl

COPY --from=build /app/pocketbase /usr/local/bin/
COPY scripts/ /opt/
EXPOSE 8090

CMD ["/usr/local/bin/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/var/pb_data"]
