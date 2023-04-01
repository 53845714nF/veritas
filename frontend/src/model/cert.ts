export default interface Cert {
    id: string;
    ca: string;
    web_crt_file: string;
    apache_conf_file: string;
    server_key: string;
}