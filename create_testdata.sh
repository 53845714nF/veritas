#!/usr/bin/env bash

curl --location --request POST 'http://0.0.0.0:8090/api/veritas/createca?name=test3&email=foo%40bar.com&country=DE&state=Deutschland&locality=Berlin&org_name=HomeLab&org_unit=IT&cname=fritz.box&days=123'
sleep 5
curl --location --request POST 'localhost:8090/api/veritas/createcert?ca=test3&url=test2.com'