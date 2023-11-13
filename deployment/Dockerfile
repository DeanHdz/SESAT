FROM nginx

ARG NGINX_CONF

RUN rm /etc/nginx/conf.d/default.conf

COPY ${NGINX_CONF} /etc/nginx/conf.d/

EXPOSE 80