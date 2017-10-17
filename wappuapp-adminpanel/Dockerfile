FROM nginx:1.13.5-alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf.template
COPY build /usr/share/nginx/html

CMD /bin/sh -c "envsubst '\$BACKEND_URI' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"