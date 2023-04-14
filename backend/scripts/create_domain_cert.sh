#!/bin/sh

# $1 URL
# $2 CA
# $3 Country
# $4 State
# $5 Locality
# $6 Organization Name
# $7 days

# Input validation (Parameter not empty)
if [ -z "$1" ]
then
    echo "Please supply a subdomain to create a certificate for a Website.";
    echo "Usage: $0 foo.local"
    exit;
fi

# Check if root CA is available
if [ ! -f "/var/pb_data/storage/certificationauthority/$2/$2.pem" ]; then
    echo 'Please run "create_root_cert_and_key.sh" first, and try again!'
    exit;
fi

# Check if v3.ext is available
if [ ! -f /opt/v3.ext ]; then
  wget https://raw.githubusercontent.com/kalaspuffar/apache-https/master/etc/v3.ext -O /opt/v3.ext
fi

if [ ! -f /opt/secure.conf.template ]; then
  wget https://raw.githubusercontent.com/kalaspuffar/apache-https/master/etc/secure.conf.template -O /opt/secure.conf.template
fi

# Variables definition
SUBJECT="/C=$3/ST=$4/L=$5/O=$6/CN=$1"
NUM_OF_DAYS="$7"

mkdir -p "/var/pb_data/storage/cert/$1"

openssl req -new -newkey rsa:2048 \
-sha256 -nodes -keyout "/var/pb_data/storage/cert/$1/server.key" \
-subj "$SUBJECT" -out "/var/pb_data/storage/cert/$1/server.csr"

# replace DOMAIN with the url
sed "s/%%DOMAIN%%/$1/g" /opt/v3.ext > /tmp/__v3.ext

openssl x509 \
-req -in "/var/pb_data/storage/cert/$1/server.csr" \
-CA "/var/pb_data/storage/certificationauthority/$2/$2.pem" \
-CAkey "/var/pb_data/storage/certificationauthority/$2/$2.key" \
-CAcreateserial -out "/var/pb_data/storage/cert/$1/$1.crt" \
-days "$NUM_OF_DAYS" \
-sha256 -extfile /tmp/__v3.ext

# Apache conf
sed "s/%%DOMAIN%%/$2/g" /opt/secure.conf.template > "/var/pb_data/storage/cert/$1/secure_apache.conf"