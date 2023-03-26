#!/bin/sh

# $1 name of ca 
# $2 Country Name
# $3 State or Province Name
# $4 Locality Name (eg, city)
# $5 Organization Name (eg, company) [Internet Widgits Pty Ltd]
# $6 Organizational Unit Name (eg, section) []
# $7 Common Name (e.g. server FQDN or YOUR name)
# $8 E-Mail
# $9 days


mkdir -p /var/pb_data/storage/certificationauthority/$1/

openssl genrsa -out "/var/pb_data/storage/certificationauthority/$1/$1.key" 2048
openssl req -x509 -new -nodes -key "/var/pb_data/storage/certificationauthority/$1/$1.key" \
  -sha256 -days "$9" -subj "/C=$2/ST=$3/L=$4/O=$5/OU=$6/CN=$7/emailAddress=$8" \
  -out "/var/pb_data/storage/certificationauthority/$1/$1.pem"
