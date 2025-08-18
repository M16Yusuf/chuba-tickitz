FROM ubuntu:24.04

# Update Repo dan Install SSH server
RUN apt-get update && apt-get install openssh-server -y 

# menambahkan directory /run/sshd
RUN mkdir -p /run/sshd
# membuat user non-root
RUN useradd -m -d /home/yusuf -s /usr/bin/bash yusuf
# copy public ley dari client ke server
COPY ssh_access_key.pub /home/yusuf/.ssh/authorized_keys
# security Hardening
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
RUN sed -i 's/#PermitRootLogin prohibi-password/PermitRootLogin no/' /etc/ssh/sshd_config
RUN sed -i 's/#PubKeyAuthentication no/PubKeyAuthentication yes/' /etc/ssh/sshd_config

# Expose ports
# EXPOSE 80

# RUN service nginx start

# CMD ["/usr/sbin/sshd","-D","-e", "&&" ,"nginx", "-g", "daemon off;"]


# CMD ["sh", "-c", "service nginx start && systemctl start sshd.service"]

# CMD ["/bin/bash", "-c", "/usr/sbin/sshd -D -e && nginx -g daemon off;"]
CMD ["/usr/sbin/sshd","-D","-e"]