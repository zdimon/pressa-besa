FROM python:3.8-buster AS python38
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
RUN apt update
RUN apt -y install libpq-dev netcat
COPY requirements.txt /app
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install -r requirements.txt
RUN mkdir /entry
# COPY entrypoint.sh /entry
# ENTRYPOINT ["/entry/entrypoint.sh"]


