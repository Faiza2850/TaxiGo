FROM golang:latest

ARG ENV

ENV ENV=${ENV}

RUN mkdir /golang

RUN go install  github.com/air-verse/air@latest

ADD . /golang/

RUN go install  github.com/air-verse/air@latest

WORKDIR /golang

ENV GIN_MODE=release

RUN go mod download

CMD ["air", "-c", ".air.toml"]