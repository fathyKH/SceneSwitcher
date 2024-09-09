FROM ubuntu

RUN apt update
RUN apt install wget build-essential libssl*  -y
RUN apt-get install libffi-dev nano -y
RUN apt install libsqlite3-dev
RUN wget https://www.python.org/ftp/python/3.10.14/Python-3.10.14.tgz
RUN tar -xzvf Python-3.10.14.tgz
RUN cd Python-3.10.14
WORKDIR Python-3.10.14
RUN ./configure --enable-optimizations --with-system-ffi
RUN make -j 16
RUN apt install libespeak-dev zlib1g-dev libmupdf-dev libfreetype6-dev ffmpeg espeak imagemagick git -y
RUN make altinstall



RUN python3.10 -m pip install opencv-python
RUN python3.10 -m pip install numpy
RUN python3.10 -m pip install aeneas
RUN python3.10 -m pip install moviepy
RUN python3.10 -m pip install pathlib
RUN python3.10 -m pip install pysrt
RUN python3.10 -m pip install Django
RUN python3.10 -m pip install Pillow==9.5.0
RUN python3.10 -m pip install matplotlib 


COPY ./policy.xml /etc/ImageMagick-6/policy.xml
WORKDIR /app
COPY . /app


EXPOSE 8000

CMD ["python3.10", "manage.py", "runserver","0.0.0.0:8000"]
