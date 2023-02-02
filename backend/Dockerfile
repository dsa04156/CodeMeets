FROM adoptopenjdk/openjdk11
WORKDIR /usr/app
COPY target/code_meets-0.0.1-SNAPSHOT.jar code_meets.jar
EXPOSE 8081
CMD ["java", "-jar", "code_meets.jar"]